import { Link } from "react-router-dom"


interface Props {
    
    // teamName : string,
    // description : string
    playerName : string
    playerSurname : string
    ign : string
    role : string,
    handler :string 
}
export function Playerinfo({ign,role,playerName,playerSurname,handler} : Props){

    // const image =  `https://esports-tracker.s3.ap-south-1.amazonaws.com/image-${id}`
    let social = true 
    if(handler == null ){
        
    }
    
    return (
        <> 
            {/* <div>
            <img className="w-[80px] h-[80px]" src={image} alt="team image " />
            </div>
            <div className="text-red-800 font-extrabold">
                {teamName}
                <div>
                    {description}
                </div>
            </div> */}
                
                <tr className="p-3">
                <td>{playerName}</td>
                <td>{playerSurname}</td>
                <td>{ign}</td>
                <td>{role}</td>
                
                <td><Link className="text-blue-500" to={handler} >Click here </Link></td>
                </tr>
                </>
    
    )
}