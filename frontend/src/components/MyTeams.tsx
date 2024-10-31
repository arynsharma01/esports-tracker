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
            }, 5000);
        } else {
            async function getTeams() {
                const res = await axios.get('https://backend.aryansharma6779.workers.dev/api/v1/user/view/myteams', config);
                setTeams(res.data.teams);
            }
            getTeams();
        }
    }, [navigate]);

    return (
        <div className="flex flex-cols justify-evenly ">
            {teams.length > 0 ? (
                
                teams.map(team => (
                    
                    <Team teamid={team.id} teamName={team.name} description= {team.description} image={team.image} ></Team>
                ))
            ) : (
                <p>Loading teams... / no teams found </p>
            )}
        </div>
    );
}
