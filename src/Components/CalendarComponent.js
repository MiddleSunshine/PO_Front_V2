import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import cnLocales from '@fullcalendar/core/locales/zh-cn'
import timeGridPlugin from '@fullcalendar/timegrid'
import {useState} from 'react';
import {Button, Divider, message, Radio} from "antd";

const MODE_LIST = 'listWeek';
const MODE_MONTH = 'dayGridMonth';
const MODE_WEEK = 'timeGridWeek';

const CalendarComponent = () => {
    const [mode, setMode] = useState(MODE_MONTH);
    const [events,setEvents]=useState([]);
    const renderEvent = (eventInfo) => {
        console.log(eventInfo)
        return (
            <div
                onClick={()=>{

                }}
            >
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </div>
        )
    }
    return (
        <div>
            <Divider>
                <Radio.Group
                    value={mode}
                    onChange={(e)=>{
                        setMode(e.target.value)
                    }}
                >
                    <Radio
                        value={MODE_LIST}
                    >
                        List
                    </Radio>
                    <Radio
                        value={MODE_MONTH}
                    >
                        Month
                    </Radio>
                    <Radio
                        value={MODE_WEEK}
                    >
                        Week
                    </Radio>
                </Radio.Group>
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
                dateClick={()=>{}}
            />
        </div>
    )
}

export default CalendarComponent