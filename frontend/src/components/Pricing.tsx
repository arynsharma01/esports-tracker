

interface props {
  id :string,
  price : number,
  coins : number,
  index : number ,
  
  setPurchased : (id:string)=>void,
  setSelect : (value :boolean)=>void,
  purchased : string
}
export default function Pricing({id,price,coins,index  ,setPurchased,setSelect,purchased}:props) {
    return (
      <div className={`bg-slate-200 hover:bg-green-200 w-[150px] h-[100px] rounded-xl flex items-center justify-center flex-col sle hover:border-red-900 border hover:cursor-pointer 
        ${purchased === id ?  "border-2 border-red-900" : ""} `}

      onClick={()=>{
        
        setPurchased(id)
        setSelect(true)
        console.log(purchased);
        
      }}
      >
        <div className="m-2 flex ">
          <div>
            <img src="/coins.png" className="size-8 p-1" alt="coins" />
          </div>
          <div className="font-bold text-2xl">
            {coins}
          </div>
        </div>
        <div className="m-2 text-2xl font-semibold">
        ₹ {price}
        </div>
      </div>
    )
  }
  