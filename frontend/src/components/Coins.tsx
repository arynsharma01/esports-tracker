import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Coins(){
    const [coins ,setCoins] = useState(0);
    const navigate = useNavigate()
    useEffect(()=>{

        async function getCoins() {
            
            const res = await axios.get('https://backend.aryansharma6779.workers.dev/api/v1/user/coins',{
                headers :{
                    'Authorization' : localStorage.getItem('Authorization')
                }
            })
            
setCoins(res.data.coins)
            console.log(res);
            
            
        }
        getCoins()

    },[coins])

    return <>
        <div className="border-1 bg-green-300 hover:bg-green-500 hover:shadow-green-500 flex  
        shadow-xl  rounded-md min-w-12  lg:w-18 text-center p-1 font-extralight hover:cursor-pointer " 
        onClick={()=>{
            navigate('/add-coins')
        }}>
            <img src="/coins.png" className="size-6 mr-1" alt="coins" /> {coins}
        </div>
    </>
}