import { useReactFlow } from 'reactflow';

const BASIC_NODE_DATA={
    data:{},
    node_data:{},
    settings:{},
    save_into_database:false
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
    UpdateNode
}