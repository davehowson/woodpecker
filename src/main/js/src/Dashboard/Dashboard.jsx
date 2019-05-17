import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { Helmet } from 'react-helmet';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { authenticationService, taskService } from '@/Services';
import { Task } from '@/Tasks';
import { NotesCarousel } from '@/Dashboard';
 
import '@/Dashboard/Dashboard.css';

const Dashboard = () => {
    const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        taskService.getTasksUpcoming().then(tasks => setTasks(tasks));
    }, []);
    
    return (
        <div className="container-fluid h-100">
            <Helmet>
                <title>Woodpecker - Dashboard</title>
            </Helmet>
            <Row className="h-100 mx-3">
                <Col lg={6} className="mt-1 py-3">
                    <Card className="dash-card shadow-sm border-light h-100">
                        <Card.Body className="d-flex flex-column align-items-center">
                            <Card.Title className="mt-2">Upcoming Tasks</Card.Title>
                            <hr className="w-75"/>
                            <div className="dash-task-container h-75 d-flex flex-column justify-content-center d-flex align-items-center">
                                {tasks &&
                                    <Table className="tasks-table" borderless size="sm">
                                        <tbody>
                                            {tasks.slice(0,10).map(task =>
                                            <Task page={"dashboard"} task={task} key={task.id} />
                                            )}
                                        </tbody>
                                    </Table>
                                }
                            </div>
                            <Link to="/app/tasks" className="mt-auto mb-3 w-25 btn btn-link">More Tasks</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6} className="mt-1 py-3">
                    <Card className="dash-card shadow-sm border-light h-100">
                        <Card.Body className="d-flex flex-column align-items-center">
                            <Card.Title className="mt-2">Important Notes</Card.Title>
                            <hr className="w-75"/>
                            <NotesCarousel/>
                            <Link to="/app/notes" className="mt-auto mb-3 w-25 btn btn-link">More Notes</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
        
    );
}

export { Dashboard };