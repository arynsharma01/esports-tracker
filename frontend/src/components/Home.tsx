import { useEffect, useState } from "react";


import axios from "axios";

import { Quote } from "./Quote";
import Loader from "./Loader";

import Team from "./Team";

import { Link } from "react-router-dom";


interface Data {
  name: string,
  description: string,
  image: string
  id: string
}
export default function Home() {
  const [teams, setTeams] = useState<Data[]>([])
  const [load, setLoad] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {

        const res = await axios({
          method: 'get',
          url: 'https://backend.aryansharma6779.workers.dev/api/v1/team/view',
        });

        setTeams(res.data.teams);  // Store the response data in state
        setLoad(false)
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };


    fetchData();  // Call the async function
  }, []);


  if (load == true) {
    return (
      <div>
        <div>
          <Quote></Quote>
        </div>
        <div className="flex flex-col justify-center items-center h-screen">
          <Loader></Loader>
        </div>
      </div>
    )
  }


  return (
    <div>
      <Quote></Quote>

      <div className="flex justify-center text-center p-4 w-screen">
        Teams
      </div>



      <div className="p-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-4 gap-4 items-center w-full ">

        {teams.map((team, index) => (



          <Team
            key={index}
            teamid={team.id}
            teamName={team.name}
            description={team.description}
            image={team.image}
          />




        ))}
      </div>
      {}
      <div className="flex flex-col  justify-center text-center w-screen">
        <div className="text-slate-500">
          Can't see your fav team here ? Register now and add your team
        </div>
        <div>
          <Link className="text-blue-600 underline" to = "/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
}


