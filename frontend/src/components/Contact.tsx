

export default function Contact(){
    return <div>
        <div className="flex flex-col items-center justify-center">
        <div className="text-center flex items-center">
        <img className="size-16 hover:cursor-pointer hover:size-20 p-4" src="github.png" alt="git" onClick={()=>{
             window.open('https://github.com/arynsharma01/esports-tracker', '_blank')
        }} />
        Github
        </div>
        <div className="text-center flex items-center">
        <img className="size-16 hover:cursor-pointer hover:size-20 p-4" src="LinkedIn-Logo.wine.svg" alt="git" onClick={()=>{
             window.open('https://www.linkedin.com/in/aryan-sharma-36192724b/', '_blank')
        }} />
        Linkedin 
        </div>
        <div className="text-center flex items-center">
        <img className="size-16 hover:cursor-pointer hover:size-20 p-4" src="Instagram_icon.png.webp" alt="git" onClick={()=>{
             window.open('https://www.instagram.com/arynsharmaa/', '_blank')
        }} />
        Instagram 
        </div>

        </div>
    </div>
}