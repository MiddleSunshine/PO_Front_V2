import { Button, Input, message, Modal } from "antd";
import { useState } from "react";
import { GetNodeStyle, UpdateNode } from "./BasicNode";
import { Handle, useReactFlow } from 'reactflow';
import {
    ExportOutlined,
    SaveOutlined,
    SearchOutlined,
    FileOutlined
} from '@ant-design/icons'
import { CreateNewWhiteBoardAsync } from "./BaseWhiteBoard";
import { SearchHistoryWhiteBoard } from "../SearchHistoryWhiteBoard";
import { NodeResizer } from "@reactflow/node-resizer";
import { getPath } from "../../config/function";


const HistoryWhiteBordNode = (nodeProps) => {

    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchMode, switchSearchMode] = useState(false);
    const instance = useReactFlow();
    const finishSearch = (historyWhiteBoard) => {
        if (historyWhiteBoard?.ID) {
            let newNode = { ...nodeProps };
            newNode.type = 'WhiteBoardNode';
            newNode.data.node_data = {
                data: historyWhiteBoard,
                path: getPath() + "," + historyWhiteBoard.ID
            };
            UpdateNode(instance, newNode);
        }
        switchSearchMode(false);
    }

    return (
        <div>
            <Input
                value={searchKeyword}
                onChange={(e) => {
                    setSearchKeyword(e.target.value);
                }}
                onPressEnter={() => {
                    switchSearchMode(true);
                }}
                addonAfter={<Button
                    type={"link"}
                    size={"small"}
                    icon={<SearchOutlined />}
                    onClick={() => {
                        switchSearchMode(true);
                    }}
                ></Button>}
            />
            <Modal
                open={searchMode}
                width={"1200px"}
                footer={null}
                onCancel={() => {
                    switchSearchMode(false)
                }}
            >
                <SearchHistoryWhiteBoard
                    keywords={searchKeyword}
                    OnCancel={(historyWhiteBoard) => {
                        finishSearch(historyWhiteBoard);
                    }}
                />
            </Modal>
        </div>
    )
}

const NewWhiteBoardNode = (nodeProps) => {

    const [title, setTitle] = useState('');
    const instance = useReactFlow();


    const createNewWhiteBoard = (Title) => {
        if (!Title) {
            message.warning("请输入标题");
            return false;
        }
        CreateNewWhiteBoardAsync(Title)
            .then((res) => {
                if (res.Data.data.ID) {
                    let newNode = { ...nodeProps };
                    newNode.type = 'WhiteBoardNode';
                    getPath();
                    newNode.data.node_data = {
                        data: res.Data.data,
                        path: getPath() + "," + res.Data.data.ID
                    };
                    UpdateNode(instance, newNode);
                } else {
                    message.warning(res.Message);
                }
            })
    }

    return (
        <div
            style={GetNodeStyle(nodeProps)}
        >
            <Input
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                onPressEnter={() => {
                    createNewWhiteBoard(title);
                }}
                addonAfter={
                    <Button
                        size={"small"}
                        type={"link"}
                        icon={<SaveOutlined />}
                        onClick={() => {
                            createNewWhiteBoard(title);
                        }}
                    >
                    </Button>
                }
            />
        </div>
    )
}

const WhiteBoardNode = (nodeProps) => {

    const [nodeData, setNodeData] = useState(nodeProps.data.node_data);
    // const instance = useReactFlow();

    const finishInput = () => {
        let newNode = nodeProps;
        newNode.data.node_data = nodeData;
        // UpdateNode(instance, newNode);
        nodeProps.data.saveData(newNode);
    }

    return (
        <div
            style={GetNodeStyle(nodeProps)}
            className={"WhiteBoardNode"}
        >
            <Handle
                className={"TargetConnection"}
                type={"target"}
                position={"left"}
            />
            <NodeResizer
                isVisible={nodeProps.selected}
            />
            <div
                className={"Content"}
            >
                <Input
                    defaultValue={nodeData.data.Title}
                    onChange={(e) => {
                        let newNodeData = { ...nodeData }
                        newNodeData.node_data.data.Title = e.target.value
                        setNodeData(newNodeData)
                    }}
                    onPressEnter={() => {
                        finishInput();
                    }}
                    addonBefore={
                        <FileOutlined />
                    }
                    addonAfter={<a
                        href={`/whiteboard/${nodeData?.data.ID}?path=${nodeData?.path}`}
                        target={"_blank"} rel="noreferrer"
                    >
                        <ExportOutlined />
                    </a>}
                />
            </div>
        </div>
    )
}

export {
    NewWhiteBoardNode,
    WhiteBoardNode,
    HistoryWhiteBordNode
}
