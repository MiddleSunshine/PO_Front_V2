import {Input,Button} from "antd";
import {useState} from "react";

const DrawNode=(nodeProps)=>{
    const [nodeData,setNodeData]=useState(nodeProps.data);

    return (
        <div>
            <Input
                value={nodeData.Name}
                onChange={(e)=>{
                    setNodeData({
                        ...nodeData,
                        Name:e.target.value
                    })
                }}
                addonAfter={
                nodeData.hasOwnProperty('ID')
                    ?<Button
                    size={"small"}
                    type={"link"}
                    href={`/`}
                    target={"_blank"}
                    ></Button>
                    :<div></div>
                }
            />
        </div>
    )
}

export {
    DrawNode
}