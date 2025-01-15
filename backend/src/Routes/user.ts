import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

import { Jwt } from "hono/utils/jwt";
import { z } from "zod";
import { myTeams } from "./myTeams";



export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  
    }
  }>();
  

  const userSchema = z.object({
    name : z.string(),
    surname : z.string().optional(),
    email : z.string().email(),
    password : z.string()

  })

  userRouter.route('/view',myTeams)

  userRouter.post('/signup',async (c)=>{
    const prisma = new PrismaClient({
        datasources: {
          db: {
            url: c.env.DATABASE_URL
          },
        },
      }).$extends(withAccelerate());
      try{
      const body =await  c.req.json()
      const email = body.email 
      const name = body.name 
      const surname = body.surname
      const password = body.password  
      const validSchema = userSchema.safeParse({
        name : name ,
        surname : surname,
        email : email,
        password : password
      })
      if(!validSchema.success){
        c.status(400)
        return c.json({
            message : "enter correct inputs"
        })
      }
      const existingUser = await  prisma.user.findUnique({
        where : {
            email: email
        }

      })
      if(existingUser != null ){
        c.status(400)
      
        return c.json({
            message : "email already in use  ,please login  "
        })}
        const newUser = await prisma.user.create({
            data:{
                email : email,
                name : name,
                surname : surname,
                password : password
            }
        })
        
        const token = await Jwt.sign(email,c.env.JWT_SECRET)
        c.status(200)
        return c.json({
            token:  token
        })
  }
  catch(e){
    return c.json({
        message : "some internal error "
    })

  }
})



const signinSchema = z.object({
  email : z.string().email(),
  password : z.string()
})


userRouter.post('/signin',async (c)=>{
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL
      },
    },
  }).$extends(withAccelerate());


  try{
    const body =await  c.req.json()
    const email = body.email  
    const password = body.password
    const validSchema = signinSchema.safeParse({email:email,
      password:password
    })
    if(!validSchema.success){ 
      c.status(400)
      return c.json({
        message: "invalid schema/password"
      })
    }
    console.log(email,password);
    
    const existingUser = await prisma.user.findFirst({
      where : {
        AND :[
          {email : email},
          {password:password}
        ]
        
      }
    })
    if(!existingUser){
      c.status(400)
      return c.json({
        message : "incorrect email/password "
      })
    }
    const token = await Jwt.sign(email,c.env.JWT_SECRET)
        c.status(200)
        return c.json({
            token:  token
        })
    
  }
  catch(e){
     c.status(400)
    return c.json({
      message : "some internal error"
    })
  }

})

userRouter.get('/coins',async(c)=>{

  interface jwtPayload {
    email? : string
  }
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
  const email =await Jwt.verify(Authorization,c.env.JWT_SECRET) as jwtPayload
  
  
  

  
    const user = await prisma.user.findUnique({
      where :{
        email :email as string 
      }
    })
    const coins = user?.coins
    // console.log(coins);
    
    return c.json({
      coins : coins
    })
  }
  catch(e){
    // console.log(e);
    
    c.status(400)
    return c.json({
      message :"some internal error "
    })
  }

})



