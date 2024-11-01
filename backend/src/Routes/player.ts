import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { string, z } from "zod";

export const playerRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;

  }
}>();



const playerSchema = z.object({
  authorid : z.string(),
  name: z.string().min(3, { message: "minimum name size should be 3" }),
  surname: z.string().optional(),
  ign: z.string().min(3, { message: "minimum name size should be 3" }),
  role :z.string(),
  handler : z.string().optional()
})
playerRouter.post('/add', async (c) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL
      },
    },
  }).$extends(withAccelerate());
  const body = await c.req.json()
  console.log(body);
  
  const authorid = body.authorid as string
  const name = body.name
  const surname = body.surname || null
  const ign = body.ign
  const role = body.role 
  const handler = body.handler 

  const validSchema = playerSchema.safeParse({
    name: name,
    surname: surname,
    ign: ign,
    role:role ,
    handler : handler,
    authorid :authorid

  })
  if (!validSchema.success) {
    console.log("schema");
    console.log(validSchema);
    
    
    c.status(400)
    
    return c.json({
      message:  validSchema.error.errors
    })
  }


  //   if( !(authorid instanceof  string)){
  //     c.status(400)
  //     return c.json({
  //         message : "team id not found /invalid format of id"
  //     })
  //   }
  // const test = await prisma.team.findMany({})
  // console.log(test);

  const validId = await prisma.team.findFirst({
    where: {
      id: authorid
    }
  })
  console.log(authorid);
  


  if (validId == null) {
    c.status(411)
    return c.json({
      message: "invalid team id "
    })
  }
  const createPlayer = await prisma.player.create({
    data: {
      name: name,
      surname: surname,
      ign: ign,
      authorid: authorid,
      handler : handler
    }
  })
  console.log(createPlayer);

  c.status(200)
  return c.json({
    message: "player created successfully",
    id: createPlayer.id
  })
})
playerRouter.get('/view', async (c) => {

  try {

    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: c.env.DATABASE_URL
        },
      },
    }).$extends(withAccelerate());

    const authorid =  c.req.query('id')
    console.log(authorid);
    
    
    const players = await prisma.player.findMany({
      where: {
        authorid: authorid
      }
    })
    if (players != null) {
      c.status(200)
      return c.json({
        players: players
      })
    }
    c.status(404)
    return c.json({
      message : "no player found / invalid team id " // check for the team id or having only single response
    })

  }
  catch (e) {
    c.status(411)
    return c.json({
      message : "some internal player error "
    })
  }
})