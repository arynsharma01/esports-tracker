import { useState } from "react";
import AddPlayerInput from "./AddPlayerInput";
import { Button } from "./Button";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddPlayer() {

    const [name,setName]= useState("")
    const [surname,setSurname]= useState("")
    const [inGameName,setIgn]= useState("")
    const [handler,setHandler]= useState("")
    const [role,setRole]= useState("")

    const [warning,setWarning]  = useState('')
    const [color,setColor] = useState('text-green-500')
    const navigate = useNavigate()

    const location = useLocation()
    

    if (localStorage.getItem('Authorization')== null   ) {
        return <div >
            redirecting 
            {setTimeout(()=>{
                navigate('/')
            },2000)}
        </div>
    }
    const authorid =   location.state.teamid || null 
    async function addPlayer() {
        
        
        try {
        const res = await axios.post('https://backend.aryansharma6779.workers.dev/api/v1/player/add',{
            authorid : authorid,
            name: name,
            surname: surname,
            ign: inGameName,
            role: role,
            handler: handler,
            
        },
        
    
    )
        console.log(res);
        
        setWarning("Player added Successfully")
        setColor("text-green-500")
    }
    catch(e:any){
        
        
        console.log(e.response.data.message);
        setWarning("Please check the inputs " + e.response.data.message)
        setColor('text-red-500')
    }
    }

    return <div className="flex  items-center justify-center  min-h-[80vh]">

        <div className=" flex flex-col justify-center items-center border-2 rounded-md border-black w-96 p-4 mt-5 bg-slate-200 min-h-[50vh]" >
            <div className="font-bold text-3xl p-2 ">
                Player Info 
            </div>
            <AddPlayerInput label="Name" placeholder="minimum 3 letters " condition = {true} onChange={setName} ></AddPlayerInput>
            <AddPlayerInput label="Surname" placeholder="minimum 3 letters " condition = {true} onChange={setSurname} ></AddPlayerInput>
            <AddPlayerInput label="InGameName (IGN)" placeholder="minimum 3 letters " condition = {true} onChange={setIgn} ></AddPlayerInput>
            <AddPlayerInput label="Role" placeholder="igl,entry-frag... etc" condition = {true} onChange={setRole} ></AddPlayerInput>
            <AddPlayerInput label="Handler" placeholder="Paste Social Link" condition = {false} onChange={setHandler} ></AddPlayerInput>

            <Button label={"Add Player"} onClick={addPlayer} ></Button>
            <div className={`${color}`}>{warning}</div>
        </div>
    </div>
}