import axios from "axios"
import { useEffect, useState } from "react";

import { Playerinfo } from "./Playerinfo";
import { useLocation } from "react-router-dom";


interface PlayerData {
    name: string
    surname: string
    ign: string
    role: string
    handler: string
}

export function Players() {
    //     const [searchParams] = useSearchParams();
    //   const playerId = searchParams.get('id');
    //   console.log(playerId);


    const location = useLocation()
    const { teamName, description, image, teamid } = location.state || {}
    const [players, setPlayers] = useState<PlayerData[]>([])
    useEffect(() => {

        async function getData() {
            const response = await axios({
                method: 'get',
                url: `https://backend.aryansharma6779.workers.dev/api/v1/player/view?id=${teamid}`,

            })
            const data = response.data
            setPlayers(data.players)

            console.log(data.players);
        }
        getData()
    }, [teamid])
    return (
        <div>

            <div className="flex flex-col items-center justify-center w-screen">
                <img className="w-[70px] h-[70px] rounded-lg object-fill p-4 mt-3 " src={image} alt="teamImage" />
                <div className="text-center font-bold text-2xl "> {teamName} </div>
                <div className="text-center font-light text-gray-600"> {description} </div>
            </div>

            <div className="flex flex-col justify-center items-center mt-6 p-4 gap-8">

                <table className="table-auto md:tabel-fixed w-2/4 ">
                    <thead>
                        <tr>
                            <th className="px-4">Name</th>
                            <th className="px-4">Surname  </th>
                            <th className="px-4">Ingame Name </th>
                            <th className="px-4"> Role </th>
                            <th className="px-4"> Social</th>
                        </tr>
                    </thead>
                    <tbody className="text-center ">
                        {players.map((player) => (
                            
                            <Playerinfo

                                playerName={player.name}
                                playerSurname={player.surname}
                                ign={player.ign}
                                role={player.role} handler={player.handler} />
                        ))}
                    </tbody>

                </table>


            </div>
        </div>
    )


}



