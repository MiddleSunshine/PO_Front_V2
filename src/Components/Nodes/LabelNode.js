import {Input} from "antd";
import {useState} from "react";
import {UpdateNode} from "./BasicNode";

const LabelNode=(node)=>{

    const [label,setLabel]=useState(node.data.node_data?.label);

    return (
        <div className={"BasicNodeOutside"}>
            <div className={"LabelNode"}>
                <Input
                    value={label}
                    onChange={(e)=>{
                        setLabel(e.target.value)
                    }}
                    onPressEnter={()=>{
                        let newNodes=node;
                        newNodes.data.node_data={
                            label:label
                        };
                        UpdateNode(newNodes)
                    }}
                />
            </div>
        </div>
    )
}

export {
    LabelNode
}