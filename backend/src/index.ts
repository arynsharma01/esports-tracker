import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { teamRouter} from './Routes/team'
import { playerRouter } from './Routes/player';
import { cors } from 'hono/cors';


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





export default app
