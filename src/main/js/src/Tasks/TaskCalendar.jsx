import React, { useEffect, useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';


const TaskCalendar = (props) => {
    const [selectedDay, setSelectedDay] = useState(undefined);

    const handleClick = (day) => {
        props.handleDaySelect(day);
        props.setTaskNav("date")
        setSelectedDay(day)
    }

    return (
        <div className="text-center task-calendar">
            <DayPicker onDayClick={handleClick} selectedDays={selectedDay}/>
        </div>
    )
}

export { TaskCalendar };