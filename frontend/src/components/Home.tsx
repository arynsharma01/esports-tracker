import { useEffect, useState } from "react";
import { Team } from "./Team";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Quote } from "./Quote";

interface Data{
    name : string,
    description : string,
    image : string
    id : string
}
export default  function Home(){
    const [teams,setTeams] = useState<Data[]>([])
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res  = await axios({
              method: 'get',
              url: 'http://127.0.0.1:8787/api/v1/team/view',
            });
            
            setTeams(res.data.teams);  // Store the response data in state
            
          } catch (error) {
            console.error('Error fetching teams:', error);
          }
        };
        
        
        fetchData();  // Call the async function
      }, []);
      
     
     
     
      
     return (
      <div>
        <Quote></Quote>
        <div>
          Teams
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-4 gap-4 items-center w-full ">
          
        {teams.map((team, index) => (
          
          
          <Team
            key={index}
            id = {team.id}
            name={team.name}
            description={team.description}
            image={team.image}
          />
          
        ))}
      </div>
      </div>
    );
  }
        
  
