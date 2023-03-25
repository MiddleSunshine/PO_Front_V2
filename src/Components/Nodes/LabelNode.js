import {Input} from "antd";
import {useState} from "react";
import React from "react";
import { NodeResizer } from '@reactflow/node-resizer';
import { useReactFlow } from 'reactflow';
import {UpdateNode} from "./BasicNode";

const LabelNode=React.memo((node)=>{

    const [label,setLabel]=useState(node.data.node_data?.label);
    const instance=useReactFlow();

    return (
        <div className={"BasicNodeOutside"}>
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