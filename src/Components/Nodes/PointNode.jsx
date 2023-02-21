import { useReactFlow } from 'reactflow';
import {memo} from "react";

const PointNodeView=(node)=>{
    return (
        <h1>
            PointNodeView
        </h1>
    )
}

const PointNodeEditor=(node)=>{
    return (
        <div></div>
    )
}

const PointNodeCreator=(node)=>{
    const instance=useReactFlow();
    const handleTypeChange=()=>{
        instance.setNodes((nodes)=>nodes.map((n)=>{
            if (n.id==node.id){
                n.type='PointNodeView';
            }
            return n;
        }));
    }
    return (
        <div
            onClick={()=>handleTypeChange()}
        >
            <input
                value={"hello world"}
            />
        </div>
    )
}

export {
    PointNodeView,
    PointNodeEditor,
    PointNodeCreator
}