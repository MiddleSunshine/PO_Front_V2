import {Button, Col, Form, InputNumber, Row} from "antd";
import {CirclePicker} from '@hello-pangea/color-picker'
import { useReactFlow } from 'reactflow';
import {useEffect, useState} from "react";
const EditEdge=(edgeProps)=>{
    const [edge,setEdge]=useState({});

    const instance=useReactFlow();

    useEffect(()=>{
        debugger
    },[edgeProps])

    return (
        <Form
            layout={"vertical"}
        >
            <Form.Item
                label={"Option"}
            >
                <Button>
                    Save
                </Button>
                <Button>
                    Reset
                </Button>
            </Form.Item>
            <Form.Item
                label={"Type"}
            >
                <Button>
                    Default
                </Button>
                <Button>
                    Straight
                </Button>
                <Button>
                    Step
                </Button>
                <Button>
                    SmoothStep
                </Button>
            </Form.Item>
            <Form.Item
                label={"Width"}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label={"Color"}
            >
                <CirclePicker />
            </Form.Item>
        </Form>
    )
}

export {
    EditEdge
}