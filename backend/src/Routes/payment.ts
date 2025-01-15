import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { Bindings } from "hono/types";
import Razorpay from "razorpay";
import crypto from "crypto"
import { Jwt } from "hono/utils/jwt";

export const paymentRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string,
        RAZORPAY_KEY_ID: string,
        RAZORPAY_KEY_SECRET: string

    }
}>()

paymentRouter.get('/pricing', async (c) => {
    const prisma = new PrismaClient({
        datasources: {
            db: { url: c.env.DATABASE_URL }
        }

    }).$extends(withAccelerate())


    const res = await prisma.packages.findMany({})



    c.status(200)
    return c.json({
        message: res.sort((a, b) => a.price - b.price)
    })



})

paymentRouter.post('/create-order', async (c) => {

    const prisma = new PrismaClient({
        datasources: {
            db: { url: c.env.DATABASE_URL }
        }

    }).$extends(withAccelerate())

    const razorpay = new Razorpay({
        key_id: c.env.RAZORPAY_KEY_ID || "",
        key_secret: c.env.RAZORPAY_KEY_SECRET,
    });

    const body = await c.req.json();
    const packId = body.packId

    const currency = "INR"
    const pack = await prisma.packages.findFirst({
        where: {
            id: packId
        }
    })
    if (!pack) {
        c.status(400)
        return c.json({
            message: "invalid pack"
        })
    }
    const amount = pack.price
    try {
        const options = {
            amount: amount * 100,
            currency
        }
        const order = await razorpay.orders.create(options);
        return c.json({
            order
        })
    }
    catch (e: any) {
        c.status(500)
        console.log(e);

        return c.json({
            message: "some internal error  "
        })
    }


})

paymentRouter.post('/verify-order', async (c) => {
    const prisma = new PrismaClient({
        datasources: {
            db: { url: c.env.DATABASE_URL }
        }

    }).$extends(withAccelerate())
    const razorpay = new Razorpay({
        key_id: c.env.RAZORPAY_KEY_ID,
        key_secret: c.env.RAZORPAY_KEY_SECRET,

    })
    try {


        const { razorpay_order_id, razorpay_payment_id, razorpay_signature,packId } = await c.req.json()
        const Authorization = c.req.header('Authorization')
        console.log(packId +"pack");
        
        if (!Authorization) {
            c.status(400)
            return c.json({
                message: "some error payment failed pls try again "
            })
        }


        const shasum = crypto.createHmac('sha256', c.env.RAZORPAY_KEY_SECRET);
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = shasum.digest('hex');

        if (digest != razorpay_signature) {
            c.status(400)
            return c.json({ status: 'failed', message: 'Payment not verified' });
        }
        const payload = await Jwt.verify(Authorization, c.env.JWT_SECRET)
        if (!payload) {
            c.status(400)
            return c.json({
                message: "authorization failed "
            })
        }
        const email = payload as unknown as string
        const pack = await prisma.packages.findFirst({
            where : {
                id :packId
            }
        })
        console.log(pack);
        
        const inc = pack?.coins
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!user) {
            c.status(400)
            return c.json({
                message: "user not found "
            })
        }

        const updateCoins = await prisma.user.update({
            where : {
                email : email
            },
            data : {
                coins : {
                    increment : inc
                }
            }
        })
        c.status(200)
        return c.json({
            message: "Payment successfull , coins will reflect in you account shortly "
        })



    }
    catch (e: any) {


        c.status(500)
        return c.json({
            message: "some server error"
        })
    }
})