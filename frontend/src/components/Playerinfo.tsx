import { Link } from "react-router-dom"


interface Props {
    
    
    playerName : string
    playerSurname : string
    ign : string
    role : string,
    handler :string 
}
export function Playerinfo({ign,role,playerName,playerSurname,handler} : Props){

    
   
    if(handler == null ){
        
    }
    
    return (
        <> 
            
                
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