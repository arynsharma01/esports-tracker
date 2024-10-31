import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { z } from 'zod';
import { v4 } from "uuid";
import { Jwt } from "hono/utils/jwt";



export const teamRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
      ACCESS_KEY_ID: string
      SECRET_ACCESS_KEY: string
      REGION: string
    }
  }>();

  const teamSchema = z.object({
    name: z.string().max(20, { message: "Maximum length should be 20" }).min(3, { message: "Minimum length should be 3" }),
    description : z.string().optional(),

  })

  teamRouter.post('/add',async (c,next)=>{  // adding teams 


    const prisma = new PrismaClient({
        datasources: {
          db: {
            url: c.env.DATABASE_URL
          },
        },
      }).$extends(withAccelerate());
    
    
    
    const body = await c.req.formData()
    const teamName = body.get('name')?.toString()
    console.log(teamName);
    
    if(teamName === "null"){
        c.status(400)
        return c.json({
            message : "team cannot be empty"
        })
    }
    const existingTeam =await  prisma.team.findFirst({
        where : {
            name: teamName
        }
    })
    console.log(existingTeam);
    
    if(existingTeam != null){
        c.status(400)
        return c.json({
            message : "team already exists"
        })
    }
    await next()

  }, async (c) => {

    try {
  
  
      const prisma = new PrismaClient({
        datasources: {
          db: {
            url: c.env.DATABASE_URL
          },
        },
      }).$extends(withAccelerate());
  
  
      const client = new S3Client({
        region: c.env.REGION,
        credentials: {
          accessKeyId: c.env.ACCESS_KEY_ID,
          secretAccessKey: c.env.SECRET_ACCESS_KEY
        }
  
      },)
      
      const Authorization = c.req.header('Authorization')

      if (Authorization == null ) {
        c.status(401)
        return c.json({
          message : "Unauthorized"
        })
      }
      // console.log(Authorization);
      
      const payload = await Jwt.verify(Authorization,c.env.JWT_SECRET) 
      
      const email = payload as unknown  as string
      
      
      
      
      
     
      // console.log(email);
      const body = await c.req.formData()
      const name  = body.get("name") as string
      const description = body.get("description") as string
      const imageFile = body.get("image") || false 
  
      const validInput = teamSchema.safeParse({
        name: name,
        description: description
      })
      if (!validInput.success) {
        c.status(400)
        return c.json({
          message: validInput.error.errors
        })
      }
      
      if (!imageFile || !(imageFile instanceof File)) {
        c.status(400)
        return c.text("image not found ")
      }
      
      const user = await prisma.user.findUnique({
        where: { email: email },
    });
    
    
    if (!user) {
        throw new Error('User not found');
    }

      console.log(body);

      const arrayBuffer = await imageFile.arrayBuffer(); 
      const buffer = Buffer.from(arrayBuffer); 
      
      const uniqueKey = 'image-'+ v4()
      const uploadParams: PutObjectCommandInput = {
        Bucket: 'esports-tracker',
        Key: uniqueKey,
        Body: buffer,
        
        ContentType: imageFile.type
      }
      const command = new PutObjectCommand(uploadParams)
      await client.send(command)
      const imageUrl = `https://${uploadParams.Bucket}.s3.${c.env.REGION}.amazonaws.com/${uniqueKey}`;

      const dataToTable = await prisma.team.create({
        data : {
            userid : user.id,
            name : name ,
            description : description,
            image : imageUrl,
            
            
        }
      })
      console.log(dataToTable);
      
      return c.json({
        message :"team added successfully ",
        img : imageUrl,

        id :dataToTable.id
      })
    }
    catch (e) {
      console.log(e);
  
      return c.text("some internal error  ")
    }
  })
  teamRouter.get('/view' , async (c)=>{ 
    try{
      const prisma = new PrismaClient({
        datasources: {
          db: {
            url: c.env.DATABASE_URL
          },
        },
      }).$extends(withAccelerate());

      const teams = await prisma.team.findMany({})
      if(teams == null ){
        c.status(200)
        return c.json({
          message : "no teams found"
        })
      }
      c.status(200)
      return c.json({
        teams : teams

      })
  }
  catch(e){
    c.status(404)
    return c.json({
      message : "some internal error "
    })
  }
  

})