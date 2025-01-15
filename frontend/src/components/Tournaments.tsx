import { useEffect, useState } from "react";
import TournamentCard from "./TournamentCard";
import axios from "axios";
import Loader from "./Loader";

interface data {
  id :string,
  game : string,
  description : string ,
  mode : string ,
  price : number,
  maxmembers: number,
  registeredUser : []

}
export default function Tournaments() {
    const [data,setData] = useState<data[]>([])
    const [loader,SetLoader] = useState(true);
    
    useEffect(()=>{ 
      async function fetchData() {
        const res = await axios.get('https://backend.aryansharma6779.workers.dev/api/v1/tournament/get')
        
        
        setData(res.data.tournaments)
        SetLoader(false)
        
      }
      fetchData()
        
      
    },[])
    
    
    
    
  return (
    <div className=" flex flex-col items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black w-screen min-h-screen  ">

      <img src="/Gamer2.png" className="w-screen" alt="gamer" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 justify-between  items-center mt-2 ">

      {(loader)?<Loader/> :
      
      data.map((tournament, index) => (
  <TournamentCard id={tournament.id} mode={tournament.mode} description={tournament.description} game={tournament.game} price={tournament.price} registeredPlayers={tournament.registeredUser.length} maxPlayer={tournament.maxmembers}/>
))}

        
        

        
      </div>
    </div>
  );
}
