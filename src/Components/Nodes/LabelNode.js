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
                        let newNodes=instance.getNodes();
                        newNodes.map((n)=>{
                            if (n.id==node.id){
                                n.data.save_into_database=false;
                                n.data.node_data={
                                    label:label
                                }
                            }
                            return n;
                        });
                        instance.setNodes(newNodes)
                    }}
                />
            </div>
        </div>
    )
})

export {
    LabelNode
}