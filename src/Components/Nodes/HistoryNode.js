import {Button, Checkbox, Col, Input, message, Modal, Row} from "antd";
import {useState} from "react";
import {requestAPI} from "../../config/function";
import { JSONTree } from 'react-json-tree';

const HistoryNode=()=>{
    const [keyword,setkeyword]=useState('');
    const [nodes,setNodes]=useState([]);
    /**
     * 1 初始状态
     * 2 展示搜索结果
     */
    const [searchState,setSearchState]=useState(1);
    const searchNode=(searchKeyword)=>{
        if (!searchKeyword){
            message.warning("Please input the keyword");
            return false;
        }
        requestAPI('index.php?action=NodeController&method=SearchNode',{
            method:"post",
            body:JSON.stringify({
                keyword:searchKeyword
            })
        })
            .then((res)=>{
                setNodes(res.Data.nodes);
            })
            .then(()=>{
                setSearchState(2);
            })
    }

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
        >
            {
                nodes.map((n,index)=>{
                    return <Row
                        key={index}
                    >
                        <Col span={2}>
                            <Checkbox />
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