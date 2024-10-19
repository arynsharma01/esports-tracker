import { useNavigate } from "react-router-dom"
import { Players } from "./Players"

interface props {
    name : string,
    description: string,
    image : string 
    id: string

}
export function Team({id,name,description,image} : props){
    const navigate = useNavigate()
    
    return <div className=" flex flex-col justify-center items-center hover:animate-pulse hover:cursor-pointer p-3" onClick={()=>{
        navigate(`player?id=${id}`)
       }}   >
        <div className="" >
        <img className="w-[50px] h-[50px] rounded-lg object-cover" src= {image} alt="team" />
        
        </div>
        <div>
        {name}
        </div>
       
        
    </div>
}