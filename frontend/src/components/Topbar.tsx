import { useNavigate } from "react-router-dom";
import { TopbarButton } from "./TopbarButton";

export function Topbar(){
    const navigate = useNavigate()
    return <div>
        <div className="flex justify-evenly items-center mb-2  h-12 p-3">
            <div onClick={()=>{
                navigate('/')
            }}>
                <img className="w-9 h-9 hover:cursor-pointer " src="et.png" alt="et" /> 
            </div>
            <div className="flex space-x-6">
            
            <TopbarButton label = "Home" link="/"></TopbarButton>
            <TopbarButton label = "Tournaments" link="/tournaments"></TopbarButton>
            
            <TopbarButton label = "Contact us  " link="/contact"></TopbarButton>
            </div>
            <div className="text-black ml-4 ">
                User button 
            </div>
        </div>
    </div>
}