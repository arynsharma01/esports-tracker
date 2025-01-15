import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { Jwt } from "hono/utils/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import { string, z } from "zod";

export const tournamentRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;

    }
}>();

tournamentRouter.post('/create-new', async (c) => {

    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: c.env.DATABASE_URL
            }
        }
    }).$extends(withAccelerate())

    const tournamentSchema = z.object({
        game: z.string(),
        mode: z.string(),
        price: z.number().nonnegative(),
        maxMember: z.number().nonnegative(),
        description: z.string()


    })


    const body = await c.req.json();
    console.log(body);

    const game = body.game
    const mode = body.mode
    const maxMember = body.maxMember
    const price = body.price
    const description = body.description

    const validSchema = tournamentSchema.safeParse(
        {
            game: game,
            mode: mode,
            price: price,
            maxMember: maxMember,
            description: description
        }
    )


    if (!validSchema.success) {
        c.status(400)
        return c.json({
            message: "invalid tournament info "
        })
    }

    const createTournament = await prisma.tournamentInfo.create({
        data: {
            game: game,
            mode: mode,
            price: price,
            maxmembers: maxMember,
            description: description
        }
    })
    const tournamentId = createTournament.id;



    c.status(200)
    return c.json({
        message: "fine " + tournamentId

    })

})

tournamentRouter.get('/get', async (c) => {



    const prisma = new PrismaClient({
        datasources: {
            db: { url: c.env.DATABASE_URL }
        }

    }).$extends(withAccelerate())
    try {

        const tournaments = await prisma.tournamentInfo.findMany({
            include: {
                registeredUser: true,
            },
        })
        console.log(tournaments);

        c.status(200)
        return c.json({
            tournaments: tournaments
        })

    }
    catch (e) {
        c.status(401)
        return c.json({
            message: "some internal server error " + e
        })
    }
})

tournamentRouter.post('/register-tournament', async (c) => {
    const prisma = new PrismaClient({
        datasources: {
            db: { url: c.env.DATABASE_URL }
        }

    }).$extends(withAccelerate())

    try {
        const authorization = c.req.header('Authorization')
        console.log(authorization)
        if (!authorization) {
            c.status(400)
            return c.json({
                message: "Unauthorized"
            })
        }
        const payload = await Jwt.verify(authorization, c.env.JWT_SECRET)
        console.log(payload);

        if (!payload) {
            c.status(400)
            return c.json({
                message: "invalid access"
            })

        }
        const email = payload as unknown as string





        const body = await c.req.json();
        const tournamentId = body.id;
        if (!tournamentId) {
            c.status(400)
            return c.json({
                message: "no tournament id found"
            })

        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            c.status(400)
            return c.json({
                message: "user not found"
            })
        }
        const tournament = await prisma.tournamentInfo.findUnique({
            where: {
                id: tournamentId
            },
            include: {
                registeredUser: true,
            },
        })

        if (!tournament) {
            c.status(400)
            return c.json({
                message: "no tournament found"
            })
        }
        const requiredCoins = tournament.price
        const availableCoins = user.coins

        const maxUsers = tournament.maxmembers;
        const registeredUsers = tournament.registeredUser.length;

        console.log(registeredUsers + " here ");

        if (registeredUsers >= maxUsers) {
            c.status(400)
            return c.json({
                message: "Slots filled 🥲"
            })

        }




        const registeredForTournament = await prisma.registeredUser.findFirst({
            where: {
                userId: user.id,
                tournamentId: tournamentId
            }
        })
        if (registeredForTournament != null) {
            c.status(400)
            return c.json({
                message: "already registered 😁 "
            })

        }
        if (availableCoins < requiredCoins) {
            c.status(400)
            return c.json({
                message: "insufficient coins , Recharge 🤑"
            })
        }


        const [register, updateCoins] = await prisma.$transaction([
            prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    coins: {
                        decrement: requiredCoins
                    }
                }
            }),
            prisma.registeredUser.create({
                data: {
                    userId: user.id,
                    tournamentId: tournamentId
                }
            })
        ])

        if (!register || !updateCoins) {
            c.status(400)
            return c.json({
                message: "Some error registering try again  "
            })


        }
        c.status(200)
        return c.json({
            message: "Registered successfully ❤️‍🔥 "
        })

    }
    catch (e) {
        c.status(500)
        return c.json({
            message: "server error + here "
        })

    }


})

