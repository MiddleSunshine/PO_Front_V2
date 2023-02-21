import React, {useEffect, useState} from 'react';
import ReactFlow, {useNodesState, useEdgesState, ReactFlowProvider} from 'reactflow';
import 'reactflow/dist/style.css';
import {PointNodeView, PointNodeCreator} from '../Components/Nodes/PointNode'
import {getId} from "../config/WhiteBord";

const initialNodes = [
    {id: '1', type: "PointNodeView", data: {label: '-'}, position: {x: 100, y: 100}},
    {id: '2', data: {label: 'Node 2'}, position: {x: 100, y: 200}},
];

const initialEdges = [{id: 'e1-2', source: '1', target: '2'}];
const defaultViewport = {x: 0, y: 0, zoom: 1.5};

const AllNodeTypes = {
    PointNodeView,
    PointNodeCreator
}

const BasicBord = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});

    const renderMenu = () => {
        const menuStyle = {
            position: 'absolute',
            left: menuPosition.x,
            top: menuPosition.y,
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            zIndex:10
        }

        return (
            <div style={menuStyle}>
                <div>
                    <button
                        onClick={(event) => {
                        createNode(event, 'PointNodeCreator')
                    }
                    }
                    >Point
                    </button>
                    <hr/>
                </div>
            </div>
        )
    }
    /**
     *
     * @param MouseEvent event
     */
    const handleContextMenu = (event) => {
        event.preventDefault();
        setMenuPosition({
            x: event.clientX,
            y: event.clientY
        })
    }

    const createNode = (event, type) => {
        event.preventDefault();
        let new_node={
            id:getId(type),
            type:type,
            data:{},
            position: {x:menuPosition.x,y:menuPosition.y}
        }
        setNodes((n) =>n.concat(new_node) );
        setMenuPosition({x: 0, y: 0});
        console.log(nodes);
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
            onNodeContextMenu={(event, node) => {
                event.preventDefault();
                // 这里会在 node 被右键点击的时候触发
            }}
            onPaneContextMenu={handleContextMenu}
        >
            {
                menuPosition.x > 0 && menuPosition.y > 0
                    ? renderMenu()
                    : ''
            }
        </ReactFlow>
    )
}

const WhiteBord = () => {
    return (
        <ReactFlowProvider>
            <BasicBord/>
        </ReactFlowProvider>
    );
};

export default WhiteBord;
