import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {app as teamRouter} from './Routes/team'


export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    ACCESS_KEY_ID: string
    SECRET_ACCESS_KEY: string
    REGION: string
  }
}>();

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/add/new' , teamRouter)

app.get('/bgmi/get/team', async (c) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL
      },
    }
  }).$extends(withAccelerate());

  const body = await prisma.team.findFirst({
    where: {
      id: "0fe70ab0-4c0c-4ac0-96a8-16530450dff5"
    }
  }) || "this is a new team"
  c.status(200)
  return c.json(body)

})

interface body {
  name: string,
  description: string
  image: string
}

export default app
