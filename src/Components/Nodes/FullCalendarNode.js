import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {GetNodeStyle} from "./BasicNode";
import {NodeResizer} from "@reactflow/node-resizer";

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
            <NodeResizer />
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                events={[
                    { title: 'Meeting', start: new Date() }
                ]}
                eventContent={renderEventContent}
            />
        </div>
    )
}

export {
    FullCalendarNode
}