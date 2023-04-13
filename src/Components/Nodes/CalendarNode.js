import {
    Button,
    Calendar,
    Form,
    Input,
    Modal,
    Row,
    Col,
    Timeline,
    InputNumber, message
} from "antd";
import {useEffect, useState} from "react";
import {GetNodeStyle,UpdateNode} from "./BasicNode";
import {NodeToolbar} from "reactflow";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import {getId} from "../../config/WhiteBord";
import {useReactFlow} from 'reactflow';

const MODE_LIST='List';
const MODE_CALENDAR='Calendar';
const DATE_FORMAT='YYYY-M-D';
const NODE_DATE_TEMPLATE={
    node_data:{
        year:"",
        month:"",
        day:"",
        hour:"",
        min:""
    },
    data:{
        Name:"",
        Note:"",
        ID:""
    }
};
/**
 node_data:{
    list:{
        year:{
            month:{
                day:{
                    mins:[
                    {...NODE_DATE_TEMPLATE}
                    ]
                }
            }
        }
    },
    mode:List or Calendar,
    default_date:""
 },
 data:{
    ID:ID,
    Name:Name
 }
 */

const INPUT_MODE_EDIT='Edit';
const INPUT_MODE_HIDDEN='Hidden';

const CalendarNode=(nodeProps)=>{

    const [nodeData,setNodeData]=useState(nodeProps.data.node_data)
    const [data,setData]=useState(nodeProps.data.data);
    // [ {label:string,children:string} ]
    const [listData,setListData]=useState([]);
    // { date=>[ NODE_DATE_TEMPLATE ] }
    const [calendarData,setCalendarData]=useState({});
    const [selectedDate,changeSelectedDate]=useState(()=>dayjs(nodeProps.data.node_data.default_date))
    const [editData,setEditData]=useState({
        ...NODE_DATE_TEMPLATE
    });
    // EDIT
    const [inputMode,setInputMode]=useState(INPUT_MODE_HIDDEN);
    const instance=useReactFlow();
    useEffect(()=>{
        createListData(nodeProps.data.node_data);
        createCalendarData(nodeProps.data.node_data);
        changeSelectedDate(()=>dayjs(nodeProps.data.node_data.default_date))
    },[]);

    // 组件 Timeline 的数据xia
    const createListData=(nodeData)=>{
        let label="";
        let newList=[];
        for (let year in nodeData.list){
            let months=nodeData.list[year];
            for (let month in months){
                let days=months[month];
                for (let day in days){
                    label=`${year}-${month}-${day}`;
                    let hours=days[day];
                    for (let hour in hours){
                        let minutes=hours[hour];
                        for (let minute in minutes){
                            let items=minutes[minute];
                            items.map((i)=>{
                                newList.push({
                                    label:label,
                                    children:i.data.Name
                                });
                                if (label){
                                    label='';
                                }
                                return i;
                            });

                        }
                    }
                }
            }
        }
        setListData(newList);
    }

    const SAVE_DATA=()=>{
        let newNode={
            ...nodeProps
        }
        newNode.data.node_data=nodeData;
        newNode.data.node_data.default_date=selectedDate;
        newNode.data.data=data;
        UpdateNode(instance,newNode);
        message.info("Synced");
    }

    // 组件 Calendar 的数据
    const createCalendarData=(nodeData)=>{
        let newList={};
        let date='';
        for (let year in nodeData.list){
            let months=nodeData.list[year];
            for (let month in months){
                let days=months[month];
                for (let day in days){
                    date=`${year}-${month}-${day}`;
                    newList[date]=[];
                    let hours=days[day];
                    for (let hour in hours){
                        let minutes=hours[hour];
                        for (let minute in minutes){
                            let items=minutes[minute];
                            items.map((i)=>{
                                newList[date].push(i);
                                return i;
                            })
                        }
                    }
                }
            }
        }
        setCalendarData(newList);
    }

    // 开始输入数据
    const startInput=(editData)=>{
        if (editData.data.ID){
            // 编辑历史数据
            setEditData(editData);
        }else{
            let newEditData={
                ...editData
            };
            // 新建数据
            // 设置初始值
            let date=dayjs(selectedDate);
            newEditData.node_data.year=date.year();
            newEditData.node_data.month=date.add(1,'month').month();
            newEditData.node_data.day=date.date();
            newEditData.node_data.hour=date.hour();
            newEditData.node_data.min=date.minute();
            setEditData(newEditData);
        }
        setInputMode(INPUT_MODE_EDIT);
    }

    const updateInput=(field,value)=>{
        let newEditData={...editData};
        switch (field){
            case 'year':
            case 'month':
            case 'day':
            case 'hour':
            case 'min':
                newEditData.node_data[field]=value;
                break;
            case 'Name':
            case 'Note':
                newEditData.data[field]=value;
                break;
        }
        setEditData(newEditData);
    }

    // 保存输入值
    const finishInput=()=>{
        let newItem={
            ...editData
        }
        newItem.data.ID=getId('CalendarNode_Item')
        newItem.node_data.year-=0;
        newItem.node_data.month-=0;
        newItem.node_data.day-=0;
        newItem.node_data.hour-=0;
        newItem.node_data.min-=0;
        createNewItem(
            newItem.node_data.year,
            newItem.node_data.month,
            newItem.node_data.day,
            newItem.node_data.hour,
            newItem.node_data.min,
            newItem
        );
        setInputMode(INPUT_MODE_HIDDEN);
        setEditData({
            ...NODE_DATE_TEMPLATE
        })
    }

    // 将数据保存进 node_data 中
    const createNewItem=(year,month,day,hour,min,data)=>{
        let newList=nodeData.list;
        if (!newList.hasOwnProperty(year)){
            newList[year]={};
        }
        if (!newList[year].hasOwnProperty(month)){
            newList[year][month]={};
        }
        if (!newList[year][month].hasOwnProperty(day)){
            newList[year][month][day]={};
        }
        if (!newList[year][month][day].hasOwnProperty(hour)){
            newList[year][month][day][hour]={};
        }
        if (!newList[year][month][day][hour].hasOwnProperty(min)){
            newList[year][month][day][hour][min]=[];
        }
        newList[year][month][day][hour][min].push(data);
        let newNodeData={
            ...nodeData,
            list:newList
        }
        reRenderContent(newNodeData);
    }

    // 重新渲染页面
    const reRenderContent=(newNodeData)=>{
        switch (nodeData.mode){
            case MODE_CALENDAR:
                createCalendarData(newNodeData)
                break;
            case MODE_LIST:
                createListData(newNodeData);
                break;
        }
        setNodeData(newNodeData);
    }

    // 删除事件
    const deleteItem=(deleteItem)=>{
        debugger
        let newNodeData={
            ...nodeData
        }
        let subItems=newNodeData.list[deleteItem.node_data.year][deleteItem.node_data.month][deleteItem.node_data.day][deleteItem.node_data.hour][deleteItem.node_data.min].filter((i)=>{
            return i.data.ID!=deleteItem.data.ID;
        });
        newNodeData.list[deleteItem.node_data.year][deleteItem.node_data.month][deleteItem.node_data.day][deleteItem.node_data.hour][deleteItem.node_data.min]=subItems;
        reRenderContent(newNodeData);
    }

    // 渲染 Calendar 中每一列的数据
    const renderCalendarItem=(date)=>{
        let data=[];
        if (calendarData.hasOwnProperty(date)){
            data=calendarData[date];
        }
        return (
            <ul>
                {
                    data.map((value, index)=>{
                        return (
                            <li
                                key={index}
                            >
                                <Button
                                    type={"link"}
                                    size={"small"}
                                    onClick={()=>{
                                        startInput(value);
                                    }}
                                >
                                    {value.data.Name}
                                </Button>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    return (
        <div
            style={GetNodeStyle(nodeProps)}
            className={"CalendarNode"}
        >
            <NodeToolbar>
                <Button
                    type={"primary"}
                    onClick={()=>{
                        setNodeData({
                            ...nodeData,
                            mode:nodeData.mode==MODE_LIST?MODE_CALENDAR:MODE_LIST
                        })
                    }}
                >
                    {
                        nodeData.mode==MODE_LIST
                            ?"Show Calendar"
                            :"Show Timeline"
                    }
                </Button>
                &nbsp;&nbsp;
                <Button
                    type={"primary"}
                    onClick={()=>{
                        startInput({...NODE_DATE_TEMPLATE});
                    }}
                >
                    Input
                </Button>
                &nbsp;&nbsp;
                <Button
                    type={"primary"}
                    onClick={()=>{
                        SAVE_DATA();
                    }}
                >
                    Save Update
                </Button>
            </NodeToolbar>
            <Input
                value={data?.Name}
                onChange={(e)=>{
                    setData({
                        ...data,
                        Name:e.target.value
                    })
                }}
            />
            {
                nodeData.mode==MODE_LIST
                    ?<div
                        className={"Timeline"}
                    >
                        <Timeline
                            mode={"left"}
                            items={listData}
                        />
                    </div>
                    :<div
                        className={"Calendar"}
                    >
                        <Calendar
                            locale={locale}
                            value={selectedDate}
                            cellRender={(current,today)=>{
                                let date=`${current.$y}-${current.$M-0+1}-${current.$D}`;
                                return renderCalendarItem(date);
                            }}
                            onChange={(date)=>{
                                changeSelectedDate(date);
                            }}
                        />
                    </div>
            }
            <Modal
                open={inputMode==INPUT_MODE_EDIT}
                width={1200}
                onOk={()=>{
                    finishInput();
                }}
                onCancel={()=>{
                    setInputMode(INPUT_MODE_HIDDEN)
                }}
                title={"Edit Item"}
            >
                <Form
                    layout={"vertical"}
                >
                    {
                        editData.data.ID
                            ?<Form.Item
                               label={"Options"}
                            >
                              <Button
                                  type={"primary"}
                                  danger={true}
                                  onClick={()=>{
                                      deleteItem(editData);
                                      setInputMode(INPUT_MODE_HIDDEN);
                                  }}
                              >Delete</Button>
                            </Form.Item>
                            :""
                    }
                    <Form.Item
                        label={"Date"}
                    >
                        <Row
                            justify={"start"}
                            align={"middle"}
                        >
                            <Col span={3}>
                                <InputNumber
                                    addonBefore={"Year"}
                                    value={editData.node_data.year}
                                    onChange={(newValue)=>{
                                        updateInput('year',newValue)
                                    }}
                                />
                            </Col>
                            <Col span={3} offset={1}>
                                <InputNumber
                                    addonBefore={"Month"}
                                    value={editData.node_data.month}
                                    onChange={(newValue)=>{
                                        updateInput('month',newValue)
                                    }}
                                />
                            </Col>
                            <Col span={3} offset={1}>
                                <InputNumber
                                    addonBefore={"Day"}
                                    value={editData.node_data.day}
                                    onChange={(newValue)=>{
                                        updateInput('day',newValue)
                                    }}
                                />
                            </Col>
                            <Col span={3} offset={1}>
                                <InputNumber
                                    addonBefore={"Hour"}
                                    value={editData.node_data.hour}
                                    onChange={(newValue)=>{
                                        updateInput('hour',newValue)
                                    }}
                                />
                            </Col>
                            <Col span={3} offset={1}>
                                <InputNumber
                                    addonBefore={"Min"}
                                    value={editData.node_data.min}
                                    onChange={(newValue)=>{
                                        updateInput('min',newValue)
                                    }}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        label={"Title"}
                    >
                        <Input
                            value={editData.data.Name}
                            onChange={(e)=>{
                                updateInput('Name',e.target.value)
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={"Note"}
                    >
                        <Input.TextArea
                            value={editData.data.Note}
                            onChange={(e)=>{
                                updateInput('Note',e.target.value)
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export {
    CalendarNode
}