import {Col, Image, Input, message, Row} from "antd";
import Rainbow from '../Images/rainbow.png'
import {useEffect, useState} from "react";
import {requestAPI} from "../config/function";
const Index = () => {

    const [settings,setSettings]=useState({
        Title:""
    });

    useEffect(()=>{
        GetIndex();
    },[])

    const GetIndex=()=>{
        requestAPI("index.php?action=IndexController&method=Index",false)
            .then((res)=>{
                if (res.Data){
                    setSettings(res.Data);
                }else{
                    message.warning(res.Message);
                }
            })
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
                    <Row
                        justify={"center"}
                        align={"middle"}
                    >
                        <Col span={6}>
                            <Input

                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

        </div>
    )
}

export default Index;
