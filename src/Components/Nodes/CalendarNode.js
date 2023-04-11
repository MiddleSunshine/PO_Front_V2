import {Button, Calendar, Input, List, Timeline} from "antd";
import {useEffect, useState} from "react";
import {GetNodeStyle} from "./BasicNode";
import {NodeToolbar} from "reactflow";

const MODE_LIST='List';
const MODE_CALENDAR='Calendar';

const NODE_DATE_TEMPLATE={
    node_data:{
        date:""
    },
    data:{
        Name:""
    }
};
/**
 node_data:{
    list:{
        year:{
            month:{
                day:{
                    mins:[]
                }
            }
        }
    },
    mode:List or Calendar
 },
 data:{
    ID:ID,
    Name:Name
 }
 */

const CalendarNode=(nodeProps)=>{

    const [nodeData,setNodeData]=useState(nodeProps.data.node_data)
    const [data,setData]=useState(nodeProps.data.data);
    const [listData,setListData]=useState([]);
    const [calendarData,setCalendarData]=useState({});
    const [selectedDate,changeSelectedDate]=useState("")

    useEffect(()=>{
        createListData(nodeProps.data.node_data);
        createCalendarData(nodeProps.data.node_data);
    },[])

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
            </NodeToolbar>
            <Input
                value={data?.Name}
                onChange={(e)=>{

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
                            headerRender={()=>{
                                return (
                                    <Button

                                    >
                                        {
                                            selectedDate?selectedDate:"Date"
                                        }
                                    </Button>
                                )
                            }}
                            cellRender={(current,today)=>{
                                let date=`${current.$y}-${current.$M-0+1}-${current.$D}`;
                                return renderCalendarItem(date);
                            }}
                            onChange={(date)=>{
                                changeSelectedDate(date.format("YYYY-M-D"));
                            }}
                        />
                    </div>
            }
        </div>
    )
}

export {
    CalendarNode
}