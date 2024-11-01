import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { Jwt } from "hono/utils/jwt";
import { adminRouter } from "./admin";




export const myTeams = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  
    }
  }>();

  myTeams.route('/admin',adminRouter)


  myTeams.get('/myteams',async (c)=>{

    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: c.env.DATABASE_URL
        },
      },
    }).$extends(withAccelerate());
  

    try{

    
    const Authorization = c.req.header('Authorization')
    if(!Authorization ){
        c.status(400)
      return c.json({
        message : "invalid access"
      })
    }
  
    const payload = await Jwt.verify(Authorization,c.env.JWT_SECRET) 
      
    const email = payload as unknown  as string

    const user = await prisma.user.findFirst({
        where :{
            email : email
        }
    })
    if(!user){
        c.status(404)
        return c.json({
            message : "no user with this email found "
        })
    }
    let teams = await prisma.team.findMany({
        where:{
            userid : user.id
        }
    })
    c.status(200)
    return c.json({
        teams : teams
    })

}
catch(e:any){
    c.status(400)
    return c.json({
        message : "some internal error "
    })
}
  
  })
  
  