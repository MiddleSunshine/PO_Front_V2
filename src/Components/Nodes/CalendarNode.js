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

const CalendarNode=(nodeProps)=>{

    const [nodeData,setNodeData]=useState(nodeProps.data.node_data)
    const [data,setData]=useState(nodeProps.data.data);
    const [listData,setListData]=useState([]);
    const [calendarData,setCalendarData]=useState({});

    useEffect(()=>{
        // createListData(nodeProps.data.node_data);
        createCalendarData(nodeProps.data.node_data);
    },[])

    const createListData=(nodeData)=>{
        let newList=[];
        let label="";
        for (let year in nodeData.list){
            for (let month in nodeData.list[year]){
                for (let day in month.list[year][month]){
                    label=`${year}-${month}-${day}`;
                    for (let hour in month.list[year][month][day]){
                        for (let minute in month.list[year][month][day][hour]){
                            if(label!=''){
                                label='';
                            }
                            month.list[year][month][day][hour][minute].map((item)=>{
                                newList.push({
                                    label:label,
                                    children:item
                                });
                                return item;
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
                >
                    Settings
                </Button>
            </NodeToolbar>
            <Input
                value={data?.Name}
                onChange={(e)=>{

                }}
            />
            {
                nodeData.mode==MODE_LIST
                    ?<Timeline

                    />
                    :<Calendar
                        cellRender={(current,today)=>{
                            let date=`${current.$y}-${current.$M-0+1}-${current.$D}`;
                            return renderCalendarItem(date);
                        }}
                    />
            }
        </div>
    )
}

export {
    CalendarNode
}