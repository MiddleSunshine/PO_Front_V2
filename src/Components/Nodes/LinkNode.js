import {GetNodeStyle} from "./BasicNode";
import React, {useState} from "react";
import {Button, Form, Input, List} from "antd";
import {Handle, NodeToolbar} from "reactflow";
import {NodeResizer} from "@reactflow/node-resizer";

const LinkNode=(nodeProps)=>{
    const [nodeData,setNodeData]=useState(nodeProps.data.node_data);
    const [data,setData]=useState(nodeProps.data.data);

    return (
        <div
            style={GetNodeStyle(nodeProps)}
            className={"LinkNode"}
        >
            <NodeToolbar>
                <Form
                    layout={"vertical"}
                >
                    <Form.Item
                        label={"Title"}
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
                    </Form.Item>
                    <Form.Item
                        label={"Link"}
                    >
                        <Input
                            value={nodeData.link}
                            onChange={(e)=>{
                                setNodeData({
                                    ...nodeData,
                                    link:e.target.value
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={"Options"}
                    >
                        <Button>Save</Button>
                    </Form.Item>
                </Form>
            </NodeToolbar>
            <NodeResizer
                isVisible={nodeProps.selected}
            />
            <Handle
                id={`${nodeProps.id}_top`}
                position={"top"}
                type={"target"}
            />
            <Handle
                id={`${nodeProps.id}_bottom`}
                position={"bottom"}
                type={"source"}
            />
            <Handle
                id={`${nodeProps.id}_left`}
                position={"left"}
                type={"target"}
            />
            <Handle
                id={`${nodeProps.id}_right`}
                position={"right"}
                type={"source"}
            />
            <Button
                type={"link"}
                href={nodeData.link}
                target={"_blank"}
            >
                {data?.Name?data.Name:"Link"}
            </Button>
        </div>
    )
}

export {
    LinkNode
}