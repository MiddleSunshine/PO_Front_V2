import {useEffect, useState} from "react";
import {CreateNewWhiteBoardAsync, SearchWhiteBoardAsync} from "./Nodes/BaseWhiteBoard";
import {Button, Col, Divider, Input, Row} from "antd";
import {ExportOutlined} from '@ant-design/icons'
import "../Css/SearchHistoryWhiteBoard.css";
const SearchHistoryWhiteBoard=({keywords,Type='',OnCancel})=>{

    const [whiteboards,setWhiteBoard]=useState([]);
    const [searchKeywords,setSearchKeywords]=useState(keywords);
    const [selectedHistoryWhiteBord,setSelectedWhiteBoard]=useState({});

    useEffect(()=>{
        setSearchKeywords(keywords);
        handleSearchKeywords(keywords,Type)
    },[keywords])

    const handleSearchKeywords=(searchKeywordsData,searchType)=>{
        SearchWhiteBoardAsync(searchKeywordsData,searchType)
            .then((res)=>{
                if (res?.Data?.WhiteBoards){
                    setWhiteBoard(res.Data.WhiteBoards)
                }
            })
    }

    const handleSave=()=>{
        if (selectedHistoryWhiteBord.ID){
            OnCancel(selectedHistoryWhiteBord);
        }else{
            // 构建新的WhiteBoard
            CreateNewWhiteBoardAsync(searchKeywords)
                .then((res)=>{
                    if (res?.Data.data){
                        OnCancel(res.Data.data);
                    }
                })
        }
    }

    return (
        <div
            className={"SearchHistoryWhiteBoard"}
        >
            <Row
                onClick={()=>{
                    setSelectedWhiteBoard({})
                }}
            >
                <Col span={19}>
                    <Input
                        valuse={searchKeywords}
                        onChange={(e)=>{
                            setSearchKeywords(e.target.value);
                        }}
                        onPressEnter={()=>{
                            handleSearchKeywords(searchKeywords,Type)
                        }}
                    />
                </Col>
                <Col offset={1} span={4}>
                    <Button
                        type={"primary"}
                        onClick={()=>handleSave()}
                    >
                        {
                            selectedHistoryWhiteBord.ID?'Save':'Create'
                        }
                    </Button>
                </Col>
            </Row>
            <Divider>
                History Page
            </Divider>
            {
                whiteboards.map((w)=>{
                    return (
                        <Row
                            className={"EachRow"}
                            key={w.ID}
                            style={{backgroundColor:selectedHistoryWhiteBord.ID==w.ID?'#81ecec':''}}
                        >
                            <Col span={20}>
                                <div
                                    onClick={()=>{
                                        setSelectedWhiteBoard(w);
                                    }}
                                >
                                    {w.Title ?? 'Page'}
                                </div>
                            </Col>
                            <Col span={4}>
                                <Button
                                    type={"link"}
                                    size={"small"}
                                    href={`/whiteboard/${w.ID}`}
                                    target={"_blank"}
                                    icon={<ExportOutlined />}
                                >
                                </Button>
                            </Col>
                        </Row>
                    )
                })
            }
        </div>
    )
}

export {
    SearchHistoryWhiteBoard
}