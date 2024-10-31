import { useNavigate } from "react-router-dom"

interface props {
    label : string 
    link : string
}

export function TopbarButton({label,link}: props){
    const navigate = useNavigate()
    return <div >
        <button className= " text-gray-500  hover:text-black hover:underline   text-sm md:text-xl" onClick={()=>{
            navigate(`${link}`)
        }}>{label}</button>
    </div>
}