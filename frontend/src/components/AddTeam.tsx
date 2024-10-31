import { useNavigate } from "react-router-dom"
import { Input } from "./Input";
import { useState } from "react";
import { Button } from "./Button";
import axios from "axios";

export function AddTeam() {
    const [teamName, setTeamName] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState<File | null>(null)

    const [warning, setWarning] = useState("")
    const [color, setColor] = useState("")

    const navigate = useNavigate()


    if (localStorage.getItem("Authorization") == null) {
        return <div>
            Not signedin
            {setTimeout(() => {
                navigate('/signup')
            }, 4000)}
        </div>
    }

    let formdata = new FormData()
    formdata.append('name', teamName)
    formdata.append('description', description)
    formdata.append('image', file || "null")

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': localStorage.getItem('Authorization')
        }
    }

    async function createTeam() {
        try {
            const res = await axios.post('http://127.0.0.1:8787/api/v1/team/add', formdata, config)
            // console.log(res);

            setWarning(res.data.message)
            console.log(setWarning);
            setColor("green")
            
            setTimeout(()=>{
                navigate('/add-palyers',{replace :true,
                    state :{}
                })
            },7000)
            // console.log(res.data.message);

        }
        catch (e: any) {


            console.log(e.response.data.message);

            setWarning("Invalid format / team already exists ")
            setColor("red")
        }


    }

    
    return <div className="flex  items-center justify-center  min-h-[80vh]">

        <div className="flex flex-col justify-center items-center border rounded-lg border-gray-400 w-full max-w-md p-6 shadow-lg bg-gray-50 space-y-4">

            <div className="font-bold text-3xl p-2 ">
                New Team
            </div>
            <Input heading="Team Name " placeholder="minimum 3 letters " type="text" onChange={setTeamName}></Input>
            <Input heading="Description " placeholder="optional " type="text" onChange={setDescription}></Input>

            <div className="font-semibold p-1 text-left ">
                Image
            </div>

            <input type="file" accept="image/jpeg,image/png" onChange={(e) => {
                if (!e.target.files || e.target.files.length === 0) {
                    console.log("select a file ");

                    return
                }
                setFile(e.target.files[0])

            }} className="p-2 border rounded-md border-gray-500 w-60 h-12 focus:ring-2 focus:ring-blue-500" />

            <Button label="Add team " onClick={() => {
                createTeam()
            }}></Button>
            <div
                style={{ color: color }}
                className="mt-2 text-center font-serif"
            >
                {warning}
                {}
            </div>

        </div>
    </div>

}