import { useNavigate } from "react-router-dom"


interface props {
    teamName : string,
    description: string,
    image : string 
    teamid: string

}
export default function Team({teamid,teamName,description,image} : props){
    const navigate = useNavigate()
    
    return <div className=" flex flex-col justify-center items-center hover:animate-pulse hover:cursor-pointer p-4 m-3"   >
        <div className="" >
        <img className="w-[50px] h-[50px] rounded-lg object-fill" src= {image} alt="team"  onClick={()=>{
        // navigate(`player`)
        navigate('/players',{state :{teamid :teamid, teamName:teamName, description:description, image:image},
        })
        // <Players teamid ={teamid} teamName={name} description={description} image={image}></Players>
       }}  />
        
        </div>
        <div>
        {teamName}
        </div>
       
        
    </div>
}