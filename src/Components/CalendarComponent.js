import FullCalendar from '@fullcalendar/react'
import {useParams} from "react-router-dom";
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import cnLocales from '@fullcalendar/core/locales/zh-cn'
import timeGridPlugin from '@fullcalendar/timegrid'
import {useEffect, useRef, useState} from 'react';
import {Button, Checkbox, Col, DatePicker, Divider, Form, Input, message, Modal, Row, TimePicker} from "antd";
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from "dayjs";
import {CirclePicker, CompactPicker} from '@hello-pangea/color-picker'
import {getId} from "../config/WhiteBord";
import {GetNodeDetailAsync, UpdateNodeAsync} from "./Nodes/BasicNode";

const MODE_LIST = 'listWeek';
const MODE_MONTH = 'dayGridMonth';
const MODE_WEEK = 'timeGridWeek';

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm';

const EDIT_EVENT_TEMPLATE = {
    id: "",
    title: "",
    content: "",
    start_date: dayjs().format(DATE_FORMAT).toString(),
    end_date: dayjs().format(DATE_FORMAT).toString(),
    start_time: dayjs().format(TIME_FORMAT).toString(),
    end_time: dayjs().format(TIME_FORMAT).toString(),
    background: "",
    fontColor: "",
    fullDay: true
}

const EVENT_TEMPLATE = {
    id: "",
    title: "",
    start: "",
    end: "",
    backgroundColor: "",
    textColor: "",
    allDay: true
}


const CalendarComponent = () => {

    const {id, mode} = useParams();
    const [nodeData, setNodeData] = useState({});
    const [data, setData] = useState({});

    // 所有事件
    const [events, setEvents] = useState([]);
    //
    const [databaseEvent, setDatabaseEvent] = useState([]);
    // 编辑部分
    const [editEvent, setEditEvent] = useState({
        ...EDIT_EVENT_TEMPLATE
    });
    const [editMode, setEditMode] = useState(false);

    // 初始化日历数据
    const InitCalendar = () => {
        GetNodeDetailAsync(id)
            .then((res) => {
                setData(res.Data.data);
                let jsonNodeData = JSON.parse(res.Data.node_data);
                setNodeData(jsonNodeData);
                if (jsonNodeData?.events){
                    setEvents(jsonNodeData?.events);
                }
                if (jsonNodeData?.databaseEvents){
                    setDatabaseEvent(jsonNodeData?.databaseEvents);
                }
                return res.Data.data?.Name;
            }).then((Name) => {
            document.title = Name;
        })
    }

    const SaveCalendar=()=>{
        UpdateNodeAsync(data,{
            ...nodeData,
            events,
            databaseEvents:databaseEvent
        })
            .then((res)=>{
                if (res.Status==1){
                    message.success("保存成功");
                }else{
                    message.warning(res.Message);
                }
            })
    }

    useEffect(() => {
        InitCalendar();
    }, []);

    // 开启编辑模式
    const startEditEvent = (event) => {
        let id = event.event._def.publicId;
        // 进入编辑模式
        let databaseEventData = {};
        databaseEvent.map((d) => {
            if (d.id == id) {
                databaseEventData = d;
            }
            return d;
        });
        setEditEvent(databaseEventData);
        setEditMode(true);
    }

    const updateEvent = () => {
        // events
        let editEventData = {};
        for (let e in events) {
            if (e.id == editEvent.id) {
                editEventData = editEvent;
            }
        }
        editEventData = changeDatabaseEventIntoEvent(editEventData, editEvent);
        setEvents((events) => events.map((e) => {
            if (e.id == editEventData.id) {
                return editEventData;
            }
            return e;
        }));
        setDatabaseEvent((databaseEvents) => databaseEvents.map((e) => {
            if (e.id == editEvent.id) {
                return editEvent;
            }
            return e;
        }));
        setEditMode(false);
    }

    // 构建新的 Event
    const createEvent = () => {
        if (!editEvent.start_date || !editEvent.end_date) {
            message.warning("请输入日期");
            return false;
        }
        if (!editEvent.fullDay) {
            // 不是全天
            if (!editEvent.start_time || !editEvent.end_time) {
                message.warning("请输入具体时间");
                return false;
            }
        }
        if (!editEvent.title) {
            message.warning("请输入标题");
            return false;
        }
        let newEvent = {
            ...EVENT_TEMPLATE
        }
        let newDatabaseEvent = {
            ...editEvent,
            id: getId('full_calendar')
        }
        newEvent = changeDatabaseEventIntoEvent(newEvent, newDatabaseEvent);
        // 保存数据
        setEvents(events => events.concat(newEvent));
        setDatabaseEvent(databaseEvents => databaseEvents.concat(newDatabaseEvent));
        // 结束编辑
        setEditMode(false);
    }

    const changeDatabaseEventIntoEvent = (event, databaseEvent) => {
        event.id = databaseEvent.id;
        event.title = databaseEvent.title;
        let startTime, endTime, format;
        format = `${DATE_FORMAT} ${TIME_FORMAT}:00`;
        if (databaseEvent.fullDay) {
            startTime = `${databaseEvent.start_date} 00:00`
            endTime = `${databaseEvent.end_date} 23:59`
        } else {
            startTime = `${databaseEvent.start_date} ${databaseEvent.start_time}`
            endTime = `${databaseEvent.end_date} ${databaseEvent.end_time}`
        }
        event.start = dayjs(startTime, format).add(1, 'day').toISOString();
        event.start = event.start.substring(0, event.start.length - 1);
        event.end = dayjs(endTime, format).add(1, 'day').toISOString();
        event.end = event.end.substring(0, event.end.length - 1);
        event.backgroundColor = databaseEvent.background;
        event.textColor = databaseEvent.fontColor;
        event.allDay = databaseEvent.fullDay;
        return event;
    }

    const renderEvent = (eventInfo) => {
        return (
            <div
                onClick={() => {
                    startEditEvent(eventInfo);
                }}
            >
                {eventInfo.event.title}
            </div>
        )
    }

    const updateEditEvent = (key, value) => {
        let event = {...editEvent};
        switch (key) {
            case 'time':
                event.start_time = dayjs(value[0]).format(TIME_FORMAT).toString();
                event.end_time = dayjs(value[1]).format(TIME_FORMAT).toString();
                event.fullDay = false;
                break;
            case 'date':
                event.start_date = dayjs(value[0]).format(DATE_FORMAT).toString();
                event.end_date = dayjs(value[1]).format(DATE_FORMAT).toString();
                break;
            default:
                event[key] = value;
                break;
        }
        setEditEvent(event);
    }

    const renderDayCellContent = (dayCell) => {
        return (
            <Button
                type='link'
                onClick={() => {
                    console.log(dayjs(dayCell.date).format(DATE_FORMAT).toString())
                    let editEventData = {...EDIT_EVENT_TEMPLATE}
                    editEventData.start_date = dayjs(dayCell.date).format(DATE_FORMAT).toString();
                    editEventData.end_date = dayjs(dayCell.date).format(DATE_FORMAT).toString();
                    setEditEvent(editEventData);
                    setEditMode(true);
                }}
            >
                {dayCell.dayNumberText}
            </Button>
        )
    }

    useEffect(() => {


    }, []);


    return (
        <div>
            <Divider>
                <Button
                    type={"primary"}
                    onClick={()=>{
                        SaveCalendar();
                    }}
                >
                    保存修改
                </Button>
                <Divider
                    type={"vertical"}
                />
                <Button
                    onClick={() => {
                        setEditEvent({
                            ...EDIT_EVENT_TEMPLATE
                        });
                        setEditMode(true)
                    }}
                >
                    新增事项
                </Button>
            </Divider>
            <FullCalendar
                locale={cnLocales}
                firstDay={1}
                contentHeight="auto"
                aspectRatio={1}
                plugins={[
                    dayGridPlugin,
                    listPlugin,
                    timeGridPlugin
                ]}
                initialView={mode}
                events={events}
                eventContent={renderEvent}
                dayCellContent={renderDayCellContent}
            />
            <Modal
                open={editMode}
                width={1200}
                onCancel={() => {
                    setEditMode(false);
                }}
                onOk={() => {
                    if (editEvent.id) {
                        // 编辑
                        updateEvent();
                    } else {
                        // 新增
                        createEvent();
                    }
                }}
            >
                <Form>
                    <Form.Item
                        label={"日期"}
                        required={true}
                    >
                        <DatePicker.RangePicker
                            locale={locale}
                            format={DATE_FORMAT}
                            value={
                                [dayjs(editEvent.start_date, DATE_FORMAT), dayjs(editEvent.end_date, DATE_FORMAT)]
                            }
                            onChange={(dateArray) => {
                                updateEditEvent('date', dateArray);
                            }}
                        />
                        <Divider
                            type={"vertical"}
                        />
                        <Checkbox
                            checked={editEvent.fullDay}
                            onChange={(e) => {
                                updateEditEvent('fullDay', e.target.checked);
                            }}
                        >
                            全天
                        </Checkbox>
                        <Divider
                            type={"vertical"}
                        />
                        <TimePicker.RangePicker
                            locale={locale}
                            format={TIME_FORMAT}
                            value={
                                [dayjs(editEvent.start_time, TIME_FORMAT), dayjs(editEvent.end_time, TIME_FORMAT)]
                            }
                            onChange={(timeArray) => {
                                updateEditEvent('time', timeArray)
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={"标题"}
                        required={true}
                    >
                        <Input
                            value={editEvent.title}
                            onChange={(e) => {
                                updateEditEvent('title', e.target.value)
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={"内容"}
                    >
                        <Input.TextArea
                            rows={7}
                            value={editEvent.content}
                            onChange={(e) => {
                                updateEditEvent('content', e.target.value)
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Divider>
                            颜色
                        </Divider>
                        <Row>
                            <Col span={2}>
                                <span>背景色：</span>
                            </Col>
                            <Col span={10}>
                                <CirclePicker
                                    defaultColor={editEvent.background}
                                    onChange={(color) => {
                                        updateEditEvent('background', color.hex)
                                    }}
                                />
                            </Col>
                            <Col span={2}>
                                <span>字体颜色：</span>
                            </Col>
                            <Col span={10}>
                                <CompactPicker
                                    defaultColor={editEvent.fontColor}
                                    onChange={(color) => {
                                        updateEditEvent('fontColor', color.hex)
                                    }}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default CalendarComponent
