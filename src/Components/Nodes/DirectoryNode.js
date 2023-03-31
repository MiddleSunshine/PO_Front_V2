import {useCallback, useEffect, useState} from "react";
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
    PlusOutlined,
    SaveOutlined,
    ExportOutlined
} from '@ant-design/icons'
import {NodeResizer} from "@reactflow/node-resizer";
import {getId} from "../../config/WhiteBord";
import {SearchHistoryWhiteBoard} from "../SearchHistoryWhiteBoard";
import {useReactFlow} from 'reactflow'
import {UpdateNode} from "./BasicNode";

const ICON_LENGTH = 2;
const LENGTH_AMOUNT = 22;
const TYPE_FILE = 'File';
const TYPE_FOLDER = 'Folder';

var NEW_NODE_DATA_TEMPLATE = {
    node_data: {
        type: TYPE_FILE,
        offset: 0
    },
    data: {
        ID: 0,
        Title: ""
    }
}

const DirectoryNode = (nodeProps) => {
    // 展示数据
    const [nodeData, setNodeData] = useState(nodeProps?.data?.node_data);
    const [data,setData]=useState(nodeProps.data.data);
    // 选中效果
    const [selectedNode, setSelectedNode] = useState({});
    // 搜索效果
    const [searchKeywords, setSearchKeywords] = useState({});
    // 新建时的效果
    const [newNode, setNewNode] = useState('');

    const instance = useReactFlow();

    useEffect(() => {
        setNodeData(nodeProps.data.node_data)
    }, [nodeProps])

    const SAVE_DATA = (source='') => {
        let newNode = nodeProps;
        newNode.data.data=data;
        newNode.data.node_data = nodeData;
        newNode.data.save_into_database = true;
        UpdateNode(instance, newNode);
    }

    useCallback(()=>{
        SAVE_DATA('callback');
    },[nodeData])

    const createNode = (index, offset = 0, Title = '') => {
        let newNodeData = nodeData;
        let newNode = {...NEW_NODE_DATA_TEMPLATE};
        newNode.data.ID = getId(TYPE_FILE)
        newNode.node_data.offset = offset;
        newNode.data.Title = Title;
        newNodeData.splice(index, 0, newNode);
        setNodeData(newNodeData);
        setSelectedNode(newNode)
    }


    const handleSearchHistoryWhiteBoard = (whiteBord) => {
        setSearchKeywords(whiteBord);
    }

    const runCmd=(index,cmd)=>{
        let newNodeData=nodeData;
        let amount=newNodeData.length;
        switch (cmd){
            case 'Up':
                if (index>0){
                    let preNode=nodeData[index-1];
                    newNodeData[index-1]=newNodeData[index];
                    newNodeData[index]=preNode;
                }
                break;
            case 'Down':
                if ((index-0+1)<amount){
                    let nextNode=nodeData[index+1];
                    nodeData[index+1]=nodeData[index];
                    nodeData[index]=nextNode;
                }
                break;
            case 'Left':
                if (newNodeData[index].node_data.offset>0){
                    newNodeData[index].node_data.offset-=2;
                }
                break;
            case 'Right':
                if ((newNodeData[index].node_data.offset+ICON_LENGTH)<LENGTH_AMOUNT){
                    newNodeData[index].node_data.offset+=2;
                }
                break;
            case 'Delete':
                newNodeData.splice(index,1);
                break;
        }
        setNodeData(newNodeData);
    }

    return (
        <div className={"DirectoryNode"}>
            <NodeResizer
                isVisible={nodeProps.selected}
                color="#ff0071"
            />
            {
                nodeData.length==0
                    ?
                    <Row
                        className={"EachRow"}
                        onClick={() => {
                            setSelectedNode({})
                        }}
                        align={"middle"}
                        justify={"space-around"}
                    >
                        <Input
                            value={newNode}
                            onChange={(e) => {
                                setNewNode(e.target.value);
                            }}
                            onPressEnter={() => {
                                let newNodeItem = {...NEW_NODE_DATA_TEMPLATE};
                                newNodeItem.data.Title = newNode;
                                newNodeItem.data.ID = getId(TYPE_FILE);
                                newNodeItem.outsideIndex = 0;
                                handleSearchHistoryWhiteBoard(newNodeItem);
                            }}
                        />
                    </Row>
                    :
                    <List
                        header={
                        <Input
                            allowClear={true}
                            value={data?.Name}
                            onChange={(e)=>{
                                setData({
                                    ...data,
                                    Name:e.target.value
                                });
                            }}
                            onPressEnter={()=>{
                                if (data?.Name){
                                    SAVE_DATA('save title');
                                }
                            }}
                        />
                        }
                        split={true}
                        dataSource={nodeData}
                        renderItem={(n, outsideIndex) => {
                            return (
                                <div
                                    key={outsideIndex}
                                    onClick={() => {
                                        if (n.data.ID==selectedNode?.data?.ID){
                                            setSelectedNode({});
                                        }else{
                                            setSelectedNode(n);
                                        }
                                    }}
                                >
                                    <Row
                                        className={"EachRow " + (selectedNode?.data?.ID == n.data.ID ? 'EachRowSelected' : '')}
                                        justify={"space-around"}
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
                                        {
                                            n.node_data.type==TYPE_FILE
                                                ?
                                                <Col span={1}>
                                                    <Button
                                                        type={"link"}
                                                        size={"small"}
                                                        href={`/whiteboard/${n.data.ID}`}
                                                        target={"_blank"}
                                                        icon={<ExportOutlined />}
                                                    >
                                                    </Button>
                                                </Col>
                                                :''
                                        }
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
                                                            onClick={()=>{
                                                                runCmd(outsideIndex,'Up')
                                                            }}
                                                        ></Button>
                                                        <Button
                                                            size={"small"}
                                                            type={"link"}
                                                            icon={<CaretDownOutlined/>}
                                                            onClick={()=>{
                                                                runCmd(outsideIndex,'Down')
                                                            }}
                                                        ></Button>
                                                        <Button
                                                            size={"small"}
                                                            type={"link"}
                                                            icon={<CaretLeftOutlined/>}
                                                            onClick={()=>{
                                                                runCmd(outsideIndex,'Left')
                                                            }}
                                                        ></Button>
                                                        <Button
                                                            size={"small"}
                                                            type={"link"}
                                                            icon={<CaretRightOutlined/>}
                                                            onClick={()=>{
                                                                runCmd(outsideIndex,'Right')
                                                            }}
                                                        ></Button>
                                                        <Button
                                                            size={"small"}
                                                            type={"link"}
                                                            icon={<CloseOutlined/>}
                                                            onClick={()=>{
                                                                runCmd(outsideIndex,'Delete')
                                                            }}
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
            }
            <div>
                <Modal
                    title={"Search History Page Or Create"}
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
                            let newNodeData = nodeData;
                            newNodeData[searchKeywords.outsideIndex] = {
                                ...searchKeywords,
                                data: newWhiteBordData
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