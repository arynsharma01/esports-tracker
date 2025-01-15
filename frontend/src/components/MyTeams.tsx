import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Team from "./Team";



interface Data {
    name: string,
    description: string,
    image: string,
    id: string
}

export function MyTeams() {
    const navigate = useNavigate();
    const [teams, setTeams] = useState<Data[]>([]);
    const config = {
        headers: {
            'Authorization': localStorage.getItem('Authorization')
        }
    };

    useEffect(() => {
        if (localStorage.getItem("Authorization") === null) {
            
            setTimeout(() => {
                navigate('/signin');
            }, 3000);
            
        } else {
            async function getTeams() {
                const res = await axios.get('https://backend.aryansharma6779.workers.dev/api/v1/user/view/myteams', config);
                setTeams(res.data.teams);
            }
            getTeams();
        }
    }, [navigate]);

    async function deleteTeam(teamid: string) {
        try{
        const res = await axios.delete('https://backend.aryansharma6779.workers.dev/api/v1/team/delete',{
            headers :{
                Authorization : localStorage.getItem('Authorization'),
                teamid : teamid
            }
        })
        
        console.log(res.data.message);
        window.location.reload()
        
        

        
    }
    catch(e:any){
        console.log(e.response.data.message);
        
    }

    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teams.length > 0 ? (

                teams.map(team => (
                    <div className="flex flex-col justify-center items-center">

                        <Team teamid={team.id} teamName={team.name} description={team.description} image={team.image}  ></Team>

                        <div className="flex ">

                        <button id={team.id} className="rounded-lg mb-3 bg-black hover:bg-black text-white hover w-32 h-12
                     hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] " onClick={() => {
                                console.log(team.id);

                                deleteTeam(team.id)
                            }}>Remove </button>
                        
                        <button className=" ml-3 rounded-lg bg-black hover:bg-black text-white hover w-32 h-12
                     hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] " onClick={()=>{

                        navigate('/add-players',{
                            replace :true,
                            state :{
                             teamid : team.id   
                            }
                        })

                     }} >Add Player</button>
                        </div>
                        

                    </div>
                ))
            ) : (
                <p>Loading teams... / no teams found </p>
            )}
        </div>
    );
}
