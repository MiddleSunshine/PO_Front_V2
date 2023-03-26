import {requestAPI} from "../../config/function";
import {Input, message} from "antd";
import {useState} from "react";
import {UpdateNode} from "./BasicNode";
import { useReactFlow } from 'reactflow';

const NewWhiteBoardNode=(nodeProps)=>{

    const [title,setTitle]=useState('');
    const instance=useReactFlow();
    const createNewWhiteBoard=(Title,Type)=>{
        if (!Title){
            message.warning("请输入标题");
            return false;
        }
        requestAPI("index.php?action=WhiteBordController&method=CreateWhiteBord&",{
            method:"post",
            body:JSON.stringify({
                Title,
                Type
            })
        })
            .then((res)=>{
                if (res.Data.ID){
                    let newNode={...nodeProps};
                    newNode.type='WhiteBoardNode';
                    newNode.save_into_database=true;
                    newNode.node_data={
                        ID:res.Data.ID,
                        Title:Title
                    };
                    UpdateNode(instance,newNode);
                }else{
                    message.warning(res.Message);
                }
            })
    }

    return (
        <div>
            <Input
                value={title}
                onChange={(e)=>{
                    setTitle(e.target.value)
                }}
                onPressEnter={()=>{
                    createNewWhiteBoard(title,'Draft');
                }}
            />
        </div>
    )
}

const WhiteBoardNode=(nodeProps)=>{

    const [nodeData,setNodeData]=useState(nodeProps.data.node_data);

    return (
        <div>
            <Input
                value={nodeData.Title}
                onChange={(e)=>{
                    setNodeData({
                        ...nodeData,
                        Title:e.target.value
                    })
                }}
                onPressEnter={()=>{

                }}
            />
        </div>
    )
}

export {
    NewWhiteBoardNode,
    WhiteBoardNode
}