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
    CloseOutlined,
    ExportOutlined
} from '@ant-design/icons'
import {NodeResizer} from "@reactflow/node-resizer";

const ICON_LENGTH = 2;
const LENGTH_AMOUNT = 23;
const TYPE_FILE = 'File';
const TYPE_FOLDER = 'Folder';

const DirectoryNode = React.memo((nodeProps) => {

    const [nodeData, setNodeData] = useState([
        {
            node_data: {
                type: "Folder",
                offset: 0
            },
            data: {
                ID:1,
                Title: "2"
            }
        },
        {
            node_data: {
                type: "File",
                offset: 2
            },
            data: {
                ID:2,
                Title: "3"
            }
        },
        {
            node_data: {
                type: "File",
                offset: 4
            },
            data: {
                ID:3,
                Title: "3"
            }
        },
        {
            node_data: {
                type: "Folder",
                offset: 0
            },
            data: {
                ID:4,
                Title: "2"
            }
        },
        {
            node_data: {
                type: "File",
                offset: 2
            },
            data: {
                ID:5,
                Title: "3"
            }
        },
    ]);

    const [selectedNode,setSelectedNode]=useState({})

    return (
        <div className={"DirectoryNode"}>
            <NodeResizer
                isVisible={nodeProps.selected}
                color="#ff0071"
            />
            <Row
                onClick={()=>{
                    setSelectedNode({})
                }}
            >
                <Input

                />
            </Row>
            <Row className={"EachRow"}>
                <Col span={24}>
                    <div>
                        <Button
                            size={"small"}
                            type={"link"}
                            icon={<CaretUpOutlined/>}
                        ></Button>
                        <Button
                            size={"small"}
                            type={"link"}
                            icon={<CaretDownOutlined/>}
                        ></Button>
                        <Button
                            size={"small"}
                            type={"link"}
                            icon={<CaretLeftOutlined/>}
                        ></Button>
                        <Button
                            size={"small"}
                            type={"link"}
                            icon={<CaretRightOutlined/>}
                        ></Button>
                        <Button
                            size={"small"}
                            type={"link"}
                            icon={<CloseOutlined />}
                        ></Button>
                    </div>
                </Col>
            </Row>
            <List
                dataSource={nodeData}
                renderItem={(n) => {
                    return (
                        <Row
                            className={"EachRow "+(selectedNode?.data?.ID==n.data.ID?'EachRowSelected':'')}
                            justify={"start"}
                            align={"middle"}
                            onClick={()=>{
                                setSelectedNode(n);
                            }}
                        >
                            <Col
                                offset={n.node_data.offset}
                                span={ICON_LENGTH}
                            >
                                {
                                    n.node_data.type == TYPE_FOLDER
                                        ? <Button
                                            size={"small"}
                                            type={"link"}
                                            icon={<FolderOutlined/>}
                                        >
                                        </Button>
                                        : <Button
                                            size={"small"}
                                            type={"link"}
                                            icon={<FileOutlined/>}
                                        ></Button>
                                }
                            </Col>
                            <Col
                                offset={1}
                                span={LENGTH_AMOUNT - ICON_LENGTH - n.node_data.offset}
                            >
                                <Input
                                    value={n.data.Title}
                                    addonAfter={<Button
                                        size={"small"}
                                        type={"link"}
                                        icon={
                                            <ExportOutlined />
                                        }
                                    ></Button>}
                                />
                            </Col>
                        </Row>
                    )
                }}
                />
        </div>
    )
})

    export {
        DirectoryNode
    }