import { Button, Form, Input } from "antd";
import { useState } from "react";
import React from "react";
import { NodeResizer } from '@reactflow/node-resizer';
import { useReactFlow, Handle, NodeToolbar } from 'reactflow';
import { GetNodeStyle, UpdateNode } from "./BasicNode";

const LabelNode = React.memo((node) => {

    const [label, setLabel] = useState(node.data.node_data?.label);
    const instance = useReactFlow();

    const handleSaveNodeData = () => {
        let newNode = node;
        newNode.data.node_data = {
            label: label
        };
        UpdateNode(instance, node);
    }

    return (
        <div
            className={"LabelNode"}
            style={GetNodeStyle(node)}
        >
            <Handle
                className={"TargetConnection"}
                id={`${node.id}_top`}
                position={"top"}
                type={"target"}
            />
            <Handle
                className={"SourceConnection"}
                id={`${node.id}_bottom`}
                position={"bottom"}
                type={"source"}
            />
            <Handle
                className={"TargetConnection"}
                id={`${node.id}_left`}
                position={"left"}
                type={"target"}
            />
            <Handle
                className={"SourceConnection"}
                id={`${node.id}_right`}
                position={"right"}
                type={"source"}
            />
            <NodeResizer
                isVisible={node.selected}
                color="#ff0071"
            />
            <NodeToolbar>
                <Form>
                    <Form.Item
                        label={"Label"}
                    >
                        <Input
                            value={label}
                            onChange={(e) => {
                                setLabel(e.target.value)
                            }}
                            onPressEnter={() => {
                                handleSaveNodeData();
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={"Option"}
                    >
                        <Button
                            type={"primary"}
                            onClick={handleSaveNodeData}
                        >
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </NodeToolbar>
            <div>
                <p>
                    {label ? label : "请输入标签"}
                </p>
            </div>
        </div>
    )
})

export {
    LabelNode
}
