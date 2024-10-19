
interface Props {
    
    // teamName : string,
    // description : string
    playerName : string
    playerSurname : string
    ign : string
    role : string
}
export function Playerinfo({ign,role,playerName,playerSurname} : Props){

    // const image =  `https://esports-tracker.s3.ap-south-1.amazonaws.com/image-${id}`
    return (
        <div className="flex items-center text-center">
            {/* <div>
            <img className="w-[80px] h-[80px]" src={image} alt="team image " />
            </div>
            <div className="text-red-800 font-extrabold">
                {teamName}
                <div>
                    {description}
                </div>
            </div> */}
            <div className="flex flex-row">
                <div>{playerName}</div>
                <div>{playerSurname}</div>
                <div>{ign}</div>
                <div>{role}</div>
            </div>
            
        </div>
    )
}