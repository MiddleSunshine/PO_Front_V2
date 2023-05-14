import React, {useState} from 'react'
import {CreateNodeAsync, GetNodeStyle} from "./BasicNode";
import {NodeResizer} from "@reactflow/node-resizer";
import {NodeToolbar} from "reactflow";
import {Button, Form, Input, message, Radio} from "antd";
import {CalendarOutlined,LinkOutlined} from '@ant-design/icons'

const FullCalendarNode=(nodeProps)=>{
    const [data,setData]=useState(nodeProps?.data?.data);
    const [nodeData,setNodeData]=useState(nodeProps?.data?.node_data);
    const [saveData,setSaveData]=useState(false);

    const SAVE_DATA=()=>{
        if (data.hasOwnProperty('ID')) {
            let newNode = { ...nodeProps };
            newNode.data.data = data;
            newNode.data.node_data=nodeData;
            // UpdateNode(instance, newNode);
            nodeProps.data.saveData(newNode);
            setSaveData(false);
        }
    }

    const createNode=()=>{
        if (!data?.Name){
            message.warning("请输入日历名称");
            return false;
        }
        CreateNodeAsync('FullCalendarNode',data.Name,nodeProps.id,nodeData)
            .then((res) => {
                if (res.Data.data.ID) {
                    setData(res.Data.data);
                    SAVE_DATA();
                } else {
                    message.warning(res.Message);
                }
            });
    }

    return (
        <div
            className={"FullCalendarNode"}
            style={GetNodeStyle(nodeProps,saveData)}
        >
            <NodeResizer
                isVisible={nodeProps.selected}
            />
            <NodeToolbar>
                <Form>
                    <Form.Item
                        label={"模式"}
                    >
                        <Radio.Group
                            value={nodeData.mode}
                            onChange={(e)=>{
                                setNodeData({
                                    ...nodeData,
                                    mode:e.target.value
                                });
                                setSaveData(true);
                            }}
                            options={[
                                {label:"日历模式",value:"dayGridMonth"},
                                {label:"事件模式",value:"listWeek"},
                                {label:"周模式",value:"timeGridWeek"}
                            ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type={"primary"}
                            onClick={()=>{
                                SAVE_DATA();
                            }}
                        >
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </NodeToolbar>
            <div>
                {
                    data?.ID
                        ?<Input
                            addonBefore={
                                <CalendarOutlined />
                            }
                            addonAfter={
                                <Button
                                    type={"link"}
                                    href={`/calendar/${data.ID}/${nodeData.mode}`}
                                    target={"_blank"}
                                    icon={<LinkOutlined />}
                                >
                                </Button>
                            }
                            value={data?.Name}
                            onChange={(e)=>{
                                setData({
                                    ...data,
                                    Name:e.target.value
                                });
                                setSaveData(true);
                            }}
                            onPressEnter={()=>{
                                SAVE_DATA();
                            }}
                        />
                        :<Input
                            onChange={(e)=>{
                                setData({
                                    ...data,
                                    Name:e.target.value
                                })
                            }}
                            onPressEnter={()=>{
                                createNode();
                            }}
                        />
                }
            </div>
        </div>
    )
}

export {
    FullCalendarNode
}

/**
 * FullCalendar 是一个用于构建日历的 JavaScript 库，它提供了丰富的配置项来控制日历的外观和行为。下面列出 FullCalendar 常用的一些参数：
 *
 * events: 事件数据，可以是一个数组、一个函数、一个 URL 或一个 JSON 对象。
 * header: 日历头部的配置项，可以是一个对象或一个数组。默认显示 prev、next、today、title 和一个月视图和周视图的切换按钮。
 * views: 可以定义多种视图，如月视图、周视图、日视图、时间轴视图等，以及它们的配置项。
 * defaultView: 默认的视图，如月视图、周视图等。
 * selectable: 是否可以选择日期或时间段，默认为 false。
 * select: 当用户选择日期或时间段时触发的回调函数。
 * editable: 是否可以编辑事件，默认为 false。
 * eventResize: 当用户调整事件大小时触发的回调函数。
 * eventDrop: 当用户拖动事件时触发的回调函数。
 * timezone: 设置时区。
 * slotDuration: 设置时间段的持续时间，如 00:30:00 表示 30 分钟。
 * minTime: 日历显示的最早时间。
 * maxTime: 日历显示的最晚时间。
 * eventTextColor: 事件文本颜色。
 * eventBackgroundColor: 事件背景色。
 * eventBorderColor: 事件边框颜色。
 * eventClick: 当用户点击事件时触发的回调函数。
 * eventRender: 自定义事件的渲染方式。
 * businessHours: 定义工作时间。
 * hiddenDays: 隐藏星期几。
 * firstDay: 每周的第一天是星期几。
 * buttonText: 设置按钮的文本内容。
 * 以上仅是 FullCalendar 的部分参数，更多详细的配置项可以参考 FullCalendar 的官方文档。
 */

/**
 * <FullCalendar
 *   ...
 *   aspectRatio={1.5}
 * />
 */

/**
 * .fc-unthemed .fc-row,
 * .fc-unthemed .fc-popover-body,
 * .fc-unthemed .fc-divider,
 * .fc-unthemed .fc-list-heading td,
 * .fc-unthemed .fc-list-item-marker,
 * .fc-unthemed .fc-axis {
 *   font-size: inherit !important;
 * }
 */