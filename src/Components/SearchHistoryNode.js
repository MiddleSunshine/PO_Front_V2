import {useEffect, useState} from "react";
import {CreateNodeAsync, SearchHistoryNodeAsync} from "./Nodes/BasicNode";
import {Button, Checkbox, Col, Empty, Input, message, Row, Spin} from "antd";
import {JSONTree} from "react-json-tree";

const SearchHistoryNode = ({defaultSearchKeywords, type = '', onCancel}) => {

    const [searchKeyword, setSearchKeywords] = useState(defaultSearchKeywords);
    const [searchResultNodes, setSearchResultNodes] = useState([]);
    const [selectedHistoryNode, setSelectedHistoryNode] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        setSearchKeywords(defaultSearchKeywords)
    }, [defaultSearchKeywords])

    const SearchNode = (searchKeywords, searchType) => {
        SearchHistoryNodeAsync(searchKeywords, searchType)
            .then((res) => {
                if (res) {
                    setSearchResultNodes(res.Data.nodes);
                    setIsLoading(false);
                }
            })
    }

    const handleSave = () => {
        if (selectedHistoryNode.ID) {
            // 选择了历史值
            onCancel(selectedHistoryNode)
        } else {
            // 创建了新的值
            CreateNodeAsync(type, searchKeyword)
                .then((res) => {
                    if (res.Data.data.ID) {
                        onCancel({ID: res.Data.data.ID})
                    } else {
                        message.warning(res.Message);
                    }
                })
        }
    }


    return (
        <div>
            <Row
                onClick={() => {
                    setSelectedHistoryNode({})
                }}
            >
                <Col span={20}>
                    <Input
                        value={searchKeyword}
                        onChange={(e) => {
                            setSearchKeywords(e.target.value)
                        }}
                        onPressEnter={() => {
                            SearchNode(searchKeyword, type);
                        }}
                    />
                </Col>
                <Col span={4}>
                    <Button
                        onClick={() => {
                            handleSave();
                        }}
                    >Save</Button>
                </Col>
            </Row>
            {
                isLoading
                    ? <Row
                        justify={"center"}
                        align={"middle"}
                    >
                        <Col span={1}>
                            <Spin
                                size={"large"}
                            />
                        </Col>
                    </Row>
                    : searchResultNodes.length > 0
                        ? searchResultNodes.map((n) => {
                            return (
                                <Row
                                    style={{backgroundColor: n.node.data.data.ID == selectedHistoryNode?.ID ? "#81ecec" : ""}}
                                    onClick={() => {
                                        setSelectedHistoryNode(n.node.data.data)
                                    }}
                                >
                                    <Col span={12}>
                                        <ul>
                                            {
                                                n.Whiteboards.map((w, insideIndex) => {
                                                    return (
                                                        <li
                                                            key={w.ID}
                                                        >
                                                            <Button
                                                                type={"link"}
                                                                size={"small"}
                                                                target={"_blank"}
                                                                href={`/whiteboard/${w.ID}`}
                                                            >
                                                                {w.Title ?? 'Page'}
                                                            </Button>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </Col>
                                    <Col span={12}>
                                        <JSONTree data={JSON.parse(n.keywords)}/>
                                    </Col>
                                </Row>
                            )
                        })
                        : <Empty/>
            }
        </div>
    )
}

export {
    SearchHistoryNode
}