import axios from "axios"
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Playerinfo } from "./Playerinfo";


interface Data {
    playerName : string,
    playerSurname: string,
    ign : string,
    role : string
    

}
export  function Players(){
    const [searchParams] = useSearchParams();
  const playerId = searchParams.get('id');
  console.log(playerId);
  
    const [players,setPlayers] = useState<Data[]>([])
    useEffect(()=>{
        async function getData() {
            const response = await axios({
                method : 'get',
                url : `http://127.0.0.1:8787/api/v1/player/view?id=${playerId}`,
                
            })
            const data = response.data
            setPlayers(data.players)
            
            console.log(data.players);
        }
        getData()
    },[playerId])
    return(
        <div>
             {players.map((player) => (
                <Playerinfo 
                    
                    playerName={player.playerName}
                    playerSurname={player.playerSurname}
                    ign={player.ign}
                    role={player.role}
                />
            ))}
                
        </div>
    )
    
    
}