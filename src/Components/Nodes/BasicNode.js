import { useReactFlow } from 'reactflow';
import {requestAPI} from "../../config/function";

const BASIC_NODE_DATA={
    data:{},
    node_data:{},
    settings:{},
    save_into_database:false
}

const CreateNodeAsync=(type,name,node_data={})=>{
    return  requestAPI("index.php?action=NodeController&method=CreateNode",{
        method:"post",
        body:JSON.stringify({
            data:{
                Type:type,
                Name:name
            },
            node_data:node_data
        })
    })
}

const GetNodeDetailAsync=(ID)=>{
    return requestAPI(`index.php?action=NodeController&method=GetNodeDetail&ID=${ID}`);
}

const UpdateNodeAsync=(data,node_data)=>{
    return  requestAPI("index.php?action=NodeController&method=UpdateNode",{
        method:"post",
        body:JSON.stringify({
            data:data,
            node_data:node_data
        })
    });
}

const UpdateNode=(instance,node)=>{
    let newNodes=instance.getNodes();
    newNodes.map((n)=>{
        if (n.id==node.id){
            return Object.assign(n,node);
        }
        return n;
    });
    console.table(newNodes);
    instance.setNodes(newNodes)
}

export {
    BASIC_NODE_DATA,
    UpdateNode,
    CreateNodeAsync,
    UpdateNodeAsync,
    GetNodeDetailAsync
}