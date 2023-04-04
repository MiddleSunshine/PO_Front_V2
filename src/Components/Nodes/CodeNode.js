import {useState} from "react";
import {NodeResizer} from "@reactflow/node-resizer";
import SyntaxHighlighter from 'react-syntax-highlighter';

const CodeNode=(nodeProps)=>{

    const [nodeData,setNodeData]=useState(nodeProps.data.node_data);

    return (
        <div
            className={"CodeNode"}
        >
            <NodeResizer
            />
            <SyntaxHighlighter
                language={nodeData.language}
            >
                {nodeData.code}
            </SyntaxHighlighter>
        </div>
    )
}

export {
    CodeNode
}
