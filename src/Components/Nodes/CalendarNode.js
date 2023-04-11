import {Button, Calendar, Input, List, Timeline} from "antd";
import {useState} from "react";
import {GetNodeStyle} from "./BasicNode";
import {NodeToolbar} from "reactflow";

const MODE_LIST='List';
const MODE_CALENDAR='Calendar';

const CalendarNode=(nodeProps)=>{

    const [nodeData,setNodeData]=useState(nodeProps.data.node_data)
    const [data,setData]=useState(nodeProps.data.data);
    const [listData,setListData]=useState([]);
    const [calendarData,setCalendarData]=useState({});

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
            for (let month in nodeData.list[year]){
                for (let day in month.list[year][month]){
                    date=`${year}-${month}-${day}`;
                    newList[date]=[];
                    for (let hour in month.list[year][month][day]){
                        for (let minute in month.list[year][month][day][hour]){
                            month.list[year][month][day][hour][minute].map((item)=>{
                                newList[date].push(item);
                                return item;
                            });
                        }
                    }
                }
            }
        }
        setCalendarData(newList);
    }

    return (
        <div
            style={GetNodeStyle(nodeProps)}
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

                    />
            }
        </div>
    )
}

export {
    CalendarNode
}