import CodeMirror from '@uiw/react-codemirror';
import {useState} from "react";
import {NodeResizer} from "@reactflow/node-resizer";

const CodeNode=(nodeProps)=>{

    const [nodeData,setNodeData]=useState(nodeProps.data.node_data);

    return (
        <div
            className={"CodeNode"}
        >
            <NodeResizer
            />
            <CodeMirror
                theme={"dark"}
                value={nodeData?.code}
                onChange={(newCode)=>{
                    setNodeData({
                        ...nodeData,
                        code:newCode
                    })
                }}
            />
        </div>
    )
}

export {
    CodeNode
}
