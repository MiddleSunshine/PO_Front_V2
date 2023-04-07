import { useReactFlow } from 'reactflow';
import {requestAPI} from "../../config/function";
import {message} from "antd";

const BASIC_NODE_DATA={
    data:{},
    node_data:{},
    settings:{
        style:{}
    },
    save_into_database:false
}

const GetNodeStyle=(node)=>{
    let style={
        ...node.data.settings.style,
        width:node.width,
        height:node.height
    };
    if (node.data.save_into_database){
        style.borderTop="4px solid #62DBC8";
        style.borderRadius="5px";
    }
    return style;
}

const SearchHistoryNodeAsync=(searchKeyword,type='')=>{
    if (!searchKeyword){
        message.warning("Please input the keyword");
        return "";
    }
    return  requestAPI('index.php?action=NodeController&method=SearchNode',{
        method:"post",
        body:JSON.stringify({
            keyword:searchKeyword,
            type:type
        })
    });
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
    instance.setNodes(newNodes)
}

export {
    BASIC_NODE_DATA,
    UpdateNode,
    CreateNodeAsync,
    UpdateNodeAsync,
    GetNodeDetailAsync,
    SearchHistoryNodeAsync,
    GetNodeStyle
}