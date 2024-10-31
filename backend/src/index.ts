import { Hono } from 'hono'

import { teamRouter} from './Routes/team'
import { playerRouter } from './Routes/player';
import { cors } from 'hono/cors';

import {  userRouter } from './Routes/user';


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

app.route('/api/v1/team' , teamRouter)
app.route('/api/v1/player', playerRouter)
app.route('/api/v1/user',userRouter)





export default app
function compression(): any {
  throw new Error('Function not implemented.');
}

