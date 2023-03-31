import {useState} from "react";
import React from "react";
import {Button, Col, Input, List, Row, Modal} from "antd";
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
import {SearchHistoryWhiteBoard} from "../SearchHistoryWhiteBoard";

const ICON_LENGTH = 2;
const LENGTH_AMOUNT = 23;
const TYPE_FILE = 'File';
const TYPE_FOLDER = 'Folder';

const NEW_NODE_DATA_TEMPLATE = {
    node_data: {
        type: TYPE_FILE,
        offset: 0
    },
    data: {
        ID:0,
        Title:""
    }
}

const DirectoryNode = (nodeProps) => {

    const [nodeData, setNodeData] = useState([]);

    const [selectedNode, setSelectedNode] = useState({})
    const [searchKeywords, setSearchKeywords] = useState({});
    const [newNode,setNewNode]=useState('');
    const createNode = (index, offset = 0,Title='') => {
        let newNodeData = nodeData;
        let newNode = {...NEW_NODE_DATA_TEMPLATE};
        newNode.data.ID=getId(TYPE_FILE)
        newNode.node_data.offset=offset;
        newNode.data.Title=Title;
        newNodeData.splice(index, 0, newNode);
        setNodeData(newNodeData);
        setSelectedNode(newNode)
    }


    const handleSearchHistoryWhiteBoard = (whiteBord) => {
        setSearchKeywords(whiteBord);
    }

    return (
        <div className={"DirectoryNode"}>
            <NodeResizer
                isVisible={nodeProps.selected}
                color="#ff0071"
            />
            <Row
                onClick={() => {
                    setSelectedNode({})
                }}
            >
                <Input
                    value={newNode}
                    onChange={(e)=>{
                        setNewNode(e.target.value);
                    }}
                    onPressEnter={()=>{
                        let newNode={...NEW_NODE_DATA_TEMPLATE}
                        newNode.data.Title=newNode;
                        newNode.data.ID=getId(TYPE_FILE);
                        handleSearchHistoryWhiteBoard(newNode);
                    }}
                />
            </Row>
            <List
                dataSource={nodeData}
                renderItem={(n, outsideIndex) => {
                    return (
                        <div
                            key={outsideIndex}
                            onClick={() => {
                                setSelectedNode(n);
                            }}
                        >
                            <Row
                                className={"EachRow " + (selectedNode?.data?.ID == n.data.ID ? 'EachRowSelected' : '')}
                                justify={"start"}
                                align={"middle"}
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
                                                onClick={() => {
                                                    let newNodeData = nodeData;
                                                    newNodeData[outsideIndex].node_data.type = TYPE_FILE;
                                                    setNodeData(newNodeData);
                                                }}
                                            >
                                            </Button>
                                            : <Button
                                                size={"small"}
                                                type={"link"}
                                                icon={<FileOutlined/>}
                                                onClick={() => {
                                                    let newNodeData = nodeData;
                                                    newNodeData[outsideIndex].node_data.type = TYPE_FOLDER;
                                                    setNodeData(newNodeData);
                                                }}
                                            ></Button>
                                    }
                                </Col>
                                <Col
                                    offset={1}
                                    span={LENGTH_AMOUNT - ICON_LENGTH - n.node_data.offset}
                                >
                                    <Input
                                        value={n.data.Title}
                                        onChange={(e) => {
                                            let newNodeData = nodeData;
                                            newNodeData[outsideIndex].data.Title = e.target.value;
                                            setNodeData(newNodeData);

                                        }}
                                        onPressEnter={() => {
                                            if (n.node_data.type == TYPE_FILE) {
                                                // 只有是文件的情况下，才会搜索历史值
                                                handleSearchHistoryWhiteBoard({
                                                    ...n,
                                                    outsideIndex
                                                });
                                            }
                                        }}
                                    />
                                </Col>
                            </Row>
                            {
                                selectedNode?.data?.ID == n.data.ID
                                    ? <Row className={"EachRow"}>
                                        <Col
                                            offset={n.node_data.offset + ICON_LENGTH}
                                            span={LENGTH_AMOUNT - ICON_LENGTH - n.node_data.offset}
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
                                                    icon={<CloseOutlined/>}
                                                ></Button>
                                                <Button
                                                    size={"small"}
                                                    type={"link"}
                                                    icon={<PlusOutlined/>}
                                                    onClick={() => {
                                                        createNode(outsideIndex + 1, n.node_data.offset)
                                                    }}
                                                >
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    : ''
                            }
                        </div>
                    )
                }}
            />
            <div>
                <Modal
                    width={"1200px"}
                    open={searchKeywords?.data?.ID}
                    onCancel={() => {
                        handleSearchHistoryWhiteBoard({})
                    }}
                    footer={null}
                >
                    <SearchHistoryWhiteBoard
                        keywords={searchKeywords?.data?.Title}
                        OnCancel={(newWhiteBordData) => {
                            let newNodeData=nodeData;
                            newNodeData[searchKeywords.outsideIndex]={
                                ...searchKeywords,
                                data:newWhiteBordData
                            };
                            setNodeData(newNodeData);
                            handleSearchHistoryWhiteBoard({});
                        }}
                    />
                </Modal>
            </div>
        </div>
    )
}

export {
    DirectoryNode
}