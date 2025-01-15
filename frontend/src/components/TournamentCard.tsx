
import { useState } from "react";
import RegisterButton from "./RegisterButton"

interface props {
  id:string,
  game : string,
  mode : string, 
  maxPlayer : number,
  price : number,
  description : string ,
  registeredPlayers :number
  
}


export default function TournamentCard({game , mode , maxPlayer,price, description,id,registeredPlayers}:props) {

  const [error,setError] =useState("")
 
  

  const x = registeredPlayers/maxPlayer *100
  
  
  console.log(x);
  

  
  
  return (
    <div className=" p-2  ">
    <div className="flex flex-col ring-2 ring-orange-600 ring-offset-2 ring-offset-black rounded-2xl text-white   min-w-[350px]  min-h-[300px] my-7 max-w-[400px]  mx-15 bg-gray-800  hover:shadow-xl hover:shadow-orange-700">
      <img src="/gamer4.jpg" className=" h-32 lg:h-40   rounded-2xl" alt="" />
      <div className="px-4 py-2  text-2xl xl:text-3xl  text-white font-semibold font-sans ">{game} </div>
      
      <div className=" px-4 pt-2  md:text-xl  text-slate-200 ">Mode : {mode} </div>
      <div className="px-4 py-1 md:text-xl break-words text-slate-200">{description}</div>
      

       <div className="flex justify-between">
        <div className="pl-4 text-2xl ">₹ {price}</div>
        <div>
          <RegisterButton id={id} setError={setError}></RegisterButton>
          
          
        </div>
        
       </div>
       
      <div className="pt-2  ">
      <div className="bg-[#7f807f] w-[98%] h-2 rounded-2xl ml-1 lg:mt-5 ">
      
        <div
        style={{ width: `${x}%` }} className="bg-[#fc5e5e]  h-2  border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#ffffff,0_0_15px_#ffffff,0_0_30px_#ffffff]
 text-slate-500 rounded-2xl"></div>
 <div className="text-center text-sm my-1 ">{registeredPlayers}/{maxPlayer}</div>
 <div className="text-center">{error}</div>
        
      </div>

      </div>
    </div>
    </div>
  )
}

  