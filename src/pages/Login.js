import {Button, Col, Form, Input, Row} from "antd";

const Login =()=>{
    return (
        <div>
            <Row
                align={"stretch"}
                justify={"center"}
            >
                <Col span={8}>
                    <Form>
                        <Form.Item
                            label={"UserName"}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={"Password"}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type={"primary"}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Login