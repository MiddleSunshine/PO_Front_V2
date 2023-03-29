import {requestAPI} from "../../config/function";
import {Button, Input, message} from "antd";
import {useState} from "react";
import {CreateNodeAsync, UpdateNode} from "./BasicNode";
import { useReactFlow } from 'reactflow';
import {ExportOutlined,SaveOutlined} from '@ant-design/icons'
const NewWhiteBoardNode=(nodeProps)=>{

    const [title,setTitle]=useState('');
    const instance=useReactFlow();

    const createNewWhiteBoard=(Title)=>{
        if (!Title){
            message.warning("请输入标题");
            return false;
        }
        CreateNodeAsync('WhiteBoardNode',title)
            .then((res)=>{
                if (res.Data.ID){
                    let newNode={...nodeProps};
                    newNode.type='WhiteBoardNode';
                    newNode.data.save_into_database=true;
                    newNode.data.node_data={
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
                    createNewWhiteBoard(title);
                }}
                addonAfter={
                    <Button
                        size={"small"}
                        type={"link"}
                        icon={<SaveOutlined />}
                        onClick={()=>{
                            createNewWhiteBoard(title);
                        }}
                    >
                    </Button>
                }
            />
        </div>
    )
}

const WhiteBoardNode=(nodeProps)=>{

    const [nodeData,setNodeData]=useState(nodeProps.data.node_data);
    const instance=useReactFlow();

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
                    let newNode=nodeProps;
                    newNode.data.node_data=nodeData;
                    UpdateNode(instance,newNode);
                }}
                addonAfter={<a
                    href={`/whiteboard/${nodeData?.ID}`}
                    target={"_blank"} rel="noreferrer"
                >
                    <ExportOutlined />
                </a>}
            />
        </div>
    )
}

export {
    NewWhiteBoardNode,
    WhiteBoardNode
}