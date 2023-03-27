import {Button, Col, Form, Input, InputNumber, Radio, Row} from "antd";
import {CirclePicker} from '@hello-pangea/color-picker'
import { useReactFlow } from 'reactflow';
import {useEffect, useState} from "react";
const EditEdge=({edgeProps})=>{
    const [edge,setEdge]=useState(edgeProps);

    const instance=useReactFlow();

    useEffect(()=>{
        setEdge(edgeProps)
    },[edgeProps])

    const changeEdgeStyleProps=(key,value)=>{
        let newEdge=edge;
        if (!newEdge.hasOwnProperty('style')){
            newEdge.style={};
        }
        newEdge.style[key]=value;
        setEdge(newEdge);
    }

    const saveEdge=()=>{
        let edges=instance.getEdges();
        edges.map((e)=>{
            if (e.id==edgeProps.id){
                let newEdge=Object.assign(e,edge);
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
                    onClick={()=>{
                        saveEdge();
                    }}
                >
                    Save
                </Button>
                <Button
                    onClick={()=>{
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
                    value={edge.label}
                    onChange={(e)=>{
                        let newEdge=edge;
                        newEdge.label=e.target.value;
                        setEdge(newEdge)
                    }}
                />
            </Form.Item>
            <Form.Item
                label={"Type"}
            >
                <Radio.Group
                    value={edge.type}
                    onChange={(e)=>{
                        let newEdge=edge;
                        newEdge.type=e.target.value;
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
                    value={edge?.style?.width}
                    onChange={(newValue)=>{
                        changeEdgeStyleProps('width',newValue)
                    }}
                />
            </Form.Item>
            <Form.Item
                label={"Color"}
            >
                <CirclePicker
                    defaultColor={edge?.style?.color}
                    onChange={(newValue)=>{
                        changeEdgeStyleProps('color',newValue);
                    }}
                />
            </Form.Item>
        </Form>
    )
}

export {
    EditEdge
}