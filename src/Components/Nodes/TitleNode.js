import { Badge, Button, Input, message } from "antd";
import { useState } from "react";
import { GetNodeStyle } from "./BasicNode";
import { Handle, useReactFlow } from 'reactflow';
import { UpdateNode } from "./BasicNode";
import { NodeResizer } from "@reactflow/node-resizer";
import { SaveOutlined } from "@ant-design/icons";

const TitleNode = (nodeProps) => {
    const [data, setData] = useState(nodeProps.data.data);
    const [unsaveData, setUnSaveData] = useState(false);
    const instance = useReactFlow();

    const SAVE_DATA = (data) => {
        let newNode = { ...nodeProps };
        newNode.data.data = data;
        UpdateNode(instance, newNode);
    }

    const finishInput = (data) => {
        setData(data);
        SAVE_DATA(data);
        setUnSaveData(false);
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
        <Handle
            className={"TargetConnection"}
            type={"target"}
            position={"left"}
        />
        <div className={"Content"}>
            {
                nodeProps.selected
                    ? <Input
                        defaultValue={data.Name}
                        onChange={(e) => {
                            setData({
                                ...data,
                                Name: e.target.value
                            });
                            setUnSaveData(true)
                        }}
                        onPressEnter={() => {
                            finishInput(data);
                        }}
                        addonAfter={
                            <Button
                                size={"small"}
                                type={"link"}
                                icon={<SaveOutlined />}
                                onClick={() => {
                                    finishInput(data);
                                }}
                            >
                            </Button>
                        }
                    />
                    : <h4
                        style={
                            unsaveData
                                ? {
                                    border: '2px dashed orange',
                                    borderRadius: "25px"
                                }
                                : {

                                }
                        }
                    >
                        {data.Name ? data.Name : "Click"}
                    </h4>

            }

        </div>
    </div>
}

export {
    TitleNode
}
