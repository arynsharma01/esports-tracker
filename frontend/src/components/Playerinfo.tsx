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
            
                
                <tr className="p-3   text-white bg-black border-2 border-blue-500 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
                <td>{ign}</td>
                <td>{playerName}</td>
                <td>{playerSurname}</td>
                
                <td>{role}</td>
                
                <td><Link className="text-blue-500" to={handler} >Click here </Link></td>
                </tr>
                </>
    
    )
}



