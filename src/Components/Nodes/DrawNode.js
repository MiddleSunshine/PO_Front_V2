import { Input, Button, message } from "antd";
import { useState } from "react";
import { CreateNodeAsync, GetNodeStyle, UpdateNode } from "./BasicNode";
import {
    ExportOutlined,
    SaveOutlined,
    FundViewOutlined
} from '@ant-design/icons';
import { Handle, useReactFlow } from 'reactflow';
import { NodeResizer } from "@reactflow/node-resizer";

const DrawNode = (nodeProps) => {
    const [nodeData, setNodeData] = useState(nodeProps.data.data);
    // const instance = useReactFlow();

    const SAVE_INTO = () => {
        if (nodeData.hasOwnProperty('ID')) {
            let newNode = { ...nodeProps };
            newNode.data.data = nodeData;
            // UpdateNode(instance, newNode);
            nodeProps.data.saveData(newNode);
        }
    }

    const handleCreateNode = () => {
        if (!nodeData.hasOwnProperty('ID')) {
            if (!nodeData?.Name) {
                message.warning("Please input the title");
                return false;
            }
            CreateNodeAsync('DrawNode', nodeData.Name, nodeProps.id)
                .then((res) => {
                    if (res.Data.data.ID) {
                        setNodeData(res.Data.data);
                        message.success("Create Draw Success");
                    } else {
                        message.warning(res.Message);
                    }
                })
                .then(() => {
                    SAVE_INTO();
                })
        } else {
            SAVE_INTO();
        }
    }

    return (
        <div
            style={GetNodeStyle(nodeProps)}
            className={"DrawNode"}
        >
            <Handle
                className={"TargetConnection"}
                type={"target"}
                position={"left"}
            />
            <NodeResizer
                isVisible={nodeProps.selected}
            />
            <div
                className={"Content"}
            >
                <Input
                    value={nodeData.Name}
                    onChange={(e) => {
                        setNodeData({
                            ...nodeData,
                            Name: e.target.value
                        })
                    }}
                    onPressEnter={() => {
                        handleCreateNode();
                    }}
                    addonAfter={
                        nodeData.hasOwnProperty('ID')
                            ? <Button
                                size={"small"}
                                type={"link"}
                                href={`/draw/${nodeData.ID}`}
                                target={"_blank"}
                                icon={<ExportOutlined />}
                            ></Button>
                            : <Button
                                size={"small"}
                                type={"link"}
                                icon={<SaveOutlined />}
                                onClick={() => {
                                    handleCreateNode();
                                }}
                            ></Button>
                    }
                    addonBefore={
                        <FundViewOutlined />
                    }
                />
            </div>
        </div>
    )
}

export {
    DrawNode
}
