import React, { useEffect, useState } from 'react';
import ReactFlow, {useNodesState, useEdgesState, ReactFlowProvider} from 'reactflow';
import 'reactflow/dist/style.css';
import {PointNodeView} from '../Components/Nodes/PointNode'

const initialNodes = [
    { id: '1',type:"PointNodeView", data: { label: '-' }, position: { x: 100, y: 100 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const AllNodeTypes={
    PointNodeView
}

const BasicBord=()=>{
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    return (
        <ReactFlow
            nodeTypes={AllNodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            defaultViewport={defaultViewport}
            minZoom={0.2}
            maxZoom={4}
            attributionPosition="bottom-left"
        >
        </ReactFlow>
    )
}

const WhiteBord = () => {
    return (
        <ReactFlowProvider>
            <BasicBord />
        </ReactFlowProvider>
    );
};

export default WhiteBord;
