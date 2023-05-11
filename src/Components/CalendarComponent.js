import FullCalendar from '@fullcalendar/react'
import { useParams } from "react-router-dom";
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import cnLocales from '@fullcalendar/core/locales/zh-cn'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState } from 'react';
import { Button, Divider } from "antd";

const MODE_LIST = 'listWeek';
const MODE_MONTH = 'dayGridMonth';
const MODE_WEEK = 'timeGridWeek';

const EVENT_TEMPLATE = {
    title: "",
    content: "",
    start: '',
    end: '',
    background: ""
}

const CalendarComponent = () => {
    const { id } = useParams();
    const [events, setEvents] = useState([]);
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
                <Button>
                    保存修改
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
        </div>
    )
}

export default CalendarComponent
