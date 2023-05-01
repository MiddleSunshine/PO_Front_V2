import { Input } from "antd";
import { useState } from "react";
import React from "react";
import { NodeResizer } from '@reactflow/node-resizer';
import { useReactFlow, Handle, NodeToolbar } from 'reactflow';
import { GetNodeStyle, UpdateNode } from "./BasicNode";

const LabelNode = (node) => {

    const [label, setLabel] = useState(node.data.node_data?.label);
    const [unsaveData, setUnSaveData] = useState(false);
    const instance = useReactFlow();

    const handleSaveNodeData = (newLabel) => {
        let newNode = node;
        newNode.data.node_data = {
            label: newLabel
        };
        setUnSaveData(false);
        UpdateNode(instance, node);
    }

    return (
        <div
            className={"LabelNode"}
            style={
                GetNodeStyle(node, unsaveData)
            }
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
            {/* <NodeToolbar>
                <Form>
                    <Form.Item
                        label={"Label"}
                    >

                    </Form.Item>
                    <Form.Item
                        label={"Option"}
                    >
                        <Button
                            type={"primary"}
                            onClick={() => {
                                handleSaveNodeData(label);
                            }}
                        >
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </NodeToolbar> */}
            <div>
                <Input
                    style={{ backgroundColor: "inherit" }}
                    className="InputLikeTitle"
                    value={label}
                    onChange={(e) => {
                        setLabel(e.target.value);
                        setUnSaveData(true);

                    }}
                    onPressEnter={() => {
                        handleSaveNodeData(label);
                    }}
                />
            </div>
        </div>
    )
}

export {
    LabelNode
}
