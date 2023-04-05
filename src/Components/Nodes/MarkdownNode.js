import {useState} from "react";
import {GetNodeStyle,UpdateNode} from "./BasicNode";
import MarkdownPreview from '@uiw/react-markdown-preview';
import {NodeToolbar} from "reactflow";
import {Button, Modal} from "antd";
import ReactCodeMirror from "@uiw/react-codemirror";
import {useReactFlow} from 'reactflow';
import {NodeResizer} from "@reactflow/node-resizer";
const MarkdownNode=(nodeProps)=>{
    const [nodeData,setNodeData]=useState(nodeProps.data.node_data);
    const [editMode,setEditMode]=useState(nodeProps.data.node_data.markdown=='');

    const instance=useReactFlow();

    const handleSave=()=>{
        let newNode=nodeProps;
        newNode.data.node_data=nodeData;
        UpdateNode(instance,newNode);
    }

    return(
        <div
            style={GetNodeStyle(nodeProps)}
        >
            <NodeResizer
                isVisible={nodeProps.selected}
            />
            <NodeToolbar>
                <Button
                    type={"primary"}
                    onClick={()=>{
                        setEditMode(true);
                    }}
                >
                    Settings
                </Button>
            </NodeToolbar>
            {
                nodeData.markdown
                    ?<MarkdownPreview
                        source={nodeData.markdown}
                    />
                    :<h3>Input</h3>
            }
            <div>
                <Modal
                    open={editMode}
                    width={1200}
                    onCancel={()=>{
                        setEditMode(false);
                    }}
                    onOk={()=>{
                        handleSave();
                        setEditMode(false);
                    }}
                >
                    <ReactCodeMirror
                        theme={"dark"}
                        value={nodeData.markdown}
                        onChange={(newMarkdown)=>{
                            setNodeData({
                                ...nodeData,
                                markdown:newMarkdown
                            })
                        }}
                    />
                </Modal>
            </div>
        </div>
    )
}

export {
    MarkdownNode
}