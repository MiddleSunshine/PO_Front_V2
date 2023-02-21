import { NodeToolbar, useReactFlow,position } from 'reactflow';
import React from 'react';

const PointNodeView=React.memo((node)=>{
    return (
        <div>
            <NodeToolbar
                isVisible={node.selected}
                position={'bottom'}
            >
                <button>Edit</button>
                <button>Delete</button>
            </NodeToolbar>
            <h1
            style={{color:node.selected?'red':'black'}}
        >
            PointNodeView:{node?.data?.label}
        </h1>
        </div>
    )
})

const PointSettingEditor=(node)=>{
    return (
        <div>Setting</div>
    )
}

const PointNodeEditor=(node)=>{
    const instance=useReactFlow();
    const handleDataChange=()=>{
        instance.setNodes((nodes)=>nodes.map((n)=>{
            if (n.id==node.id){
                n.data={
                    label:"label"
                };
            }
            return n;
        }));
    }

    return (
        <div
            onClick={handleDataChange}
        >
            <h1>Change Data</h1>
        </div>
    )
}

const PointNodeCreator=React.memo((node)=>{
    const instance=useReactFlow();
    const handleTypeChange=()=>{
        instance.setNodes((nodes)=>nodes.map((n)=>{
            if (n.id==node.id){
                n.type='PointNodeView';
                n.data={
                    label:"label"
                }
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
    PointNodeCreator,
    PointSettingEditor
}