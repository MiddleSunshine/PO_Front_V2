import React, {useEffect, useState,useRef} from 'react';
import ReactFlow, {useNodesState, useEdgesState, ReactFlowProvider} from 'reactflow';
import 'reactflow/dist/style.css';
import {PointNodeView, PointNodeCreator} from '../Components/Nodes/PointNode'
import {getId} from "../config/WhiteBord";
import '../Css/WhiteBord.css';

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
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});

    const reactFlowWrapper=useRef(null);

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

        const menus=[
            {
                label:"Point",
                type:"'PointNodeCreator'"
            },
            {
                label: "Default",
                type: "output"
            }
        ];

        return (
            <div style={menuStyle}>
                {
                    menus.map((menu)=>{
                        return (
                            <div
                                key={menu.type}
                            >
                                <button
                                    onClick={(event)=>{ createNode(event,menu.type) }}
                                >
                                    {
                                        menu.label
                                    }
                                </button>
                                <hr/>
                            </div>
                        )
                    })
                }
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
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        let new_node={
            id:getId(type),
            type:type,
            data:{},
            position: position
        }
        setNodes((n) =>n.concat(new_node) );
        setMenuPosition({x: 0, y: 0});
        console.log(nodes);
    }

    return (
        <div ref={reactFlowWrapper} className="reactflow-wrapper">
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
                onInit={setReactFlowInstance}
            >
                {
                    menuPosition.x > 0 && menuPosition.y > 0
                        ? renderMenu()
                        : ''
                }
            </ReactFlow>
        </div>
    )
}

const WhiteBord = () => {
    return (
        <div className="dndflow">
            <ReactFlowProvider>
                <BasicBord/>
            </ReactFlowProvider>
        </div>
    );
};

export default WhiteBord;
