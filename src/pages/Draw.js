import {useParams} from "react-router-dom";
import {useState} from "react";

const DrawPage = ()=>{
    const {id}=useParams();
    const [nodeData,setNodeData]=useState({});



    return (
        <div>

        </div>
    )
}

export default DrawPage