
interface Props {
    label : string
    onClick : ()=>void
}
export function Button({label ,onClick}: Props ){
    return(
        <div>
            <div>
                <button className="text-center text-white border rounded-3xl w-32 h-12 bg-sky-500 mt-5  hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]" onClick={()=>{
                    onClick()
                }}>{label}</button>
            </div>
        </div>
    )
}