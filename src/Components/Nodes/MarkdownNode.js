import {useState} from "react";
import {GetNodeStyle,UpdateNode} from "./BasicNode";
import MarkdownPreview from '@uiw/react-markdown-preview';
import {Handle, NodeToolbar} from "reactflow";
import {Button, Divider, Form, Input, Modal} from "antd";
import ReactCodeMirror from "@uiw/react-codemirror";
import {useReactFlow} from 'reactflow';
import {NodeResizer} from "@reactflow/node-resizer";
const MarkdownNode=(nodeProps)=>{
    const [nodeData,setNodeData]=useState(nodeProps.data.node_data);
    const [data,setData]=useState(nodeProps.data.data);
    const [editMode,setEditMode]=useState(nodeProps.data.node_data.markdown=='');

    const instance=useReactFlow();

    const handleSave=()=>{
        let newNode=nodeProps;
        newNode.data.node_data=nodeData;
        newNode.data.data=data;
        UpdateNode(instance,newNode);
    }

    return(
        <div
            style={GetNodeStyle(nodeProps)}
            className={"MarkdownNode"}
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
            <Handle
                type={"target"}
                position={"left"}
            />
            <div
                className={"Title"}
            >
                {
                    data.Name
                        ?<h4>{data.Name}</h4>
                        :""
                }
            </div>
            <div
                className={"Content"}
            >
                {
                    nodeData.markdown
                        ?<MarkdownPreview
                            source={nodeData.markdown}
                        />
                        :"......"
                }
            </div>
            <div>
                <Modal
                    title={
                        <div
                         style={{width:"90%"}}
                        >
                            <Input
                                value={data?.Name}
                                onChange={(e)=>{
                                    setData({
                                        ...data,
                                        Name:e.target.value
                                    })
                                }}
                            />
                        </div>
                    }
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