import { GetNodeStyle, UpdateNode } from "./BasicNode";
import { useEffect, useState } from "react";
import { NodeToolbar } from "reactflow";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import {
    CaretLeftOutlined,
    CaretRightOutlined,
    CaretUpOutlined,
    CaretDownOutlined
} from '@ant-design/icons'
import { useReactFlow } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";

const TITLE_ITEM = {
    Name: ""
}

const DATA_ITEM = {
    Value: ""
}

const SELECT_ITEM = {
    RowIndex: -1,
    ColumnIndex: -1
}

const TableNode = (nodeProps) => {

    const [nodeData, setNodeData] = useState(nodeProps.data.node_data);
    const [data, setData] = useState(nodeProps.data.data);
    const [selected, setSelected] = useState({ ...SELECT_ITEM });

    useEffect(() => {
        setNodeData(nodeProps.data.node_data)
        if (!nodeProps.data.data.hasOwnProperty('ID')) {
            updateTable(nodeProps.data.node_data.rows, nodeProps.data.node_data.columns);
        }
    }, [])

    // const instance = useReactFlow();

    // 切换选中项
    const switchSelected = (rowIndex = -1, columnIndex = -1) => {
        let newSelect = { ...SELECT_ITEM };
        if (rowIndex > -1) {
            if (rowIndex == newSelect.RowIndex) {
                newSelect.RowIndex = -1;
            } else {
                newSelect.RowIndex = rowIndex;
            }
            newSelect.ColumnIndex = -1;
        }
        if (columnIndex > -1) {
            if (newSelect.ColumnIndex == columnIndex) {
                newSelect.ColumnIndex = -1;
            } else {
                newSelect.ColumnIndex = columnIndex;
            }
            newSelect.RowIndex = -1;
        }
        setSelected(newSelect);
    }

    const getItemClass = (rowIndex, columnIndex) => {
        let returnData = '';
        if (selected.RowIndex == rowIndex || selected.ColumnIndex == columnIndex) {
            returnData = 'Selected';
        }
        return returnData;
    }

    const SAVE_DATA = () => {
        let node = { ...nodeProps }
        node.data.node_data = nodeData;
        node.data.data = data;
        // UpdateNode(instance, node);
        nodeProps.data.saveData(node);
    }

    const AddRowOrColumn = (type, index) => {
        let newNodeData = { ...nodeData };
        switch (type) {
            case 'row':
                let newRow = [];
                newNodeData.titles.map((i) => {
                    newRow.push({
                        ...DATA_ITEM
                    });
                    return i;
                })
                newNodeData.table.splice(index + 1, 0, newRow);
                newNodeData.rows++;
                break;
            case 'column':
                newNodeData.titles.splice(index + 1, 0, { ...TITLE_ITEM });
                for (let rowIndex = 0; rowIndex < newNodeData.table.length; rowIndex++) {
                    newNodeData.table[rowIndex].splice(index + 1, 0, { ...DATA_ITEM })
                }
                newNodeData.columns++;
                break;
        }
        setNodeData(newNodeData);
    }

    const updateTable = (rowsLength, columnLength) => {
        let newNodeData = { ...nodeData };
        // 保证长度
        newNodeData.titles = newNodeData.titles.slice(0, columnLength);
        // 开始组件数据
        for (let i = 0; i < columnLength; i++) {
            if (!newNodeData.titles[i]) {
                newNodeData.titles[i] = {
                    ...TITLE_ITEM
                }
            }
        }
        // 扩充最外层数组
        newNodeData.table = newNodeData.table.slice(0, rowsLength);
        // 修改内部数组
        for (let row = 0; row < rowsLength; row++) {
            if (!newNodeData.table.hasOwnProperty(row)) {
                newNodeData.table[row] = [];
            }
            newNodeData.table[row] = newNodeData.table[row].slice(0, columnLength);
            for (let column = 0; column < columnLength; column++) {
                if (!newNodeData.table[row].hasOwnProperty(column)) {
                    newNodeData.table[row][column] = {
                        ...DATA_ITEM
                    }
                }
            }
        }
        newNodeData.rows = rowsLength;
        newNodeData.columns = columnLength;
        setNodeData(newNodeData)
    }

    // 删除其中某一列或者某一行
    const deleteTable = () => {
        let newNodeData = { ...nodeData };
        if (selected.RowIndex > -1) {
            // 删除某一行
            newNodeData.table.splice(selected.RowIndex, 1);
        }
        if (selected.ColumnIndex > -1) {
            // 删除某一列
            // 先删除某一 title
            newNodeData.titles.splice(selected.ColumnIndex, 1);
            // 再删除具体列
            newNodeData.table.map((row) => {
                row.splice(selected.ColumnIndex, 1);
                return row;
            })
        }
        setNodeData(newNodeData);
        switchSelected(-1, -1);
    }

    const updateItem = (type, value, rowIndex, columnIndex = 0) => {
        let newNodeData = { ...nodeData };
        switch (type) {
            case 'Title':
                newNodeData.titles[columnIndex].Name = value;
                break;
            case 'Table':
                newNodeData.table[rowIndex][columnIndex].Value = value;
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
                        label={"Rows / Columns"}
                    >
                        <Row
                            justify={"start"}
                            align={"middle"}
                        >
                            <Col span={8}>
                                <Input
                                    value={nodeData.rows}
                                    onChange={(e) => {
                                        setNodeData({
                                            ...nodeData,
                                            rows: e.target.value
                                        })
                                    }}
                                />
                            </Col>
                            <Col offset={1} span={8}>
                                <Input
                                    value={nodeData.columns}
                                    onChange={(e) => {
                                        setNodeData({
                                            ...nodeData,
                                            columns: e.target.value
                                        })
                                    }}
                                />
                            </Col>
                            <Col span={2} offset={1}>
                                <Button
                                    type={"primary"}
                                    onClick={() => {
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
                            onClick={() => {
                                SAVE_DATA();
                            }}
                        >
                            Save Change
                        </Button>
                    </Form.Item>
                </Form>
            </NodeToolbar>
            <NodeResizer
                isVisible={nodeProps.selected}
            />
            <div className="TitlePart">
                <Input
                    value={data?.Name}
                    onChange={(e) => {
                        setData({
                            ...data,
                            Name: e.target.value
                        })
                    }}
                />
            </div>
            <div className="TablePart">
                <table
                    className={"table table-condensed"}
                >
                    <thead>
                        <tr>
                            <th
                                onClick={() => {
                                    switchSelected(-1, -1);
                                }}
                            >
                            </th>
                            {
                                nodeData.titles.map((title, index) => {
                                    return (
                                        <th
                                            key={index}
                                            className={"Option"}
                                        >
                                            <Button
                                                size="small"
                                                ghost={true}
                                                type={"primary"}
                                                icon={<CaretLeftOutlined />}
                                                onClick={() => {
                                                    AddRowOrColumn('column', index - 1);
                                                }}
                                            ></Button>
                                            <Button
                                                size="small"
                                                type={"primary"}
                                                onClick={() => {
                                                    if (selected.ColumnIndex == index) {
                                                        deleteTable();
                                                    } else {
                                                        switchSelected(-1, index);
                                                    }
                                                    switchSelected(-1, index);
                                                }}
                                                danger={selected.ColumnIndex == index}
                                            >
                                                {
                                                    selected.ColumnIndex == index ? "Delete" : (index + 1)
                                                }
                                            </Button>
                                            <Button
                                                size="small"
                                                ghost={true}
                                                type={"primary"}
                                                icon={<CaretRightOutlined />}
                                                onClick={() => {
                                                    AddRowOrColumn('column', index);
                                                }}
                                            ></Button>
                                        </th>
                                    )
                                })
                            }
                        </tr>
                        <tr>
                            <th
                                onClick={() => {
                                    switchSelected(-1, -1);
                                }}
                            >
                            </th>
                            {
                                nodeData.titles.map((title, index) => {
                                    return (
                                        <th
                                            className={getItemClass(-2, index)}
                                            key={index}
                                        >
                                            <input
                                                className="InputLikeTitle"
                                                placeholder={"Title..."}
                                                value={title?.Name}
                                                onChange={(e) => {
                                                    updateItem('Title', e.target.value, 0, index);
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
                                                    <>
                                                        {
                                                            columnIndex == 0
                                                                ? <td
                                                                    className={"Option"}
                                                                >
                                                                    <Button
                                                                        size="small"
                                                                        ghost={true}
                                                                        type={"primary"}
                                                                        icon={<CaretUpOutlined />}
                                                                        onClick={() => {
                                                                            AddRowOrColumn('row', rowIndex - 1)
                                                                        }}
                                                                    ></Button>
                                                                    <Button
                                                                        size="small"
                                                                        type={"primary"}
                                                                        onClick={() => {
                                                                            if (selected.RowIndex == rowIndex) {
                                                                                deleteTable();
                                                                            } else {
                                                                                switchSelected(rowIndex, -1);
                                                                            }
                                                                        }}
                                                                        danger={selected.RowIndex == rowIndex}
                                                                    >
                                                                        {
                                                                            selected.RowIndex == rowIndex
                                                                                ? "Delete"
                                                                                : (rowIndex + 1)
                                                                        }
                                                                    </Button>
                                                                    <Button
                                                                        size="small"
                                                                        ghost={true}
                                                                        type={"primary"}
                                                                        icon={<CaretDownOutlined />}
                                                                        onClick={() => {
                                                                            AddRowOrColumn('row', rowIndex)
                                                                        }}
                                                                    ></Button>
                                                                </td>
                                                                : ''
                                                        }
                                                        <td
                                                            className={getItemClass(rowIndex, columnIndex)}
                                                        >
                                                            <input
                                                                className="InputLikeTitle input-sm"
                                                                placeholder={"Content"}
                                                                value={column?.Value}
                                                                onChange={(e) => {
                                                                    updateItem('Table', e.target.value, rowIndex, columnIndex)
                                                                }}
                                                            />
                                                        </td>
                                                    </>
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
        </div>
    )
}

export {
    TableNode
}
