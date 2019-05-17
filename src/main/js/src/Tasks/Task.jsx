import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

import { taskService } from '@/Services';
import { handleNotification } from '@/Utilities';

import '@/Tasks/Task.css';

const Task = (props) => {

    const [isChecked, setIsChecked] = useState(props.task.complete);
    const [rowClass, setRowClass] = useState('');

    useEffect(() => {
        if (props.task.complete) {
            setRowClass("strike")
        } else {
            setRowClass("no-strike")
        }
    }, [])

    const handleCheckbox = (e) => {
        setIsChecked(e.target.checked)
        if (e.target.checked) {
            setRowClass("strike")
            handleNotification("success", "Task Marked Complete");
        } else {
            setRowClass("no-strike")
            handleNotification("warning", "Task Marked Incomplete");
        }

        let data = {"taskId": props.task.id, "status": !isChecked};

        taskService.completeTask(data).then(response => console.log(response));
    }

    const handleTag = (tags) => {
        let result = [];
        if (props.page != 'dashboard') {
            for (const key of Object.keys(tags)) {
                let tag = tags[key].name.toLowerCase();
                result.push(<span key={key} className='dot' id={'dot-' + tag}></span>);
            }
        }
        
        return result;
    } 

    const handleTime = () => {
        let date = "";
        if (props.task.date != null) {
            if (props.page === 'dashboard') {
                date = moment(props.task.date).calendar(null, {
                    sameDay: '[Today]',
                    nextDay: '[Tomorrow]',
                    nextWeek: 'dddd',
                    lastDay: '[Yesterday]',
                    lastWeek: '[Last] dddd',
                    sameElse: 'DD/MM/YYYY'
                });
            } else {
                date = moment(props.task.date).format("MMM Do");
            }
            
        }
        if (props.task.time != null) {
            date = date.concat(moment(props.task.time, "HH:mm:ss").format(" hh:mm a"))
        }
        
        return date;
    }

    return (
        <tr key={props.task.id}>
            <td className="checkbox-td">
                <label className="label">
                    <input  className="label__checkbox" type="checkbox" checked={isChecked} onChange={handleCheckbox} />
                    <span className="label__text">
                    <span className="label__check">
                        <FontAwesomeIcon icon="check" className="icon"/>
                    </span>
                    </span>
                </label>
            </td>
            <td className="description-td"><span className={rowClass}>{props.task.description}</span></td>
            <td className="time-td"><span className={rowClass}>{handleTime()}</span></td>
            <td className="tag-td text-right">{handleTag(props.task.tags)}</td>
        </tr>
    )
}

export { Task }