import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
    addEdge,
    useReactFlow,
    Background,
    Controls,
    Panel,
    MiniMap
} from 'reactflow';
import { getId } from "../config/WhiteBord";
import '../Css/WhiteBord.css';
import '@reactflow/node-resizer/dist/style.css';
import 'reactflow/dist/style.css';
import { Button, Col, Tooltip, Drawer, Form, Image, message, Modal, Radio, Row, Breadcrumb } from 'antd';
import { getPath, requestAPI } from "../config/function";
import { useParams } from "react-router-dom";
import { HistoryNode } from '../Components/Nodes/HistoryNode'
import Hotkeys from 'react-hot-keys'
import { LabelNode } from "../Components/Nodes/LabelNode";
import { BASIC_NODE_DATA, SaveWhiteBoard } from "../Components/Nodes/BasicNode";
import { NewWhiteBoardNode, WhiteBoardNode, HistoryWhiteBordNode } from "../Components/Nodes/WhiteBoardNode";
import { InputConnectionNode } from '../Components/Nodes/InputConnectionNode'
import { OutputConnectionNode } from '../Components/Nodes/OutputConnectionNode'
import { ImageNode } from "../Components/Nodes/ImageNode";
import { EditEdge } from "../Components/Edges/EditEdge";
import { DirectoryNode } from '../Components/Nodes/DirectoryNode'
import { DrawNode } from "../Components/Nodes/DrawNode";
import { CodeNode } from "../Components/Nodes/CodeNode";
import { TitleNode } from '../Components/Nodes/TitleNode'
import { EditNode } from "../Components/Nodes/EditNode";
import { MarkdownNode } from "../Components/Nodes/MarkdownNode";
import { CalendarNode } from "../Components/Nodes/CalendarNode";
import { TodoListNode } from "../Components/Nodes/TodoListNode";
import { TableNode } from "../Components/Nodes/TableNode";
import { LinkNode } from "../Components/Nodes/LinkNode";
import { SheetNode } from "../Components/Nodes/SheetNode";
import { NoteNode } from '../Components/Nodes/NoteNode'
import {FullCalendarNode} from "../Components/Nodes/FullCalendarNode";
import { CompactPicker } from '@hello-pangea/color-picker'
import Loading from '../Images/zannet.png';
import dayjs from "dayjs";
import WhiteBoardHelp from "../Components/WhiteBoardHelp";
import { SearchHistoryWhiteBoard } from "../Components/SearchHistoryWhiteBoard";

const defaultViewport = { x: 0, y: 0, zoom: 0.9 };

const AllNodeTypes = {
    HistoryNode,
    LabelNode,
    NewWhiteBoardNode,
    WhiteBoardNode,
    InputConnectionNode,
    OutputConnectionNode,
    ImageNode,
    DirectoryNode,
    DrawNode,
    CodeNode,
    TitleNode,
    MarkdownNode,
    CalendarNode,
    TodoListNode,
    HistoryWhiteBordNode,
    TableNode,
    LinkNode,
    SheetNode,
    NoteNode,
    FullCalendarNode
}

const DEFAULT_SETTINGS = {
    background: {
        variant: "lines",// dots,cross
        color: "#f0f0f0"
    }
}

const BasicBord = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [settings, setSettings] = useState({
        ...DEFAULT_SETTINGS
    });
    const [unsavePage,setUnsavePage]=useState(false);
    const [editSettings, setEditSettings] = useState(false);

    const [whiteboard, setWhiteBoard] = useState({});
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [nodeMenuPosition, setNodeMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedNode, setSelectedNode] = useState({});
    const [selectedEdge, setSelectedEdge] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showHelp, setShowHelp] = useState(false);
    const [showGlobalSearch, setShowGlobalSearch] = useState(false);

    const [paths, setPaths] = useState([]);

    const { getIntersectingNodes } = useReactFlow();

    const reactFlowWrapper = useRef(null);

    const { id } = useParams();

    const renderEditComponent = useCallback(() => {
        let renderComponent = '';
        if (editMode) {
            if (selectedNode.id) {
                renderComponent = <EditNode nodeProps={selectedNode} />
            }
            if (selectedEdge.id) {
                renderComponent = <EditEdge edgeProps={selectedEdge} />
            }
        }
        return renderComponent;

    }, [editMode]);

    useEffect(() => {
        getWhiteBord(id);
        renderPath();
        // const interval = setInterval(() => {
        //     saveWhiteBord('自动保存成功');
        // }, 10000);
        // // 组件卸载时清除定时器
        // return () => clearInterval(interval);
    }, [])

    const saveNodeChange = (thisNode) => {
        setNodes((n) => {
            if (n.id == thisNode.id) {
                return Object.assign(n, thisNode);
            }
            return n;
        });
        message.info("Synced");
        setUnsavePage(true);
    }

    const renderMenu = () => {
        const menuStyle = {
            position: 'absolute',
            left: menuPosition.x,
            top: menuPosition.y,
            backgroundColor: 'white',
            padding: '5px',
            borderRadius: '5px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            zIndex: 10,
            // height:"100px",
            // overflowY:"scroll",
            // overflowX:"auto"
        }

        const menuSetting = [
            [

                {
                    label: "常用节点"
                },
                {
                    label: "标题",
                    value: "TitleNode"
                },
                {
                    label: "简易文本",
                    value: "NoteNode"
                },
                {
                    label: "标签",
                    value: "LabelNode"
                },
                {
                    label: "文章",
                    value: "MarkdownNode"
                },
                {
                    label: "历史节点",
                    value: "HistoryNode"
                },
                {
                    label: "特定节点"
                },
                {
                    label: "白板",
                    value: "DrawNode"
                },
                {
                    label: "Excel",
                    value: "SheetNode"
                },
                {
                    label: "Todo List",
                    value: "TodoListNode"
                },
                {
                    label: "日历",
                    value: "FullCalendarNode"
                },
                // {
                //     label: "表格",
                //     value: "TableNode"
                // },
                {
                    label: "图片",
                    value: "ImageNode"
                },
                // {
                //     label: "日历",
                //     value: "CalendarNode"
                // },
                {
                    label: "代码",
                    value: "CodeNode"
                },
                {
                    label: "外部链接",
                    value: "LinkNode"
                },
                {
                    label: "起始链接节点",
                    value: "OutputConnectionNode"
                },
                {
                    label: "终止链接节点",
                    value: "InputConnectionNode"
                }
            ],
            [
                {
                    label: "页面"
                },
                {
                    label: "新的页面",
                    value: "NewWhiteBoardNode"
                },
                {
                    label: "历史页面",
                    value: "HistoryWhiteBordNode"
                },
                {
                    label: "全局搜索",
                    value: "GlobalSearch"
                },
                {
                    label: "操作"
                },
                {
                    label: "保存页面",
                    value: "SavePage"
                },
                {
                    label: "保存草稿",
                    value: "SaveDraft"
                },
                {
                    label: "页面设置",
                    value: "StartSettings"
                },
                {
                    label: "帮助",
                    value: "ShowHelp"
                }
            ]
        ];

        return (
            <div className={"Menu"} style={menuStyle}>
                <Row>
                    {
                        menuSetting.map((menus, menuIndex) => {
                            return (
                                <Col
                                    span={12}
                                    key={menuIndex}
                                >
                                    {
                                        menus.map((menu) => {
                                            if (!menu?.value) {
                                                return (
                                                    <div
                                                        key={menu.label}
                                                        className={"Header"}
                                                    >
                                                        <span>{menu.label}</span>
                                                    </div>
                                                )
                                            }
                                            return (
                                                <div
                                                    className={"Item"}
                                                    key={menu.value}
                                                >
                                                    <Tooltip
                                                        placement={"right"}
                                                        title={menu?.tooltip}
                                                    >
                                                        <Button
                                                            size={"small"}
                                                            type={"link"}
                                                            onClick={(event) => { createNode(event, menu.value) }}
                                                        >
                                                            {
                                                                menu.label
                                                            }
                                                        </Button>
                                                    </Tooltip>
                                                </div>
                                            )
                                        })
                                    }
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        )
    }

    const renderNodeMenu = () => {
        const menuStyle = {
            position: 'absolute',
            left: nodeMenuPosition.x,
            top: nodeMenuPosition.y,
            backgroundColor: 'white',
            padding: '5px',
            borderRadius: '5px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            zIndex: 10
        }

        return (
            <div style={menuStyle}>
                <ol>
                    <li>
                        <Button
                            size={"small"}
                            type={"link"}
                            onClick={() => {
                                setEditMode(true)
                            }}
                        >
                            Edit
                        </Button>
                    </li>
                    <li>
                        <Button
                            danger={true}
                            size={"small"}
                            type={"link"}
                            onClick={() => {
                                deleteNode();
                            }}
                        >
                            Delete
                        </Button>
                    </li>
                </ol>
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
        setNodeMenuPosition({
            x: 0,
            y: 0
        })
    }

    const handleNodeContextMene = (event, node) => {
        event.preventDefault();

        // 这里会在 node 被右键点击的时候触发
        setNodeMenuPosition({
            x: event.clientX,
            y: event.clientY
        });
        setSelectedNode(node);
        setSelectedEdge({});
        setMenuPosition({
            x: 0,
            y: 0
        })
    }

    const createNode = (event, type) => {
        event.preventDefault();
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        let id = getId(type);
        let new_node = {
            id: id,
            type: type,
            data: {
                ...BASIC_NODE_DATA
            },
            position: position
        }
        new_node.data.data = {
            Name: "",
            Type: type,
            node_id: id
        }
        switch (type) {
            case "StartSettings":
                setEditSettings(true);
                return false;
            case 'SavePage':
                saveWhiteBord(false);
                return false;
            case 'SaveDraft':
                saveWhiteBord(true)
                return false;
            // case "TitleNode":
            //     new_node.data.save_into_database=true;
            //     break;
            case 'GlobalSearch':
                setShowGlobalSearch(true);
                return false;
            case 'ShowHelp':
                setShowHelp(true);
                return false;
            case 'DirectoryNode':
                new_node.data.node_data = [];
                // new_node.data.save_into_database = true;
                break;
            case 'DrawNode':
                new_node.data.save_into_database = true;
                break;
            case 'CodeNode':
                new_node.data.node_data = {
                    code: "",
                    language: ""
                }
                break;
            case "MarkdownNode":
                new_node.data.node_data = {
                    markdown: ""
                }
                // new_node.data.save_into_database = true;
                break;
            case "CalendarNode":
                // new_node.data.save_into_database = true;
                new_node.data.node_data = {
                    list: {},
                    mode: "List",
                    default_date: dayjs()
                }
                break;
            case "TodoListNode":
                new_node.data.node_data = {
                    list: [
                        {
                            data: {
                                Name: "",
                                ID: getId('TodoListNode')
                            },
                            node_data: {
                                Offset: 0,
                                Status: "Todo"
                            }
                        }
                    ],
                    hiddenFinished: false
                }
                break;
            case 'TableNode':
                new_node.data.node_data = {
                    table: [],
                    titles: [],
                    rows: 1,
                    columns: 1
                }
                new_node.data.save_into_database = true;
                break;
            case "LinkNode":
                new_node.data.node_data = {
                    link: "#"
                }
                // new_node.data.save_into_database = true;
                break;
            case "FullCalendarNode":
                new_node.data.node_data={
                    events:[],
                    databaseEvents:[],
                    mode:"dayGridMonth"
                }
                new_node.data.save_into_database = true;
                break;
            default:
                break;
        }
        new_node.data.saveData = saveNodeChange;
        new_node.data.settings = {};
        setNodes((n) => n.concat([new_node]));
        setMenuPosition({ x: 0, y: 0 });
        setUnsavePage(true);
    }

    const deleteNode = () => {
        let newNodes = nodes.filter((n) => {
            if (n.id == selectedNode?.id) {
                return false;
            }
            if (n.parentNode == selectedNode?.id) {
                return false;
            }
            return true;
        });
        setNodes(newNodes);
        setNodeMenuPosition({
            x: 0,
            y: 0
        });
        setUnsavePage(true);
    }

    const onConnect = useCallback((params) => {
        params.markerEnd={
            type:'arrowclosed',
            // strokeWidth:8,
            // color:"#0d6efd",
            markerUnits:'strokeWidth'
        }
        params.type='step';
        params.style={
            strokeWidth:2
        };
        // params.markerStart.type='arrow';
        // params.markerEnd.type='arrow';
        setEdges((eds) => addEdge(params, eds));
        setUnsavePage(true);
    }, [setEdges]);

    const handleSelectionChange = ({ nodes, edges }) => {
        if (nodes.length == 1) {
            setSelectedNode(nodes[0]);
            setSelectedEdge({});
        } else {
            setSelectedNode({});
        }
        if (edges.length == 1) {
            setSelectedEdge(edges[0]);
            setSelectedNode({});
        } else {
            setSelectedEdge({});
        }
    }

    const saveWhiteBord = (IsDraft = true, message = '保存成功') => {
        SaveWhiteBoard(IsDraft, id, settings, nodes, edges, message);
        setUnsavePage(false);
    }

    const renderPath = () => {
        let path = getPath();
        requestAPI(`/index.php?action=WhiteBordController&method=WhiteBoardRoad`, {
            method: "post",
            body: JSON.stringify({
                Ids: path
            })
        }).then((json) => {
            setPaths(json.Data.roads);
        })
    }

    const handleOnNodeDrop = (event, node) => {
        if (node?.type == 'InputConnectionNode' || node?.type == 'OutputConnectionNode') {
            // 相互交叉的 node
            const intersections = getIntersectingNodes(node).map((n) => n.id);
            if (intersections.length == 1) {
                let intersectionNode = {};
                nodes.map((n) => {
                    if (n.id == intersections[0]) {
                        intersectionNode = n;
                    }
                    return n;
                });
                let newNodes = nodes.map((n) => {
                    if (n.id == node.id) {
                        if (!n.parentNode) {
                            n.position.x = Math.abs(intersectionNode.position.x - n.position.x);
                            n.position.y = Math.abs(intersectionNode.position.y - n.position.y);
                        }
                        n.parentNode = intersections[0];
                        message.success("Connected");
                    }
                    return n;
                })
                setNodes(newNodes);
            }
        }
    }

    const getWhiteBord = (whiteBordId) => {
        requestAPI(`index.php?action=WhiteBordController&method=GetWhiteBord&ID=${whiteBordId}`)
            .then((json) => {
                let nodes = json.Data.WhiteBordContent.data?.nodes.map((n) => {
                    n.data.saveData = saveNodeChange;
                    return n;
                });
                setNodes(nodes);
                setEdges(json.Data.WhiteBordContent.data?.edges);
                setSettings({
                    ...DEFAULT_SETTINGS,
                    ...json.Data.WhiteBordContent?.settings
                });
                setWhiteBoard(json.Data.WhiteBoard);
                return json.Data.WhiteBoard;
            })
            .then((whiteboard) => {
                setIsLoading(false);
                document.title = whiteboard.Title ?? 'WhiteBoard';
            })
    }

    let hotkeysHandler = [];

    hotkeysHandler['shift+s'] = () => {
        saveWhiteBord(false);
    };

    hotkeysHandler['shift+d'] = () => {
        saveWhiteBord(true);
    }

    hotkeysHandler['shift+e'] = () => {
        setEditMode(true);
    }

    hotkeysHandler['shift+g'] = () => {
        setShowGlobalSearch(true);
    }


    return (
        <div ref={reactFlowWrapper} className="reactflow-wrapper WhiteBoard">
            <Hotkeys
                keyName={Object.keys(hotkeysHandler).join(',')}
                onKeyDown={(keyname, e, handle) => {
                    hotkeysHandler[keyname]();
                }}
            >
                <Panel position="top-right">
                {
                    unsavePage
                    ?<Button
                        danger={true}
                        type="primary"
                        onClick={()=>{
                            saveWhiteBord(false);
                        }}
                    >
                        页面未保存，请点击保存
                    </Button>
                    :''
                }
                </Panel>
                <Panel
                    position='top-left'
                >
                    <Breadcrumb>
                        {/* <Breadcrumb.Item>
                            <a
                                href='/whiteboard/1'
                            >Index</a>
                        </Breadcrumb.Item> */}
                        {
                            paths.map((path) => {
                                return (
                                    <Breadcrumb.Item>
                                        <a
                                            href={`/whiteboard/${path.ID}?path=${path.path}`}
                                        >
                                            {path.Title}
                                        </a>
                                    </Breadcrumb.Item>
                                )
                            })
                        }
                    </Breadcrumb>
                </Panel>
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
                    onPaneClick={() => {
                        setNodeMenuPosition({ x: 0, y: 0 });
                        setMenuPosition({ x: 0, y: 0 })
                    }}
                    onNodeContextMenu={handleNodeContextMene}
                    onPaneContextMenu={handleContextMenu}
                    onInit={setReactFlowInstance}
                    onSelectionChange={handleSelectionChange}
                >
                    {
                        menuPosition.x > 0 && menuPosition.y > 0
                            ? renderMenu()
                            : ''
                    }
                    {
                        nodeMenuPosition.x > 0 && nodeMenuPosition.y > 0
                            ? renderNodeMenu()
                            : ''
                    }
                    <Background
                        variant={settings.background.variant}
                        color={settings.background.color}
                    />
                    {/* <Controls

                    /> */}
                    <MiniMap />
                </ReactFlow>
                <Drawer
                    open={editMode}
                    width={500}
                    onClose={() => {
                        setEditMode(false);
                    }}
                >
                    {
                        renderEditComponent()
                    }
                </Drawer>
                <Drawer
                    open={editSettings}
                    width={500}
                    onClose={() => {
                        setEditSettings(false)
                    }}
                >
                    <Form
                        layout={"vertical"}
                    >
                        <Form.Item
                            label={"Option"}
                        >
                            <Button
                                type={"primary"}
                                onClick={() => {
                                    setSettings({
                                        ...DEFAULT_SETTINGS
                                    })
                                    setEditSettings(false);
                                }}
                            >
                                Reset
                            </Button>
                        </Form.Item>
                        <Form.Item
                            label={"Background Type"}
                        >
                            <Radio.Group
                                value={settings.background.variant}
                                onChange={(event) => {
                                    let newSettings = settings;
                                    newSettings.background.variant = event.target.value;
                                    setSettings(newSettings);
                                }}
                            >
                                <Radio value={"lines"}>
                                    Lines
                                </Radio>
                                <Radio value={"dots"}>
                                    Dots
                                </Radio>
                                <Radio value={"cross"}>
                                    Cross
                                </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label={"Background Color"}
                        >
                            <CompactPicker
                                color={settings.background.color}
                                onChange={(color, event) => {
                                    let newSettings = settings;
                                    newSettings.background.color = color.hex;
                                    setSettings(newSettings);
                                }}
                            />
                        </Form.Item>
                    </Form>
                </Drawer>
                <Modal
                    width={"1200px"}
                    open={isLoading}
                    footer={null}
                >
                    <Row
                        justify={"start"}
                        align={"middle"}
                    >
                        <Col span={4}>
                            <Image
                                height={100}
                                src={Loading}
                            />
                        </Col>
                        <Col span={20}>
                            <h3>Data is loading...</h3>
                        </Col>
                    </Row>
                </Modal>
                <Modal
                    open={showHelp}
                    onCancel={() => {
                        setShowHelp(false)
                    }}
                    title={"帮助页面"}
                    footer={null}
                >
                    <WhiteBoardHelp />
                </Modal>
                <Modal
                    title={"全局搜索"}
                    open={showGlobalSearch}
                    onCancel={() => {
                        setShowGlobalSearch(false);
                    }}
                    width={1200}
                    footer={null}
                >
                    <SearchHistoryWhiteBoard
                        keywords={""}
                        showCreateButton={false}
                        OnCancel={() => { }}
                    />
                </Modal>
            </Hotkeys>
        </div>
    )
}

const WhiteBord = () => {
    return (
        <div className="dndflow">
            <ReactFlowProvider>
                <BasicBord />
            </ReactFlowProvider>
        </div>
    );
};

export default WhiteBord;
