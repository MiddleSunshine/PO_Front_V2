import {Button, Col, Image, Input, Menu, message, Modal, Row} from "antd";
import Rainbow from '../Images/rainbow.png'
import {useEffect, useState} from "react";
import {requestAPI} from "../config/function";
import {SearchHistoryWhiteBoard} from "../Components/SearchHistoryWhiteBoard";
import {
    UserAddOutlined,
    ReadOutlined
} from "@ant-design/icons"

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
                align={"middle"}
            >
                <Col span={24}>
                    <Menu
                        mode={"horizontal"}
                        items={[
                            {
                                label:(
                                    <Button
                                        type={"link"}
                                        href={"/whiteboard/1"}
                                        target={"_blank"}
                                    >
                                        Note
                                    </Button>
                                ),
                                key:"Note",
                                icon:<ReadOutlined />
                            },
                            {
                                label: (
                                    <Button
                                        type={"link"}
                                        href={"/login"}
                                        target={"_blank"}
                                    >
                                        Login
                                    </Button>
                                ),
                                key:"Login",
                                icon:<UserAddOutlined />
                            }
                        ]}
                    >
                    </Menu>
                </Col>
            </Row>
            <Row
                style={{height:"70vh"}}
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
                                    <div>
                                        <Button
                                            type={"link"}
                                            size={"small"}
                                        >
                                            Search
                                        </Button>
                                    </div>

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
