import React, {useState} from "react";
import {NodeResizer} from "@reactflow/node-resizer";
import {NodeToolbar} from "reactflow";
import {Button, Col, Divider, Input, Row} from "antd";
import {getId} from "../../config/WhiteBord";
import {
    CaretDownOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
    CaretUpOutlined,
    CloseOutlined,
    MinusOutlined,
    CheckOutlined
} from "@ant-design/icons";
import {GetNodeStyle} from "./BasicNode";

const STATUS_FINISHED='Finished';
const STATUS_TODO='Todo';

const DATA_ITEM={
    Name:"",
    ID:0
}
const NODE_DATA_ITEM={
    Offset:0,
    Status:STATUS_TODO
}

const ICON_LENGTH=2;
const SPACE_LENGTH=1;
const LENGTH_AMOUNT=24;
const OFFSET_STEP=2;

const TodoListNode=(nodeProps)=>{
    const [nodeData,setNodeData]=useState(nodeProps.data.node_data)
    const [data,setData]=useState(nodeProps.data.data);
    const [selectedTodoItem,setSelectedTodoItem]=useState({})

    const newItem=(outsideIndex,offset)=>{
        let newList=nodeData.list;
        let newItem={
            data:{...DATA_ITEM},
            node_data:{...NODE_DATA_ITEM}
        }
        newItem.data.ID=getId('TodoListNode');
        newItem.node_data.Offset=offset;
        newList.splice(outsideIndex,0,newItem);
        setSelectedTodoItem(newItem);
        setNodeData({
            ...nodeData,
            list:newList
        })
    }

    const deleteItem=(outsideIndex)=>{
        let newList=nodeData.list;
        newList.splice(outsideIndex,1);
        setNodeData({
            ...nodeData,
            list:newList
        })
    }

    const updateItem=(outsideIndex,newTodoItem)=>{
        let newNodeData=nodeData;
        newNodeData.list[outsideIndex]=newTodoItem;
        setNodeData(newNodeData)
    }

    const runCmd=(outsideIndex,cmd)=>{
        let newList=nodeData.list;
        let listAmount=newList.length;
        switch (cmd){
            case 'Up':
                if (outsideIndex>0){
                    let preTodoItem=newList[outsideIndex-1];
                    newList[outsideIndex-1]=newList[outsideIndex];
                    newList[outsideIndex]=preTodoItem;
                }
                break;
            case 'Down':
                if ((outsideIndex-0+1)<listAmount){
                    let nextTodoItem=newList(outsideIndex+1);
                    newList[outsideIndex+1]=newList[outsideIndex];
                    newList[outsideIndex]=nextTodoItem;
                }
                break;
            case 'Left':
                if (newList[outsideIndex].node_data.Offset>=OFFSET_STEP){
                    newList[outsideIndex].node_data.Offset-=OFFSET_STEP;
                }
                break;
            case 'Right':
                if((newList[outsideIndex].node_data.Offset+OFFSET_STEP)<=(LENGTH_AMOUNT-ICON_LENGTH-SPACE_LENGTH)){
                    newList[outsideIndex].node_data.Offset+=OFFSET_STEP;
                }
                break;
        }
        setNodeData({
            ...nodeData,
            list:newList
        })
    }

    return (
        <div
            style={GetNodeStyle(nodeProps)}
            className={"TodoListNode"}
        >
            <NodeResizer
                isVisible={nodeProps.selected}
            />
            <NodeToolbar>
                <Button
                    type={"primary"}
                    onClick={()=>{
                        setNodeData({
                            ...nodeData,
                            hiddenFinished:!nodeData.hiddenFinished
                        })
                    }}
                >
                    {
                        nodeData.hiddenFinished?'Show All':'Hidden Finished'
                    }
                </Button>
                <Button
                    type={"primary"}
                    danger={true}
                >
                    Clean Finished
                </Button>
            </NodeToolbar>
            <Input
                value={data?.Name}
                onChange={(e)=>{
                    setData({
                        ...data,
                        Name:e.target.value
                    });
                }}
                size={"small"}
            />
            <hr />
            {
                nodeData.list.map((todoItem,outsideIndex)=>{
                    return (
                        <div
                            className={"EachRow"}
                            key={todoItem.data.ID}
                        >
                            <Row
                                justify={"start"}
                                align={"middle"}
                                onClick={()=>{
                                    if (selectedTodoItem?.data?.ID==todoItem.data.ID){
                                        setSelectedTodoItem({});
                                    }else{
                                        setSelectedTodoItem(todoItem);
                                    }
                                }}
                            >
                                <Col
                                    span={ICON_LENGTH}
                                    offset={todoItem.node_data.Offset}
                                >
                                    <Button
                                        icon={
                                            todoItem.node_data.Status==STATUS_TODO
                                                ?<MinusOutlined />
                                                :<CheckOutlined />
                                        }
                                        ghost={
                                            todoItem.node_data.Status==STATUS_TODO
                                        }
                                        shape={"circle"}
                                        type={"primary"}
                                        size={"small"}
                                        onClick={()=>{
                                            let newTodoItem=todoItem;
                                            newTodoItem.node_data.Status=(todoItem.node_data.Status==STATUS_TODO)?STATUS_FINISHED:STATUS_TODO
                                        }}
                                    ></Button>
                                </Col>
                                <Col
                                    offset={SPACE_LENGTH}
                                    span={LENGTH_AMOUNT-SPACE_LENGTH-ICON_LENGTH-todoItem.node_data.Offset}
                                >
                                    <Input
                                        disabled={todoItem.node_data.Status==STATUS_FINISHED}
                                        size={"small"}
                                        value={todoItem.data.Name}
                                        onChange={(e)=>{
                                            let newTodoItem=todoItem;
                                            newTodoItem.data.Name=e.target.value;
                                            updateItem(outsideIndex,newTodoItem);
                                        }}
                                        onPressEnter={()=>{
                                            newItem(outsideIndex+1,todoItem.node_data.Offset)
                                        }}
                                    />
                                </Col>
                            </Row>
                            {
                                selectedTodoItem?.data?.ID==todoItem.data.ID && todoItem.node_data.Status==STATUS_TODO
                                    ?<Row
                                        justify={"start"}
                                        align={"middle"}
                                    >
                                        <Col
                                            offset={todoItem.node_data.Offset+ICON_LENGTH}
                                        >
                                            <Button
                                                size={"small"}
                                                type={"link"}
                                                icon={<CaretUpOutlined/>}
                                                onClick={()=>{
                                                    runCmd(outsideIndex,'Up')
                                                }}
                                            ></Button>
                                            <Button
                                                size={"small"}
                                                type={"link"}
                                                icon={<CaretDownOutlined/>}
                                                onClick={()=>{
                                                    runCmd(outsideIndex,'Down')
                                                }}
                                            ></Button>
                                            <Button
                                                size={"small"}
                                                type={"link"}
                                                icon={<CaretLeftOutlined/>}
                                                onClick={()=>{
                                                    runCmd(outsideIndex,'Left')
                                                }}
                                            ></Button>
                                            <Button
                                                size={"small"}
                                                type={"link"}
                                                icon={<CaretRightOutlined/>}
                                                onClick={()=>{
                                                    runCmd(outsideIndex,'Right')
                                                }}
                                            ></Button>
                                            <Button
                                                size={"small"}
                                                type={"link"}
                                                icon={<CloseOutlined/>}
                                                onClick={()=>{
                                                    deleteItem(outsideIndex)
                                                }}
                                            ></Button>
                                        </Col>
                                    </Row>
                                    :''
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export {
    TodoListNode
}