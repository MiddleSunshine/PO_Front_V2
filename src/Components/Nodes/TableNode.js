import {GetNodeStyle, UpdateNode} from "./BasicNode";
import {useEffect, useState} from "react";
import {NodeToolbar} from "reactflow";
import {Button, Col, Form, Input, InputNumber, Row} from "antd";
import {Table} from "react-bootstrap";
import {useReactFlow} from "reactflow";
import {NodeResizer} from "@reactflow/node-resizer";

const TITLE_ITEM = {
    Name: ""
}

const DATA_ITEM = {
    Value: ""
}

const TableNode = (nodeProps) => {

    const [nodeData, setNodeData] = useState(nodeProps.data.node_data);
    const [data, setData] = useState(nodeProps.data.data);

    useEffect(() => {
        setNodeData(nodeProps.data.node_data)
    }, [])

    const instance=useReactFlow();

    const SAVE_DATA=()=>{
        let node={...nodeProps}
        node.data.node_data=nodeData;
        node.data.data=data;
        UpdateNode(instance,node);
    }

    const updateTable=(rowsLength,columnLength)=>{
        let newNodeData={...nodeData};
        // 保证长度
        newNodeData.titles=newNodeData.titles.slice(0,columnLength);
        // 开始组件数据
        for (let i=0;i<columnLength;i++){
            if (!newNodeData.titles[i]){
                newNodeData.titles[i]={
                    ...TITLE_ITEM
                }
            }
        }
        // 扩充最外层数组
        newNodeData.table=newNodeData.table.slice(0,rowsLength);
        // 修改内部数组
        for (let row=0;row<rowsLength;row++){
            if (!newNodeData.table.hasOwnProperty(row)){
                newNodeData.table[row]=[];
            }
            newNodeData.table[row]=newNodeData.table[row].slice(0,columnLength);
            for (let column=0;column<columnLength;column++){
                if (!newNodeData.table[row].hasOwnProperty(column)){
                    newNodeData.table[row][column]={
                        ...DATA_ITEM
                    }
                }
            }
        }
        newNodeData.rows=rowsLength;
        newNodeData.columns=columnLength;
        setNodeData(newNodeData)
    }

    const updateItem=(type,value,rowIndex,columnIndex=0)=>{
        let newNodeData={...nodeData};
        switch (type){
            case 'Title':
                newNodeData.titles[columnIndex].Name=value;
                break;
            case 'Table':
                newNodeData.table[rowIndex][columnIndex].Value=value;
                break;
        }
        setNodeData(newNodeData);
    }

    return (
        <div
            className={"TableNode"}
            style={GetNodeStyle(nodeProps)}
        >
            <NodeToolbar>
                <Form
                    layout={"vertical"}
                >
                    <Form.Item
                        label={"Columns / Rows"}
                    >
                        <Row
                            justify={"start"}
                            align={"middle"}
                        >
                            <Col span={8}>
                                <Input
                                    value={nodeData.columns}
                                    onChange={(e)=>{
                                        setNodeData({
                                            ...nodeData,
                                            columns:e.target.value
                                        })
                                    }}
                                />
                            </Col>
                            <Col offset={1} span={8}>
                                <Input
                                    value={nodeData.rows}
                                    onChange={(e)=>{
                                        setNodeData({
                                            ...nodeData,
                                            rows:e.target.value
                                        })
                                    }}
                                />
                            </Col>
                            <Col span={2} offset={1}>
                                <Button
                                    type={"primary"}
                                    onClick={()=>{
                                        updateTable(
                                            nodeData.rows,
                                            nodeData.columns
                                        );
                                    }}
                                >
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        label={"Sync"}
                    >
                        <Button
                            type={"primary"}
                            onClick={()=>{
                                SAVE_DATA();
                            }}
                        >
                            Sync
                        </Button>
                    </Form.Item>
                </Form>
            </NodeToolbar>
            <NodeResizer
                isVisible={nodeProps.selected}
            />
            <Input
                value={data?.Name}
                onChange={(e) => {
                    setData({
                        ...data,
                        Name: e.target.value
                    })
                }}
            />
            <table
                className={"table table-striped table-condensed"}
            >
                <thead>
                <tr>
                    {
                        nodeData.titles.map((title, index) => {
                            return (
                                <th
                                    key={index}
                                >
                                    <input
                                        value={title?.Name}
                                        onChange={(e)=>{
                                            updateItem('Title',e.target.value,0,index);
                                        }}
                                    />
                                </th>
                            )
                        })
                    }
                </tr>
                </thead>
                <tbody>
                {
                    nodeData.table.map((row, rowIndex) => {
                        return (
                            <tr
                                key={rowIndex}
                            >
                                {
                                    row.map((column, columnIndex) => {
                                        return (
                                            <td>
                                                <input
                                                    value={column?.Value}
                                                    onChange={(e)=>{
                                                        updateItem('Table',e.target.value,rowIndex,columnIndex)
                                                    }}
                                                />
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export {
    TableNode
}
