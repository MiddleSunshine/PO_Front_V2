import {Button, Checkbox, Col, Input, message, Modal, Row} from "antd";
import {useEffect, useState} from "react";
import { JSONTree } from 'react-json-tree';
import {SearchHistoryNodeAsync, UpdateNode} from "./BasicNode";
import { useReactFlow } from 'reactflow';

const HistoryNode=(nodeProps)=>{
    const [keyword,setkeyword]=useState('');
    const [nodes,setNodes]=useState([]);
    const [selectedNode,changeSelectedNode]=useState({});
    /**
     * 1 初始状态
     * 2 展示搜索结果
     */
    const [searchState,setSearchState]=useState(1);
    const instance=useReactFlow();
    const searchNode=(searchKeyword)=>{
        SearchHistoryNodeAsync(searchKeyword)
            .then((res)=>{
                setNodes(res.Data.nodes);
            })
            .then(()=>{
                setSearchState(2);
            })
    }

    useEffect(()=>{
        console.table(instance.getNodes())
    },[])

    return <div>
        <Input
            value={keyword}
            onChange={(e)=>{
                setkeyword(e.target.value);
            }}
            onPressEnter={()=>{
                searchNode(keyword)
            }}
        />
        <Modal
            width={"1500px"}
            title={`Search '${keyword}' Result`}
            open={searchState>1}
            onCancel={()=>{
                setSearchState(1);
            }}
            onOk={()=>{
                if (selectedNode.data.ID){
                    let newNode={...nodeProps};
                    newNode.type=selectedNode.data.Type;
                    newNode.data=selectedNode;
                    UpdateNode(instance,newNode);
                    setSearchState(1);
                }
            }}
        >
            {
                nodes.map((n,index)=>{
                    return <Row
                        key={index}
                    >
                        <Col span={2}>
                            <Checkbox
                                checked={n.node.data.data.ID==selectedNode?.data?.ID}
                                onChange={(e)=>{
                                    if (e.target.checked){
                                        changeSelectedNode(n.node.data);
                                    }else{
                                        changeSelectedNode({})
                                    }
                                }}
                            />
                        </Col>
                        <Col span={5}>
                            {
                                n.Whiteboards.map((whiteBord)=>{
                                    return (
                                        <div
                                            key={whiteBord.ID}
                                        >
                                            <Button
                                                type={"link"}
                                                href={`/whiteboard/${whiteBord.ID}`}
                                                target={"_blank"}
                                            >
                                                {whiteBord?.Title ?? 'Bord'}
                                            </Button>
                                        </div>
                                    )
                                })
                            }
                        </Col>
                        <Col span={17}>
                            <JSONTree data={JSON.parse(n.keywords)} />
                        </Col>
                    </Row>
                })
            }
        </Modal>
    </div>
}

export {
    HistoryNode
}