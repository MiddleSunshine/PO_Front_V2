import {Form, Image, Input} from "antd";
import { NodeResizer } from '@reactflow/node-resizer';
import React, {useEffect, useState} from "react";
const ImageNode=React.memo((nodeProps)=>{

    const [nodeData,setNodeData]=useState(nodeProps.data.node_data)

    useEffect(()=>{
        setNodeData(nodeProps?.data?.node_data);
    },[nodeProps])

    return (
        <div>
            <NodeResizer
                isVisible={nodeProps.selected}
                color="#ff0071"
            />
            <Form
                layout={"vertical"}
            >
                <Form.Item
                    label={"Title"}
                >
                    <Input
                        value={nodeData?.Title}
                        onChange={(e)=>{
                            let n={...nodeData};
                            n.Title=e.target.value
                            debugger
                            setNodeData(n);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label={"Image Src"}
                >
                    <Input
                        value={nodeData?.ImageSrc}
                        onChange={(e)=>{
                            let n={...nodeData};
                            n.ImageSrc=e.target.value
                            setNodeData(n);
                        }}
                    />
                </Form.Item>
            </Form>
            <Image
                src={nodeData?.ImageSrc}
            />
        </div>
    )
})

export {
    ImageNode
}