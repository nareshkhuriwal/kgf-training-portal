import { useState } from "react"


export function Demo(){

    const [name, setName] = useState("Naresh")
    return (
        <div> My Name is: {name}
        
        
        <hr/>
        <button 
        className="rounded-md bg-brand px-4 py-2 font-semibold text-white disabled:opacity-60"
        onClick={()=> setName("Rohan")}

        >Change Name</button>
        
        </div>


        
    )
}