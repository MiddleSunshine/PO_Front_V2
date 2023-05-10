import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid'
import { useState } from 'react';

const MODE_LIST='listWeek';
const MODE_MONTH='dayGridMonth';
const MODE_WEEK='timeGridWeek';

const CalendarPage =()=>{
    const [mode,setMode]=useState(MODE_MONTH);

    const renderEvent=(eventInfo)=>{
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }

    return <div>
            <FullCalendar
                firstDay={1}
                contentHeight="auto"
                aspectRatio={1}
                plugins={[
                    dayGridPlugin,
                    listPlugin,
                    timeGridPlugin
                ]}
                initialView={mode}
                events={[
                    { title: 'Meeting', start: new Date() }
                ]}
                eventContent={renderEvent}
            />
    </div>
}

export default CalendarPage