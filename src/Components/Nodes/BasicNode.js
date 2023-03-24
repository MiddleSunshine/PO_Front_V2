import { useReactFlow } from 'reactflow';

const BASIC_NODE_DATA={
    data:{},
    node_data:{},
    settings:{}
}

const UpdateNode=(node)=>{
    const instance=useReactFlow();
    instance.setNodes((nodes)=>nodes.map((n)=>{
        if (n.id==node.id){
            return node;
        }
        return n;
    }));
}

export {
    BASIC_NODE_DATA,
    UpdateNode
}