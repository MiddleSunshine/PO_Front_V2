import FullCalendar from '@fullcalendar/react'
import {useParams} from "react-router-dom";
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import cnLocales from '@fullcalendar/core/locales/zh-cn'
import timeGridPlugin from '@fullcalendar/timegrid'
import {useEffect, useState} from 'react';
import {Button, Checkbox, Col, DatePicker, Divider, Form, Input, Modal, Row, TimePicker} from "antd";
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from "dayjs";

const MODE_LIST = 'listWeek';
const MODE_MONTH = 'dayGridMonth';
const MODE_WEEK = 'timeGridWeek';
const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm';

const EVENT_TEMPLATE = {
    title: "",
    content: "",
    start: '',
    end: '',
    start_date: dayjs(),
    end_date: dayjs(),
    start_time: dayjs(),
    end_time: dayjs(),
    background: "",
    fullDay: true
}

const CalendarComponent = () => {
    const {id} = useParams();
    const [events, setEvents] = useState([]);
    const [editEvent, setEditEvent] = useState({
        ...EVENT_TEMPLATE
    });
    const renderEvent = (eventInfo) => {
        return (
            <div
                onClick={() => {
                    // todo 这里进行编辑效果
                }}
            >
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </div>
        )
    }

    const updateEditEvent = (key, value) => {
        let event = {...editEvent};
        switch (key) {
            case 'time':
                event.start_time=dayjs(value[0],TIME_FORMAT);
                event.end_time=dayjs(value[1],TIME_FORMAT);
                event.fullDay=false;
                break;
            case 'date':
                event.start_date = dayjs(value[0], DATE_FORMAT);
                event.end_date = dayjs(value[1], DATE_FORMAT);
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
                    // todo 这里进行新增效果
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
                >
                    保存修改
                </Button>
                &nbsp;&nbsp;
                /
                &nbsp;&nbsp;
                <Button>
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
                initialView={MODE_MONTH}
                events={events}
                eventContent={renderEvent}
                dayCellContent={renderDayCellContent}
            />
            <Modal
                open={true}
                width={1200}
            >
                <Form>
                    <Form.Item
                        label={"日期"}
                    >
                        <DatePicker.RangePicker
                            locale={locale}
                            format={DATE_FORMAT}
                            defaultValue={
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
                            defaultValue={
                                [dayjs(editEvent.start_time, TIME_FORMAT), dayjs(editEvent.end_time, TIME_FORMAT)]
                            }
                            onChange={(timeArray) => {
                                updateEditEvent('time',timeArray)
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={"标题"}
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
                            value={editEvent.content}
                            onChange={(e) => {
                                updateEditEvent('content', e.target.value)
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={"背景色"}
                    >

                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default CalendarComponent
