import {Button, Col, Form, Input, message, Row} from "antd";
import {useEffect, useState} from "react";
import {Login} from "../config/function";

const LoginPage =()=>{

    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');

    useEffect(()=>{
        document.title="Login";
    },[])

    const tryLogin=()=>{
        if (!userName){
            message.warning("Please Input UserName");
            return false;
        }
        if (!password){
            message.warning("Please Input Password");
            return false;
        }
        Login(userName,password).then((loginResult)=>{
            if (loginResult){
                const urlParams = new URLSearchParams(window.location.search);
                let redirectUrl = urlParams.get('redirect');
                if (!redirectUrl){
                    redirectUrl='/';
                }
                window.location=redirectUrl;
            }
        })
    }

    return (
        <Row
            style={{height:"inherit"}}
            align={"middle"}
            justify={"center"}
        >
            <Col span={8}>
                <Form>
                    <Form.Item
                        label={"UserName"}
                        required={true}
                    >
                        <Input
                            value={userName}
                            onChange={(e)=>setUserName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        required={true}
                        label={"Password"}
                    >
                        <Input.Password
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type={"primary"}
                            onClick={()=>{
                                tryLogin();
                            }}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default LoginPage