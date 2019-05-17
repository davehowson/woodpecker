import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Task } from '@/Tasks';
import { taskService } from '@/Services';

import '@/Tasks/TaskList.css';


const TaskList = (props) => {
    const [tasks, setTasks] = useState(null);
    const [navText, setNavText] = useState("Today");

    useEffect(() => {
        let didCancel = false;

        if (!didCancel)
        {
            switch(props.taskNav) {
                case "today":
                    taskService.getTasksToday(moment().format('YYYY-MM-DD')).then(tasks => setTasks(tasks));
                    setNavText("Today");
                    break;

                case "inbox":
                    taskService.getTasksInbox().then(tasks => setTasks(tasks));
                    setNavText("Inbox");
                    break;

                case "upcoming":
                    taskService.getTasksUpcoming().then(tasks => setTasks(tasks));
                    setNavText("Upcoming");
                    break;

                case "completed":
                    taskService.getTasksCompleted().then(tasks => setTasks(tasks));
                    setNavText("Completed");
                    break;

                case "date":
                    taskService.getTasksToday(moment(props.selectedDate).format('YYYY-MM-DD')).then(tasks => setTasks(tasks));
                    setNavText(moment(props.selectedDate).format('MMM Do YYYY'));
                    break;

                default:
                    taskService.getTasksToday(moment(props.selectedDate).format('YYYY-MM-DD')).then(tasks => setTasks(tasks));
                    setNavText("Today");
            }

        }
        return () => {
            didCancel = true;
        }
    }, [props]);


    return (
        <div>
            <Row>
                <Col>
                    <h6 className="subheading">{navText}</h6>
                    {tasks &&
                        <Table borderless size="sm">
                            <tbody>
                                {tasks.map(task =>
                                   <Task task={task} key={task.id} taskNav={props.taskNav} />
                                )}
                            </tbody>
                        </Table>
                    }
                </Col>
            </Row>
           
        </div>
    )
}

export { TaskList };