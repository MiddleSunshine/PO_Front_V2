import React, {useEffect, useState,useRef, useCallback} from 'react';
import ReactFlow, {useNodesState, useEdgesState, ReactFlowProvider,addEdge,useReactFlow} from 'reactflow';
import 'reactflow/dist/style.css';
import {PointNodeView, PointNodeCreator, PointNodeEditor} from '../Components/Nodes/PointNode'
import {getId} from "../config/WhiteBord";
import '../Css/WhiteBord.css';
import '@reactflow/node-resizer/dist/style.css';
import {Button, Drawer, message, Row} from 'antd';
import {requestAPI} from "../config/function";
import {useParams} from "react-router-dom";
import {HistoryNode} from '../Components/Nodes/HistoryNode'
import Hotkeys from 'react-hot-keys'
import {LabelNode} from "../Components/Nodes/LabelNode";
import {BASIC_NODE_DATA} from "../Components/Nodes/BasicNode";
import {NewWhiteBoardNode,WhiteBoardNode} from "../Components/Nodes/WhiteBoardNode";
import {InputConnectionNode} from '../Components/Nodes/InputConnectionNode'
import {OutputConnectionNode} from '../Components/Nodes/OutputConnectionNode'
const defaultViewport = {x: 0, y: 0, zoom: 1.5};

const AllNodeTypes = {
    HistoryNode,
    LabelNode,
    NewWhiteBoardNode,
    WhiteBoardNode,
    InputConnectionNode,
    OutputConnectionNode
}

const BasicBord = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [whiteboard,setWhiteBoard]=useState({});
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
    const [selectedNode,setSelectedNode]=useState({});
    const [editMode,setEditMode]=useState(false);

    const { getIntersectingNodes } = useReactFlow();

    const reactFlowWrapper=useRef(null);

    const {id}=useParams();

    const renderEditComponent=useCallback(()=>{
        let renderComponent='';
        if(editMode){
            switch(selectedNode.type){
                case 'PointNodeView':
                    renderComponent=<PointNodeEditor node={selectedNode} />
                    break;
                default:
                    renderComponent='';
                    break;
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
                label: "New WhiteBord",
                type: "NewWhiteBoardNode"
            },
            {
                label:"History Node",
                type: "HistoryNode"
            },
            {
                label: "Label",
                type: "LabelNode"
            },
            {
                label: "End Connection",
                type: "InputConnectionNode"
            },
            {
                label: "Start Connection",
                type: "OutputConnectionNode"
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
                                <Button
                                    type={"link"}
                                    onClick={(event)=>{ createNode(event,menu.type) }}
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
        setNodes((n) =>n.concat([new_node]) );
        setMenuPosition({x: 0, y: 0});
    }

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const handleSelectionChange=({nodes,edges})=>{
        if(nodes.length==1){
            setSelectedNode(nodes[0]);
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
                let newNodes=nodes.map((n)=>{
                    if (n.id==node.id){
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

    };


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
                            saveWhiteBord(false)
                        }}
                    >
                        Save WhiteBord
                    </Button>
                    <Button
                        onClick={()=>{
                            saveWhiteBord(true)
                        }}
                    >
                        Save Draft
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
