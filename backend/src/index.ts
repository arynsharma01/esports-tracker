import { Hono } from 'hono'

import { teamRouter} from './Routes/team'
import { playerRouter } from './Routes/player';
import { cors } from 'hono/cors';

import {  userRouter } from './Routes/user';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';


export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    ACCESS_KEY_ID: string
    SECRET_ACCESS_KEY: string
    REGION: string
  }
}>();

app.use(cors())


app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.get('/delete',async (c)=>{
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL
      },
    },
  }).$extends(withAccelerate());

  const remove = await  prisma.player.findFirst({
    where :{
      id : "c9b429f6-a95f-4381-b22a-04ab96f98979"
    }
  })
  console.log(remove);
  
  return c.json({
    message : "deleted" + remove
  })
  
})

app.route('/api/v1/team' , teamRouter)
app.route('/api/v1/player', playerRouter)
app.route('/api/v1/user',userRouter)





export default app
function compression(): any {
  throw new Error('Function not implemented.');
}

