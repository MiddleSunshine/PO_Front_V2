import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {GetNodeDetailAsync,UpdateNodeAsync} from "../Components/Nodes/BasicNode";
import {Tldraw} from "@tldraw/tldraw";
import {message} from "antd";

const DrawPage = ()=>{
    const {id}=useParams();
    const [nodeData,setNodeData]=useState({});
    const [data,setData]=useState({});
    const getDrawDetail=(NodeId)=>{
        GetNodeDetailAsync(NodeId)
            .then((res)=>{
                setNodeData(JSON.parse(res.Data.node_data));
                setData(res.Data.data);
                document.title=res.Data?.data?.Name;
            })
    }

    const saveDrawDetail=(data,nodeData)=>{
        UpdateNodeAsync(data,nodeData)
            .then((res)=>{
                if (res.Status==1){
                    message.success("Save Success");
                }else{
                    message.warning(res.Message);
                }
            })
    }

    useEffect(()=>{
        getDrawDetail(id)
    },[]);

    return (
        <div>
            {
                nodeData.hasOwnProperty('id')
                    ?<Tldraw
                        document={nodeData}
                        onSaveProject={(app)=>{
                            saveDrawDetail(data,app.document)
                        }}
                    />
                    :<Tldraw
                        onSaveProject={(app)=>{
                            saveDrawDetail(data,app.document)
                        }}
                    />
            }

        </div>
    )
}

export default DrawPage