
interface Props {
    heading: string
    placeholder : string 
    onChange : (value :string)=>void
    type : string 
}


export function Input({heading,placeholder,type,onChange} :Props ){
    return <div className="flex flex-col  justify-center">
        <div className="font-semibold p-1 ">
            {heading}
        </div>
        <div>
            <input type={type} onChange={(e)=>{
                onChange(e.target.value)
            }} className="p-2 border rounded-md border-gray-500 w-60 h-12 focus:ring-2 focus:ring-blue-500"  placeholder={placeholder} />
        </div>
    </div>
}