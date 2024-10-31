import {  useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function Signup() {
    
    const [name,setName]= useState("")
    const [surname,setSurname]= useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const navigate = useNavigate()
    const [warning,setWarning] = useState("")
    
    async function userSignup(){
        console.log("inside user signup ");
        
        try
        {
            const res = await axios({
                method : 'post',
                url : 'https://backend.aryansharma6779.workers.dev/api/v1/user/signup',
                data : {
                    name : name.trim() ,
                    surname : surname.trim() ,
                    email : email.trim(),
                    password : password.trim()

                }
                
            })
           
            
            
            localStorage.setItem("Authorization",res.data.token)
            console.log(res.data.token);
            navigate('/add/team')
            
        }
        catch(e :any){
            console.log("inside catch ");
            
            setWarning(e.response.data.message);
            
        }
        
    }
    
    
    if (localStorage.getItem("Authorization")!= null) {
        console.log(" in this block ");
        
        return <div>
            logout and then signup 
            {setTimeout(() => {
                navigate('/')
            }, 4000)}
        </div>
    }
    return (
        <div className="flex  items-center justify-center  min-h-[80vh]">

            <div className=" flex flex-col justify-center items-center border-2 rounded-md border-black w-96 p-4 mt-5 bg-slate-200 min-h-[50vh]" >
                <div className="font-bold text-3xl p-2 ">
                    Signup
                </div>

                <Input type="text" onChange={setName} heading="Name" placeholder="John"></Input>
                <Input type="text" onChange={setSurname} heading="Surname" placeholder="Wick"></Input>
                <Input type="text" onChange={setEmail} heading="Email" placeholder="youremail@gmail.com"></Input>
                <Input type="password" onChange={setPassword} heading="Password" placeholder="password"></Input>
                <Button onClick= {userSignup}
                    
                 label="Signup"></Button>

                <div className="text-red-500 font-thin ">{warning}</div>
                
                <div className="m-3 text-gray-600 text-end" >Existing user ? {<Link className=" underline hover:text-black" to={'/signin'}>Signin</Link>}</div>
            </div>
        </div>
    );

}
