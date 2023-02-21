import { useReactFlow } from 'reactflow';
import React from 'react';

const PointNodeView=React.memo((node)=>{
    return (
        <h1>
            PointNodeView
        </h1>
    )
})

const PointNodeEditor=(node)=>{
    return (
        <div></div>
    )
}

const PointNodeCreator=React.memo((node)=>{
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
})

export {
    PointNodeView,
    PointNodeEditor,
    PointNodeCreator
}