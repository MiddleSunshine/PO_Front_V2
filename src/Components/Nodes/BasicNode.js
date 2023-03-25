import { useReactFlow } from 'reactflow';

const BASIC_NODE_DATA={
    data:{},
    node_data:{},
    settings:{},
    save_into_database:true
}

const UpdateNode=(node)=>{
    const instance=useReactFlow();
    let newNodes=instance.getNodes();
    newNodes.map((n)=>{
        if (n.id==node.id){
            return node;
        }
        return n;
    });
    instance.setNodes(newNodes)
}

export {
    BASIC_NODE_DATA,
    UpdateNode
}