import {Input} from "antd";
import {useState} from "react";
import React from "react";
import { NodeResizer } from '@reactflow/node-resizer';
import { useReactFlow,Handle } from 'reactflow';
import {UpdateNode} from "./BasicNode";

const LabelNode=React.memo((node)=>{

    const [label,setLabel]=useState(node.data.node_data?.label);
    const instance=useReactFlow();

    return (
        <div className={"BasicNodeOutside"}>
            <Handle
                id={`${node.id}_top`}
                position={"top"}
                type={"target"}
            />
            <Handle
                id={`${node.id}_bottom`}
                position={"bottom"}
                type={"source"}
            />
            <Handle
                id={`${node.id}_left`}
                position={"left"}
                type={"target"}
            />
            <Handle
                id={`${node.id}_right`}
                position={"right"}
                type={"source"}
            />
            <NodeResizer
                isVisible={node.selected}
                color="#ff0071"
            />
            <div className={"LabelNode"}>
                <Input
                    value={label}
                    onChange={(e)=>{
                        setLabel(e.target.value)
                    }}
                    onPressEnter={()=>{
                        let newNode=node;
                        newNode.data.node_data={
                            label:label
                        };
                        UpdateNode(instance,node);
                    }}
                />
            </div>
        </div>
    )
})

export {
    LabelNode
}