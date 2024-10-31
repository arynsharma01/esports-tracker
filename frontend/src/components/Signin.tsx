import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signin(){

    const [email ,setEmail] = useState("")
    const [password ,setPassword] = useState("")
    const [warning,setWarning] = useState("")
    const navigate = useNavigate()

    async function  userSignin() {
        const body = {
            email : email.trim(),
            password : password.trim() 
        }
        try{
            const res =await  axios.post('https://backend.aryansharma6779.workers.dev/api/v1/user/signin',body)
            const token = res.data.token
            localStorage.setItem('Authorization',token)
            console.log("signed in ");
            navigate('/')
            
        }
        catch(e:any ){
            setWarning(e.response.data.message)
        }
        
    }
    if (localStorage.getItem("Authorization")!= null) {
        console.log(" in this block ");
        
        return <div>
            Already signed in  
            {setTimeout(() => {
                navigate('/')
            }, 4000)}
        </div>
    }

    return (
        <div className="flex  items-center justify-center  min-h-[80vh]">

        <div className=" flex flex-col justify-center items-center border-2 rounded-md border-black w-96 p-4 mt-5 bg-slate-200 min-h-[50vh]" >
            <div className="font-bold text-3xl p-2 ">
                Signin
            </div>

            <Input type="text" onChange={setEmail} heading="Email" placeholder="yourmail@email.com"></Input>
            <Input type="password" onChange={setPassword} heading="Password" placeholder="password"></Input>
            
            <Button onClick= {userSignin}
                
             label="Signin"></Button>

            <div className="text-red-500 mt-2 font-thin ">{warning}</div>
            
            <div className="m-3 text-gray-600 text-end" >New user ? {<Link className=" underline hover:text-black" to={'/signup'}>Signup</Link>}</div>
        </div>
    </div>
    )
}