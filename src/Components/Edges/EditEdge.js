import { Button, Col, Form, Input, InputNumber, Radio, Row } from "antd";
import { CirclePicker } from '@hello-pangea/color-picker'
import { useReactFlow } from 'reactflow';
import { useEffect, useState } from "react";
const EditEdge = ({ edgeProps }) => {
    const [edge, setEdge] = useState(edgeProps);

    const instance = useReactFlow();

    useEffect(() => {
        setEdge(edgeProps)
    }, [edgeProps])

    const changeEdgeStyleProps = (key, value) => {
        let newEdge = { ...edge };
        if (!newEdge.hasOwnProperty('style')) {
            newEdge.style = {};
        }
        let newStyle = { ...newEdge.style };
        newStyle[key] = value;
        newEdge.style = newStyle;
        setEdge(newEdge);
    }

    const saveEdge = () => {
        let edges = instance.getEdges();
        edges.map((e) => {
            if (e.id == edgeProps.id) {
                let newEdge = Object.assign(e, edge);
                return newEdge;
            }
            return e;
        });
        instance.setEdges(edges);
    }

    return (
        <Form
            layout={"vertical"}
        >
            <Form.Item
                label={"Option"}
            >
                <Button
                    type="primary"
                    onClick={() => {
                        saveEdge();
                    }}
                >
                    Save
                </Button>
                &nbsp;&nbsp;
                <Button
                    onClick={() => {
                        setEdge(edgeProps);
                    }}
                >
                    Reset
                </Button>
            </Form.Item>
            <Form.Item
                label={"Label"}
            >
                <Input
                    defaultValue={edge.label}
                    onChange={(e) => {
                        let newEdge = edge;
                        newEdge.label = e.target.value;
                        setEdge(newEdge)
                    }}
                />
            </Form.Item>
            <Form.Item
                label={"Type"}
            >
                <Radio.Group
                    defaultValue={edge.type}
                    onChange={(e) => {
                        let newEdge = edge;
                        newEdge.type = e.target.value;
                        setEdge(newEdge);
                    }}
                >
                    <Radio value={'default'}>
                        Default
                    </Radio>
                    <Radio value={'straight'}>
                        Straight
                    </Radio>
                    <Radio value={"step"}>
                        Step
                    </Radio>
                    <Radio value={"smoothstep"}>
                        SmoothStep
                    </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label={"Width"}
            >
                <InputNumber
                    defaultValue={edge?.style?.strokeWidth}
                    onChange={(newValue) => {
                        changeEdgeStyleProps('strokeWidth', newValue)
                    }}
                />
            </Form.Item>
            <Form.Item
                label={"Color"}
            >
                <CirclePicker
                    defaultColor={edge?.style?.stroke}
                    onChange={(newValue) => {
                        changeEdgeStyleProps('stroke', newValue.hex);
                    }}
                />
            </Form.Item>
        </Form>
    )
}

export {
    EditEdge
}