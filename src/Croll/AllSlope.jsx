import axios from "axios";
import { useEffect, useState } from "react"

function AllSlope(){

    console.log("mount");
    const [result,setResult]= useState(1);

    useEffect(()=>{
        axios.get("http://localhost:8001/",{})
        .then((Response)=>{
            console.log(Response);
            setResult(Response.data);
        })
        .catch((Error)=>{
            console.log(Error);
        })
    },[])
    ;

    return(
        <h2>{result}</h2>
    )
    ;
}

export default AllSlope;