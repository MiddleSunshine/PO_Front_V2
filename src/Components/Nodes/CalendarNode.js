import {Breadcrumb, Button, Calendar, DatePicker, Form, Input, List, Modal, Row,Col, Timeline, TimePicker} from "antd";
import {useEffect, useState} from "react";
import {GetNodeStyle} from "./BasicNode";
import {NodeToolbar} from "reactflow";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

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

    useEffect(()=>{
        createListData(nodeProps.data.node_data);
        createCalendarData(nodeProps.data.node_data);
    },[]);

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

    const startInput=()=>{
        setInputMode(INPUT_MODE_EDIT)
    }

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
                                {value.data.Name}
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
                        startInput();
                    }}
                >
                    Input
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
            >
                <Form
                    layout={"vertical"}
                >
                    <Form.Item
                        label={"Date"}
                    >
                        <Row
                            justify={"space-between"}
                            align={"middle"}
                        >
                            <Col span={3}>
                                <Input
                                    addonBefore={"Year"}
                                    value={editData.node_data.year}
                                />
                            </Col>
                            <Col span={3}>
                                <Input
                                    addonBefore={"Month"}
                                    value={editData.node_data.month}
                                />
                            </Col>
                            <Col span={3}>
                                <Input
                                    addonBefore={"Day"}
                                    value={editData.node_data.day}
                                />
                            </Col>
                            <Col span={3}>
                                <Input
                                    addonBefore={"Hour"}
                                    value={editData.node_data.hour}
                                />
                            </Col>
                            <Col span={3}>
                                <Input
                                    addonBefore={"Min"}
                                    value={editData.node_data.min}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        label={"Title"}
                    >
                        <Input
                            value={editData.data.Name}
                        />
                    </Form.Item>
                    <Form.Item
                        label={"Note"}
                    >
                        <Input.TextArea
                            value={editData.data.Note}
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