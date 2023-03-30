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
    ExportOutlined,
    PlusOutlined
} from '@ant-design/icons'
import {NodeResizer} from "@reactflow/node-resizer";
import {getId} from "../../config/WhiteBord";

const ICON_LENGTH = 2;
const LENGTH_AMOUNT = 23;
const TYPE_FILE = 'File';
const TYPE_FOLDER = 'Folder';

const NEW_NODE_DATA_TEMPLATE={
    node_data:{
        type:TYPE_FILE,
        offset:0
    },
    data:{}
}

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

    const createNode=(index,offset=0)=>{
        let newNodeData=nodeData;
        let newNode={
            node_data:{
                type:TYPE_FILE,
                offset:offset
            },
            data:{
                ID:getId(TYPE_FILE)
            }
        };
        newNodeData.splice(index,0,newNode);
        setNodeData(newNodeData);
        setSelectedNode(newNode)
    }

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
            <List
                dataSource={nodeData}
                renderItem={(n,outsideIndex) => {
                    return (
                        <div>
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
                                        onPressEnter={()=>{

                                        }}
                                    />
                                </Col>
                            </Row>
                            {
                                selectedNode?.data?.ID==n.data.ID
                                ?<Row className={"EachRow"}>
                                        <Col
                                            offset={n.node_data.offset+ICON_LENGTH}
                                            span={LENGTH_AMOUNT-ICON_LENGTH-n.node_data.offset}
                                        >
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
                                                <Button
                                                    size={"small"}
                                                    type={"link"}
                                                    icon={<PlusOutlined />}
                                                    onClick={()=>{
                                                        createNode(outsideIndex+1,n.node_data.offset)
                                                    }}
                                                >
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    :''
                            }
                        </div>
                    )
                }}
                />
        </div>
    )
})

    export {
        DirectoryNode
    }