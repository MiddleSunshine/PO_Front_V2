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

    const [showMenu,setShowMenu]=useState(false);
    const [menuPosition,setMenuPosition]=useState({x:0,y:0});

    const renderMenu=()=>{
        const menuStyle={
            position: 'absolute',
            left: menuPosition.x,
            top: menuPosition.y,
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        }

        return (
            <div style={menuStyle}>
                <ul>
                    <li>菜单1</li>
                    <li>菜单2</li>
                    <li>菜单3</li>
                </ul>
            </div>
        )
    }
    /**
     *
     * @param MouseEvent event
     */
    const handleContextMenu=(event)=>{
        event.preventDefault();
        debugger
        // new Promise(resolve => {}).then(()=>{
        //     setMenuPosition({
        //         x:event.clientX,
        //         y:event.clientY
        //     })
        // }).then(()=>{
        //     setShowMenu(true);
        // })
    }

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
            onNodeContextMenu={(event,node)=>{
                event.preventDefault();
                // 这里会在 node 被右键点击的时候触发
            }}
            // onContextMenu={handleContextMenu}
        >
            {/*{*/}
            {/*    showMenu*/}
            {/*        ?renderMenu()*/}
            {/*        :''*/}
            {/*}*/}
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
