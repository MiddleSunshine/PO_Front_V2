import {Button, Col, Divider, Image, Input, message, Modal, Row} from "antd";
import Rainbow from '../Images/rainbow.png'
import {useEffect, useState} from "react";
import {requestAPI} from "../config/function";
import {SearchHistoryWhiteBoard} from "../Components/SearchHistoryWhiteBoard";
const Index = () => {

    const [settings,setSettings]=useState({
        Title:""
    });
    const [searchKeyword,setSearchKeyword]=useState("")
    const [startSearch,setStartSearch]=useState(false);

    useEffect(()=>{
        GetIndex();
    },[])

    const GetIndex=()=>{
        requestAPI("index.php?action=IndexController&method=Index", {},false)
            .then((res)=>{
                if (res.Data){
                    setSettings(res.Data);
                }else{
                    message.warning(res.Message);
                }
            })
    }

    const finishSearch=()=>{
        setStartSearch(false)
    }

    return (
        <div
            className={"Index"}
        >
            <Row
                style={{height:"inherit"}}
                justify={"center"}
                align={"middle"}
            >
                <Col span={24}>
                    <Row
                        justify={"center"}
                        align={"middle"}
                        style={{textAlign:"center"}}
                    >
                        <Col
                            span={6}
                            className={"rainbow-letters"}
                        >
                            <Image
                                style={{width:"30px"}}
                                src={Rainbow}
                            />
                            <span
                                className={"Title"}
                            >
                                {
                                    settings.Title
                                }
                            </span>
                        </Col>
                    </Row>
                    <br/>
                    <Row
                        justify={"center"}
                        align={"middle"}
                    >
                        <Col span={6}>
                            <Input
                                value={searchKeyword}
                                onChange={(e)=>{
                                    setSearchKeyword(e.target.value)
                                }}
                                onPressEnter={()=>{
                                    setStartSearch(true)
                                }}
                                addonAfter={
                                    <Button
                                        type={"link"}
                                        size={"small"}
                                    >
                                        Search
                                    </Button>
                                }
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Modal
                title={`Search '${searchKeyword}' Result"`}
                open={startSearch}
                width={"1200px"}
                onOk={()=>{
                    finishSearch();
                }}
                onCancel={()=>{
                    finishSearch();
                }}
                footer={null}
            >
                <SearchHistoryWhiteBoard
                    keywords={searchKeyword}
                    OnCancel={()=>{
                        finishSearch();
                    }}
                    showCreateButton={false}
                />
            </Modal>
        </div>
    )
}

export default Index;
