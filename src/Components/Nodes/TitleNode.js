import { Button, Input, message } from "antd";
import { useState } from "react";
import { CreateNodeAsync, GetNodeStyle } from "./BasicNode";
import { Handle, NodeToolbar, useReactFlow } from 'reactflow';
import { UpdateNode } from "./BasicNode";
import { NodeResizer } from "@reactflow/node-resizer";
import { SaveOutlined } from "@ant-design/icons";

const TitleNode = (nodeProps) => {
    const [data, setData] = useState(nodeProps.data.data);
    const instance = useReactFlow();

    const SAVE_DATA = (data) => {
        if (data.hasOwnProperty('ID')) {
            let newNode = nodeProps;
            newNode.data.data = data;
            UpdateNode(instance, newNode);
        }
    }

    const finishInput = () => {
        if (!data?.Name) {
            message.warning("Please input the title");
            return false;
        }
        if (!data.hasOwnProperty('ID')) {
            CreateNodeAsync('TitleNode', nodeProps.id, data.Name)
                .then((res) => {
                    if (res.Data.data) {
                        setData(res.Data.data)
                        SAVE_DATA(res.Data.data);
                    } else {
                        message.warning(res.Message);
                    }
                })
        } else {
            SAVE_DATA(data);
        }
    }

    return <div
        style={GetNodeStyle(nodeProps)}
        className={"TitleNode"}
    >
        <NodeResizer
            isVisible={nodeProps.selected}
        />
        <Handle
            className={"SourceConnection"}
            type={"source"}
            position={"right"}
        >
        </Handle>
        <NodeToolbar>
            <Input
                value={data.Name}
                onChange={(e) => {
                    setData({
                        ...data,
                        Name: e.target.value
                    })
                }}
                onPressEnter={() => {
                    finishInput();
                }}
                addonAfter={
                    <Button
                        size={"small"}
                        type={"link"}
                        icon={<SaveOutlined />}
                        onClick={() => {
                            finishInput();
                        }}
                    >
                    </Button>
                }
            />
        </NodeToolbar>
        <Handle
            className={"TargetConnection"}
            type={"target"}
            position={"left"}
        />
        <div className={"Content"}>
            <h3>
                {data.Name ? data.Name : "Click"}
            </h3>
        </div>
    </div>
}

export {
    TitleNode
}
