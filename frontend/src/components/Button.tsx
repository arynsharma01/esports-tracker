
interface Props {
    label : string
    onClick : ()=>void
}
export function Button({label ,onClick}: Props ){
    return(
        <div>
            <div>
                <button className="text-center text-white border rounded-3xl w-32 h-12 bg-sky-500 mt-5 hover:shadow-lg hover:shadow-[#1DA1F2]" onClick={()=>{
                    onClick()
                }}>{label}</button>
            </div>
        </div>
    )
}