import axios from "axios"
import { useState } from "react"
import Loader from "./Loader"
import { useNavigate } from "react-router-dom"

interface props { 
    id : string,
    setError : (message :string) => void
}

export default function RegisterButton({id,setError} :props){

    const [loader , setLoader] = useState(false)
    
    
    const navigate = useNavigate()

    if (loader) {
        return <>
            <div className=" mr-4 p-2   border-2  rounded-xl bg-gray-500 flex justify-center items-center "> 
            <Loader></Loader>
            </div>
            
        </>
    }

    return <>
    
    <div className="mr-4 p-2 text-xl border-2  rounded-xl hover:bg-white hover:text-black bg-gray-500 items-center hover:cursor-pointer hover:shadow-md  hover:shadow-slate-300" 
    onClick={()=>{
        if (localStorage.getItem('Authorization') == null) {
            
            navigate('/signin',{
                replace : true
            })
        }
        setLoader(true) 
        registerTournament()
        

        async function registerTournament() {
            setError("")
            let res 
            try{
                
                 res = await axios.post('https://backend.aryansharma6779.workers.dev/api/v1/tournament/register-tournament',{
                    id : id
                },{
                    headers : {
                        Authorization : localStorage.getItem('Authorization')
                    }
                })
                
                setLoader(false)
                setError(res.data.message)
    
            }
            catch(e :any){
                const message = e.response?.data?.message || "Something went wrong. Please try again."
                setLoader(false)
                setError(message)
                setTimeout(()=>{
                    setError("")
                },3000)
            }
            
            // if (res.status !== 500 ) {
            //     setLoader(false)
            // }
            // setMeassage(res.data.message)
            // console.log(res);

            
            
        }       

    }}>
          <div className="text-center">
          Register
          </div>
          
          </div>
    
    </>
}