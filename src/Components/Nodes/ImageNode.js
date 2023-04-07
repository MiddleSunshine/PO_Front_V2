import {Form, Image, Input} from "antd";
import {NodeResizer} from '@reactflow/node-resizer';
import React, {useEffect, useState} from "react";
import {GetNodeStyle, UpdateNode} from "./BasicNode";
import {useReactFlow, Handle, NodeToolbar} from 'reactflow';

const ImageNode = React.memo((nodeProps) => {

    const [nodeData, setNodeData] = useState(nodeProps.data.node_data)
    const instance = useReactFlow();
    useEffect(() => {
        setNodeData(nodeProps?.data?.node_data);
    }, [nodeProps])

    const handleSaveNodeData = () => {
        let newNode = {...nodeProps};
        newNode.data.node_data = nodeData;
        UpdateNode(instance, newNode);
    }

    return (
        <div
            style={GetNodeStyle(nodeProps)}
        >
            <NodeResizer
                isVisible={nodeProps.selected}
                color="#ff0071"
            />
            <NodeToolbar>
                <Form
                    layout={"vertical"}
                >
                    <Form.Item
                        label={"Title"}
                    >
                        <Input
                            value={nodeData?.Title}
                            onChange={(e) => {
                                let n = {...nodeData};
                                n.Title = e.target.value
                                setNodeData(n);
                            }}
                            onBlur={() => {
                                handleSaveNodeData();
                            }}
                            onPressEnter={() => {
                                handleSaveNodeData();
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={"Image Src"}
                    >
                        <Input
                            value={nodeData?.ImageSrc}
                            onChange={(e) => {
                                let n = {...nodeData};
                                n.ImageSrc = e.target.value
                                setNodeData(n);
                            }}
                            onBlur={() => {
                                handleSaveNodeData();
                            }}
                            onPressEnter={() => {
                                handleSaveNodeData();
                            }}
                        />
                    </Form.Item>
                </Form>
            </NodeToolbar>
            <h3>{nodeData?.Title}</h3>
            <Image
                src={nodeData.ImageSrc}
                // src={`${nodeData?.ImageSrc}?x-oss-process=image/resize,h_${nodeProps.height},w_${nodeProps.with}`}
            />
        </div>
    )
})

export {
    ImageNode
}