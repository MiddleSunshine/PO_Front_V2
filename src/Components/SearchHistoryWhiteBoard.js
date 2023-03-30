import {useEffect, useState} from "react";
import {CreateNewWhiteBoardAsync, SearchWhiteBoardAsync} from "./Nodes/BaseWhiteBoard";
import {Button, Col, Input, Row} from "antd";

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
        <div>
            <Row
                onClick={()=>{
                    setSelectedWhiteBoard({})
                }}
            >
                <Col span={20}>
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
                <Col span={4}>
                    <Button
                        onClick={()=>handleSave()}
                    >
                        Save
                    </Button>
                </Col>
            </Row>
            {
                whiteboards.map((w)=>{
                    return (
                        <Row
                            key={w.ID}
                            style={{backgroundColor:selectedHistoryWhiteBord.ID==w.ID?'#81ecec':''}}
                        >
                            <Col span={20}>
                                <Button
                                    onClick={()=>{
                                        setSelectedWhiteBoard(w);
                                    }}
                                >
                                    {w.Title}
                                </Button>
                            </Col>
                            <Col span={4}>
                                <Button
                                    type={"link"}
                                    size={"small"}
                                    href={`/whiteboard/${w.ID}`}
                                    target={"_blank"}
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