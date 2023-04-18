import { Button, Input } from "antd";
import { useState } from "react";
import {
    FileExcelOutlined,
    ExportOutlined,
    SaveOutlined
} from '@ant-design/icons';
import { CreateNodeAsync, GetNodeStyle, UpdateNode } from "./BasicNode";
import { Handle, useReactFlow, NodeResizer } from 'reactflow';
// 节点
const SheetNode = (nodeProps) => {
    const [data, setData] = useState(nodeProps.data.data);
    const instance = useReactFlow();
    const finishInput = (name) => {
        let newData = { ...data };
        newData.Name = name;
        if (!newData.hasOwnProperty('ID')) {
            CreateNodeAsync('SheetNode', name, nodeProps.id)
                .then((res) => {
                    if (res.Data.data.ID) {
                        setData(res.Data.data);
                        newData = res.Data.data;
                    }
                })
        }
        setData(newData);
        SAVE_INTO(newData);
    }

    const SAVE_INTO = (newData) => {
        if (newData.hasOwnProperty('ID')) {
            let newNode = { ...nodeProps };
            newNode.data.data = newData;
            UpdateNode(instance, newNode);
        }
    }


    return (
        <div
            className="SheetNode"
            style={GetNodeStyle(nodeProps)}
        >
            <Handle
                className={"TargetConnection"}
                type={"target"}
                position={"left"}
            />
            <NodeResizer
                isVisible={nodeProps.selected}
            />
            <Input
                addonBefore={<FileExcelOutlined />}
                value={data?.Name}
                onChange={(e) => {
                    setData({
                        ...data,
                        Name: e.target.value
                    });
                }}
                onPressEnter={() => {
                    finishInput(data?.Name)
                }}
                addonAfter={
                    data?.ID
                        ? <Button
                            size="small"
                            type="link"
                            icon={<ExportOutlined />}
                            href={`/sheet/${data.ID}`}
                            target="_blank"
                        ></Button>
                        : <Button
                            size="small"
                            type="link"
                            icon={<SaveOutlined />}
                            onClick={() => {
                                finishInput(data?.Name)
                            }}
                        ></Button>
                }
            />
        </div>
    )
}



export {
    SheetNode
}
