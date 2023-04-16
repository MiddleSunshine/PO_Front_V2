import {Button, Input, message} from "antd";
import {useCallback, useState} from "react";
import {CreateNodeAsync, GetNodeStyle} from "./BasicNode";
import {Handle, useReactFlow} from 'reactflow';
import {UpdateNode} from "./BasicNode";
import {NodeResizer} from "@reactflow/node-resizer";
import {SaveOutlined} from "@ant-design/icons";
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
            CreateNodeAsync('TitleNode',nodeProps.id,data.Name)
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

    return <div
        style={GetNodeStyle(nodeProps)}
        className={"TitleNode"}
    >
        <NodeResizer
            isVisible={nodeProps.selected}
        />
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
        <div className={"Content"}>
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
                        addonAfter={
                            <Button
                                size={"small"}
                                type={"link"}
                                icon={<SaveOutlined />}
                                onClick={()=>{
                                    finishInput();
                                }}
                            >
                            </Button>
                        }
                    />
            }
        </div>
    </div>
}

export {
    TitleNode
}