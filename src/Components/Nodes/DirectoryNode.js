import {useState} from "react";
import React from "react";
import {Button, Col, Divider, Input, List, Row, Select, Timeline} from "antd";
import {
    FolderOutlined,
    FileOutlined,
    CaretUpOutlined,
    CaretDownOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
    CloseCircleOutlined
} from '@ant-design/icons'
import {NodeResizer} from "@reactflow/node-resizer";

const ICON_LENGTH=2;
const LENGTH_AMOUNT=24;
const TYPE_FILE='File';
const TYPE_FOLDER='Folder';

const DirectoryNode=React.memo((nodeProps)=>{

    const [nodeData,setNodeData]=useState([
        {
            node_data:{
                type:"Folder",
                offset:0
            },
            data:{
                Title:"2"
            }
        },
        {
            node_data:{
                type:"File",
                offset:2
            },
            data:{
                Title:"3"
            }
        },
        {
            node_data:{
                type:"File",
                offset:4
            },
            data:{
                Title:"3"
            }
        },
        {
            node_data:{
                type:"Folder",
                offset:0
            },
            data:{
                Title:"2"
            }
        },
        {
            node_data:{
                type:"File",
                offset:2
            },
            data:{
                Title:"3"
            }
        },
    ]);

    return (
        <div className={"DirectoryNode"}>
            <NodeResizer
                isVisible={nodeProps.selected}
                color="#ff0071"
            />
            <Row>
                <Input

                />
            </Row>
            <Row>
                <Col span={24}>
                    <div>
                        <Button
                            size={"small"}
                            type={"link"}
                            icon={<CaretUpOutlined />}
                        ></Button>
                        <Button
                            size={"small"}
                            type={"link"}
                            icon={<CaretDownOutlined />}
                        ></Button>
                        <Button
                            size={"small"}
                            type={"link"}
                            icon={<CaretLeftOutlined />}
                        ></Button>
                        <Button
                            size={"small"}
                            type={"link"}
                            icon={<CaretRightOutlined />}
                        ></Button>
                    </div>
                </Col>
            </Row>
            <List
                dataSource={nodeData}
                renderItem={(n)=>{
                    return (
                        <Row
                            className={"EachRow"}
                            justify={"start"}
                            align={"middle"}
                        >
                            <Col
                                offset={n.node_data.offset}
                                span={ICON_LENGTH}
                            >
                                {
                                    n.node_data.type==TYPE_FOLDER
                                        ?<FolderOutlined />
                                        :<FileOutlined />
                                }
                            </Col>
                            <Col
                                span={LENGTH_AMOUNT-ICON_LENGTH-n.node_data.offset}
                            >
                                <Input
                                    value={n.data.Title}
                                    addonAfter={
                                        <Button
                                            size={"small"}
                                            type={"link"}
                                            icon={<CloseCircleOutlined />}
                                        >
                                        </Button>
                                    }
                                />
                            </Col>
                        </Row>
                    )
                }}
            />
            <Row>
                <Col span={ICON_LENGTH}>
                    
                </Col>
                <Col span={24-ICON_LENGTH}>
                    <Input />
                </Col>
            </Row>
        </div>
    )
})

export {
    DirectoryNode
}