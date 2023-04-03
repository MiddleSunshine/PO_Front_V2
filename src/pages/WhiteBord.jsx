import React, {useEffect, useState,useRef, useCallback} from 'react';
import ReactFlow, {useNodesState, useEdgesState, ReactFlowProvider,addEdge,useReactFlow} from 'reactflow';
import {PointNodeView, PointNodeEditor} from '../Components/Nodes/PointNode'
import {getId} from "../config/WhiteBord";
import '../Css/WhiteBord.css';
import {Button, Cascader, Col, Drawer, Form, message, Row} from 'antd';
import {requestAPI} from "../config/function";
import {useParams} from "react-router-dom";
import {HistoryNode} from '../Components/Nodes/HistoryNode'
import Hotkeys from 'react-hot-keys'
import {LabelNode} from "../Components/Nodes/LabelNode";
import {BASIC_NODE_DATA} from "../Components/Nodes/BasicNode";
import {NewWhiteBoardNode,WhiteBoardNode} from "../Components/Nodes/WhiteBoardNode";
import {InputConnectionNode} from '../Components/Nodes/InputConnectionNode'
import {OutputConnectionNode} from '../Components/Nodes/OutputConnectionNode'
import {ImageNode} from "../Components/Nodes/ImageNode";
import {EditEdge} from "../Components/Edges/EditEdge";
import {DirectoryNode} from '../Components/Nodes/DirectoryNode'
import {DrawNode} from "../Components/Nodes/DrawNode";

const defaultViewport = {x: 0, y: 0, zoom: 1.5};

const AllNodeTypes = {
    HistoryNode,
    LabelNode,
    NewWhiteBoardNode,
    WhiteBoardNode,
    InputConnectionNode,
    OutputConnectionNode,
    ImageNode,
    DirectoryNode,
    DrawNode
}

const BasicBord = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [whiteboard,setWhiteBoard]=useState({});
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
    const [selectedNode,setSelectedNode]=useState({});
    const [selectedEdge,setSelectedEdge]=useState({});
    const [editMode,setEditMode]=useState(false);

    const { getIntersectingNodes } = useReactFlow();

    const reactFlowWrapper=useRef(null);

    const {id}=useParams();

    const renderEditComponent=useCallback(()=>{
        let renderComponent='';
        if(editMode){
            if (selectedNode.id){
                switch(selectedNode.type){
                    case 'PointNodeView':
                        renderComponent=<PointNodeEditor node={selectedNode} />
                        break;
                    default:
                        renderComponent='';
                        break;
                }
            }
            if (selectedEdge.id){
                renderComponent=<EditEdge edgeProps={selectedEdge} />
            }
        }
        return renderComponent;
        
    },[editMode]);

    useEffect(()=>{
        getWhiteBord(id);
    },[])

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
                label: "Save Page",
                value: "SavePage"
            },
            {
                label:"Save Draft",
                value: "SaveDraft"
            },
            {
                label: "Directory",
                value: "DirectoryNode"
            },
            {
                label:"History Node",
                value: "HistoryNode"
            },
            {
                label: "Draw",
                value: "DrawNode"
            },
            {
                label: "Image Node",
                value: "ImageNode"
            },
            {
                label: "Label",
                value: "LabelNode"
            },
            {
                label: "New Page",
                value: "NewWhiteBoardNode"
            },
            {
                label: "End Connection",
                value: "InputConnectionNode"
            },
            {
                label: "Start Connection",
                value: "OutputConnectionNode"
            }
        ];

        return (
            <div style={menuStyle}>
                {
                    menus.map((menu)=>{
                        return (
                            <div
                                key={menu.value}
                            >
                                <Button
                                    type={"link"}
                                    onClick={(event)=>{ createNode(event,menu.value) }}
                                >
                                    {
                                        menu.label
                                    }
                                </Button>
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
            data:{
                ...BASIC_NODE_DATA
            },
            position: position
        }
        switch (type){
            case 'SavePage':
                saveWhiteBord(false);
                break;
            case 'SaveDraft':
                saveWhiteBord(true)
                break;
            case 'DirectoryNode':
                new_node.data.node_data=[];
            default:
                setNodes((n) =>n.concat([new_node]) );
                setMenuPosition({x: 0, y: 0});
        }
    }

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const handleSelectionChange=({nodes,edges})=>{
        if(nodes.length==1){
            setSelectedNode(nodes[0]);
        }else{
            setSelectedNode({});
        }
        if (edges.length==1){
            setSelectedEdge(edges[0]);
        }else{
            setSelectedEdge({});
        }
    }

    const saveWhiteBord=(IsDraft=true)=>{
        requestAPI("index.php?action=WhiteBordController&method=StoreWhiteBord&ID="+id,{
            method:"post",
            body:JSON.stringify({
                IsDraft:IsDraft,
                Data:{
                    settings:{},
                    data:{
                        nodes:nodes,
                        edges:edges
                    }
                }
            })
        })
            .then((data)=>{

            })
    }

    const handleOnNodeDrop=(event,node)=>{
        if (node.type=='InputConnectionNode' || node.type=='OutputConnectionNode'){
            // 相互交叉的 node
            const intersections = getIntersectingNodes(node).map((n) => n.id);
            if (intersections.length==1){
                let intersectionNode={};
                nodes.map((n)=>{
                    if (n.id==intersections[0]){
                        intersectionNode=n;
                    }
                    return n;
                });
                let newNodes=nodes.map((n)=>{
                    if (n.id==node.id){
                        if (!n.parentNode){
                            n.position.x=Math.abs(intersectionNode.position.x-n.position.x);
                            n.position.y=Math.abs(intersectionNode.position.y-n.position.y);
                        }
                        n.parentNode=intersections[0];
                    }
                    return n;
                })
                setNodes(newNodes);
            }
        }
    }

    const getWhiteBord=(whiteBordId)=>{
        requestAPI(`index.php?action=WhiteBordController&method=GetWhiteBord&ID=${whiteBordId}`)
            .then((json)=>{
                setNodes(json.Data.WhiteBordContent.data?.nodes);
                setEdges(json.Data.WhiteBordContent.data?.edges);
                setWhiteBoard(json.Data.WhiteBoard);
                return json.Data.WhiteBoard;
            })
            .then((whiteboard)=>{
                document.title=whiteboard.Title ?? 'WhiteBoard';
            })
    }

    let hotkeysHandler=[];

    hotkeysHandler['shift+s']=()=>{
        saveWhiteBord(false);
    };

    hotkeysHandler['shift+d']=()=>{
        saveWhiteBord(true);
    }


    return (
        <div ref={reactFlowWrapper} className="reactflow-wrapper WhiteBoard">
            <Hotkeys
                keyName={Object.keys(hotkeysHandler).join(',')}
                onKeyDown={(keyname,e,handle)=>{
                    hotkeysHandler[keyname]();
                }}
            >
                <Row>
                    <Button
                        onClick={()=>{
                            setEditMode(true)
                        }}
                    >
                        Edit
                    </Button>
                </Row>
                <ReactFlow
                    nodeTypes={AllNodeTypes}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeDragStop={handleOnNodeDrop}
                    onConnect={onConnect}
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
                    onSelectionChange={handleSelectionChange}
                >
                    {
                        menuPosition.x > 0 && menuPosition.y > 0
                            ? renderMenu()
                            : ''
                    }
                </ReactFlow>
                <Drawer
                    open={editMode}
                    width={500}
                    onClose={()=>{
                        setEditMode(false);
                    }}
                >
                    {
                        renderEditComponent()
                    }
                </Drawer>
            </Hotkeys>
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
