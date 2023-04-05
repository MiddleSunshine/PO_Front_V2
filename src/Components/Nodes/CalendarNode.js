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
        let lastdata='';
        let newList=[];
        for (let date in nodeData.list){

        }
    }

    const createCalendarData=(nodeData)=>{

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
                        dateCellRender={(date)=>{

                        }}

                    />
            }
        </div>
    )
}

export {
    CalendarNode
}