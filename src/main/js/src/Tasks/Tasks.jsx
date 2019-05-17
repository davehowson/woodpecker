import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from 'react-helmet'

import { TaskList,TaskCalendar, AddTask } from '@/Tasks';

import '@/Tasks/Tasks.css';

const Tasks = (props) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [taskNav, setTaskNav] = useState('today');

    const handleRowClick = (nav) => {
        setTaskNav(nav)
    }

    const handleNavClass = (nav) => {
        if (nav === taskNav) {
            return "active";
        }
    }
    
    return (
        <div className="container-fluid h-100">
            <Helmet>
                <title>Woodpecker - Tasks</title>
            </Helmet>
            <Row className="h-100">
                <Col lg={3} className="tasks-left-col mt-3">
                    <Row className="my-3">
                        <Col><h4 className="page-header">Tasks</h4></Col>
                    </Row>
                    <Row>
                        <Col>
                            <ul className="task-nav">
                                <li className={handleNavClass("inbox")} onClick={() => handleRowClick("inbox")}>
                                    <FontAwesomeIcon className="task-nav-icon" icon="inbox" fixedWidth /> Inbox
                                </li>
                                <li className={handleNavClass("today")} onClick={() => handleRowClick("today")}>
                                    <FontAwesomeIcon className="task-nav-icon" icon="clock" fixedWidth /> Today
                                </li>
                                <li className={handleNavClass("upcoming")} onClick={() => handleRowClick("upcoming")}>
                                    <FontAwesomeIcon className="task-nav-icon" icon="calendar-week" fixedWidth /> Upcoming
                                </li>
                                <li className={handleNavClass("completed")} onClick={() => handleRowClick("completed")}>
                                    <FontAwesomeIcon className="task-nav-icon" icon="check-double" fixedWidth /> Completed
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row className="h-50 d-flex justify-content-center align-items-center">
                        <Col>
                            <TaskCalendar handleDaySelect={setSelectedDate} setTaskNav={setTaskNav} />
                        </Col>
                    </Row>
                </Col>
                <Col lg={9} className="mt-3 flex-column d-flex justify-content-center align-items-center h-100 tasks-right-col">
                    <Row className="w-50">
                        <Col className="task-list-container">
                        <TaskList selectedDate={selectedDate} taskNav={taskNav} />
                        </Col>
                    </Row>
                    <AddTask />
                </Col>
            </Row> 
        </div>
    );
}

export { Tasks };