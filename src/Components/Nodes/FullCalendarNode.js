import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {GetNodeStyle} from "./BasicNode";
import {NodeResizer} from "@reactflow/node-resizer";

const initialDate = '2023-04-10'
const events = [
    {
        title: 'event 1',
        start: '2023-04-10T01:00:00',
        end: '2023-04-10T02:00:00'
    }
]

const FullCalendarNode=(nodeProps)=>{

    const renderEventContent=(eventInfo)=>{
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }

    return (
        <div
            className={"FullCalendarNode"}
            style={GetNodeStyle(nodeProps)}
        >
            <NodeResizer
                isVisible={nodeProps.selected}
            />
            <FullCalendar
                firstDay={1}
                contentHeight="auto"
                aspectRatio={1}
                plugins={[
                    dayGridPlugin
                ]}
                initialView='dayGridMonth'
                events={events}
                eventContent={renderEventContent}
            />
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