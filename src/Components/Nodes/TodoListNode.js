import React, {useState} from "react";
import {NodeResizer} from "@reactflow/node-resizer";
import {Handle, NodeToolbar,useReactFlow} from "reactflow";
import {Button, Checkbox, Col, Input, message, Row} from "antd";
import {getId} from "../../config/WhiteBord";
import {
    CaretDownOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
    CaretUpOutlined,
    CloseOutlined,
    PlusOutlined
} from "@ant-design/icons";
import {GetNodeStyle, UpdateNode} from "./BasicNode";

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

const LENGTH_AMOUNT=24;
const OFFSET_STEP=2;

const TodoListNode=(nodeProps)=>{
    const [nodeData,setNodeData]=useState(nodeProps.data.node_data)
    const [data,setData]=useState(nodeProps.data.data);
    const [selectedTodoItem,setSelectedTodoItem]=useState({});
    const [editMode,setEditMode]=useState(false);
    const instance=useReactFlow();

    const SAVE_DATA=()=>{
        let newNode={...nodeProps}
        newNode.data.data=data;
        newNode.data.node_data=nodeData;
        UpdateNode(instance,newNode);
        message.info("save success")
    }

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
        });
    }

    const deleteItem=(outsideIndex)=>{
        let newList=nodeData.list;
        newList.splice(outsideIndex,1);
        setNodeData({
            ...nodeData,
            list:newList
        })
    }

    const cleanFinishedItem=()=>{
        let newList=nodeData.list.filter((item)=>{
            return item.node_data.Status==STATUS_TODO;
        });
        setNodeData(
            {
                ...nodeData,
                list:newList
            }
        );
    }

    const updateItem=(outsideIndex,newTodoItem)=>{
        let newNodeData=nodeData;
        newNodeData.list[outsideIndex]=newTodoItem;
        setNodeData(newNodeData);
        setSelectedTodoItem(newNodeData);
    }

    const runCmd=(outsideIndex,cmd)=>{
        debugger
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
                if((newList[outsideIndex].node_data.Offset+OFFSET_STEP)<=(LENGTH_AMOUNT)){
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
                        if (editMode){
                            SAVE_DATA();
                        }
                        setEditMode(!editMode);
                    }}
                >
                    {
                        editMode?"Save":"Edit"
                    }
                </Button>
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
                    onClick={()=>{
                        cleanFinishedItem();
                    }}
                >
                    Clean Finished
                </Button>
            </NodeToolbar>
            <Handle
                className={"SourceConnection"}
                type={"source"}
                position={"right"}
            >
            </Handle>
            <Handle
                className={"TargetConnection"}
                type={"target"}
                position={"left"}
            />
            {
                !editMode
                    ?<div className={"Content"}>
                        {
                            data.Name
                                ?<h3>{data.Name}</h3>
                                :""
                        }
                        <hr />
                        {
                            nodeData.list.map((todoItem,outsideIndex)=>{
                                if (nodeData.hiddenFinished && todoItem.node_data.Status==STATUS_FINISHED){
                                    return '';
                                }
                                return (
                                    <div
                                        key={outsideIndex}
                                        className={"EachRow"}
                                    >
                                        <Row
                                            justify={"start"}
                                            align={"middle"}
                                        >
                                            <Col
                                                span={LENGTH_AMOUNT-todoItem.node_data.Offset}
                                                offset={todoItem.node_data.Offset}
                                            >
                                                <Checkbox
                                                    checked={todoItem.node_data.Status==STATUS_FINISHED}
                                                >
                                                    {todoItem.data.Name}
                                                </Checkbox>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :<div
                        className={"Content"}
                    >
                        <Input
                            value={data?.Name}
                            onChange={(e)=>{
                                setData({
                                    ...data,
                                    Name:e.target.value
                                });
                            }}
                            size={"small"}
                            // addonAfter={
                            //     <Button
                            //         size={"small"}
                            //         type={"link"}
                            //         icon={<SaveOutlined />}
                            //         onClick={()=>{
                            //             SAVE_DATA();
                            //         }}
                            //     ></Button>
                            // }
                        />
                        <hr />
                        {
                            nodeData.list.map((todoItem,outsideIndex)=>{
                                if (nodeData.hiddenFinished && todoItem.node_data.Status==STATUS_FINISHED){
                                    return '';
                                }
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
                                                    setSelectedTodoItem({})
                                                }else{
                                                    setSelectedTodoItem(todoItem);
                                                }
                                            }}
                                        >
                                            <Col
                                                span={LENGTH_AMOUNT-todoItem.node_data.Offset}
                                                offset={todoItem.node_data.Offset}
                                            >
                                                <Checkbox
                                                    checked={todoItem.node_data.Status==STATUS_FINISHED}
                                                    onChange={(event)=>{
                                                        let newTodoItem=todoItem;
                                                        newTodoItem.node_data.Status=(event.target.checked)?STATUS_FINISHED:STATUS_TODO;
                                                        updateItem(outsideIndex,newTodoItem);
                                                    }}
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
                                                            newItem(outsideIndex+1,todoItem.node_data.Offset);
                                                        }}
                                                    />
                                                </Checkbox>
                                            </Col>
                                        </Row>
                                        {
                                            selectedTodoItem?.data?.ID==todoItem.data.ID
                                                ?<Row
                                                    justify={"start"}
                                                    align={"middle"}
                                                >
                                                    <Col
                                                        offset={todoItem.node_data.Offset}
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
                                                        <Button
                                                            size={"small"}
                                                            type={"link"}
                                                            icon={<PlusOutlined />}
                                                            onClick={()=>{
                                                                newItem(outsideIndex+1,todoItem.node_data.Offset)
                                                            }}
                                                        >
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                :''
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}

export {
    TodoListNode
}