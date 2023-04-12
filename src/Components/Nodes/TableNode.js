import {GetNodeStyle} from "./BasicNode";
import {useState} from "react";
import {NodeToolbar} from "reactflow";
import {Form, InputNumber} from "antd";

const TableNode=(nodeProps)=>{

    const [nodeData,setNodeData]=useState(nodeProps.node_data);

    return (
        <div
            className={"TableNode"}
            style={GetNodeStyle(nodeProps)}
        >
            <NodeToolbar>
                <Form>
                    <Form.Item
                        label={"Row"}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label={"Column"}
                    >
                        <InputNumber />
                    </Form.Item>
                </Form>
            </NodeToolbar>
            <table>
            {
                nodeData.table.map((row,rowIndex)=>{
                    return (
                        <tr>
                            {
                                row.map((colums,columnIndex)=>{
                                    colums.map((column,index)=>{
                                        if (rowIndex==1){
                                            return (
                                                <th>{column}</th>
                                            )
                                        }else{
                                            return (
                                                <td>{column}</td>
                                            )
                                        }
                                    })
                                })
                            }
                        </tr>
                    )
                })
            }
            </table>
        </div>
    )
}

export {
    TableNode
}
