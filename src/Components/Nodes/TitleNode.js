import {Input, message} from "antd";
import {useCallback, useState} from "react";
import {CreateNodeAsync} from "./BasicNode";
import {Handle, useReactFlow} from 'reactflow';
import {UpdateNode} from "./BasicNode";

const MODE_VIEW='View';
const MODE_EDIT='Edit';

const TitleNode=(nodeProps)=>{
    const [mode,setMode]=useState(nodeProps.data.data.hasOwnProperty('ID')?MODE_VIEW:MODE_EDIT);
    const [data,setData]=useState(nodeProps.data.data);
    const instance=useReactFlow();

    const SAVE_DATA=(data)=>{
        if (data.hasOwnProperty('ID')){
            let newNode=nodeProps;
            newNode.data.data=data;
            UpdateNode(instance,newNode);
        }
    }

    const finishInput=()=>{
        if (!data?.Name){
            message.warning("Please input the title");
            return false;
        }
        if (!data.hasOwnProperty('ID')){
            CreateNodeAsync('TitleNode',data.Name)
                .then((res)=>{
                    if (res.Data.data){
                        setData(res.Data.data)
                        SAVE_DATA(res.Data.data);
                    }else{
                        message.warning(res.Message);
                    }
                })
        }else{
            SAVE_DATA(data);
        }
        setMode(MODE_VIEW);
    }

    return <div>
        {
            mode==MODE_VIEW
                ?<h3
                    onClick={()=>{
                        setMode(MODE_EDIT);
                    }}
                >
                    {data.Name}
                </h3>
                :<Input
                    value={data.Name}
                    onChange={(e)=>{
                        setData({
                            ...data,
                            Name:e.target.value
                        })
                    }}
                    onPressEnter={()=>{
                        finishInput();
                    }}
                    onBlur={()=>{
                        finishInput();
                    }}
                />
        }

    </div>
}

export {
    TitleNode
}