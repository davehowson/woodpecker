import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

import { taskService } from '@/Services';

import '@/Tasks/AddTask.css';

const AddTask = (props) => {

    const [modalStatus, setModalStatus] = useState(false);

    const handleModalClose = () => {
        setModalStatus(false);
    }

    const handleModalOpen = () => {
        setModalStatus(true);
    }

    return (
        <>
            <Row>
                <Col className="text-left mt-4">
                    <Button variant="primary" className="btn-add" onClick={handleModalOpen}>
                        <FontAwesomeIcon icon="plus" /> Add Task
                    </Button>
                </Col>
            </Row>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered show={modalStatus} onHide={handleModalClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="mx-4">
                            <Formik
                                initialValues={{
                                    description: '',
                                    date: undefined,
                                    time: null,
                                    tags: []
                                }}
                                validationSchema={Yup.object().shape({
                                    description: Yup.string().max(100, 'Description is too long').required('Description is required'),
                                    date: Yup.date()
                                })}
                                onSubmit={({ description, date, time, tags }, { setStatus, setSubmitting }) => {
                                    setStatus();
                                    tags = tags.filter(e => e);
                                    if (!(date == null || date == "" || date == undefined)) {
                                        date = moment(date).format("YYYY-MM-DD");
                                    } else {
                                        date = null;
                                    }

                                    taskService.create(description, date, time, tags)
                                    .then(function(response){
                                        handleModalClose();
                                    })
                                }}
                            >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                isValid,
                                setFieldValue,
                                errors,
                            }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group as={Row} controlId="taskDescription">
                                        <Form.Label column sm={4}>Description</Form.Label>
                                        <Col sm={8}>
                                            <Form.Control type="text" name="description" onChange={handleChange} isInvalid={!!errors.description} />
                                            <Form.Control.Feedback type="invalid" >
                                                {errors.description}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <hr/>
                                    <h6 className="mb-3 text-muted">Optional Fields</h6>
                                    <Form.Group as={Row} controlId="taskDate" className="mt-2">
                                        <Form.Label column sm={4}>Date</Form.Label>
                                        <Col sm={8} className="add-task-date">
                                            <DayPickerInput 
                                                formatDate={formatDate}
                                                format="LL"
                                                placeholder=""
                                                inputProps={{
                                                    className: 'form-control', 
                                                    name: 'date'
                                                    }} 
                                                onDayChange={day => setFieldValue('date', day)}
                                                dayPickerProps={{
                                                    todayButton: 'Today'
                                                }}
                                                isInvalid={!!errors.date}
                                            />
                                            <Form.Control.Feedback type="invalid" >
                                                {errors.date}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="taskTime" className="mt-2">
                                        <Form.Label column sm={4}>Time</Form.Label>
                                        <Col sm={6}>
                                            <Form.Control name="time" type="time" onChange={handleChange} />
                                        </Col>
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <ul className="tag-checkboxes">
                                                <li>
                                                    <Form.Check type="checkbox" id="chk-work" className="tag-checkbox">
                                                        <Form.Check.Input 
                                                            onChange={(event) => {
                                                                const value = event.target.checked ? 'WORK' : null
                                                                setFieldValue('tags.0', event.target.value)
                                                            }} 
                                                            type="checkbox" 
                                                            name="tags" 
                                                            value="WORK"
                                                        />
                                                        <Form.Check.Label htmlFor="chk-work">
                                                        <span>Work </span><span className='dot' id='dot-work'></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                                <li>
                                                    <Form.Check type="checkbox" id="chk-personal" className="tag-checkbox">
                                                        <Form.Check.Input 
                                                            onChange={(event) => {
                                                                const value = event.target.checked ? 'PERSONAL' : null
                                                                setFieldValue('tags.1', event.target.value)
                                                            }} 
                                                            type="checkbox" 
                                                            name="tags" 
                                                            value="PERSONAL"
                                                        />
                                                        <Form.Check.Label htmlFor="chk-personal">
                                                            <span>Personal </span><span className='dot' id='dot-personal'></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                                <li>
                                                    <Form.Check type="checkbox" id="chk-other" className="tag-checkbox">
                                                        <Form.Check.Input 
                                                            onChange={(event) => {
                                                                const value = event.target.checked ? 'OTHER' : null
                                                                setFieldValue('tags.2', event.target.value)
                                                            }} 
                                                            type="checkbox" 
                                                            name="tags" 
                                                            value="OTHER"
                                                        />
                                                        <Form.Check.Label htmlFor="chk-other">
                                                            <span>Other </span><span className='dot' id='dot-other'></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                                <li>
                                                    <Form.Check type="checkbox" id="chk-important" className="tag-checkbox">
                                                        <Form.Check.Input 
                                                            onChange={(event) => {
                                                                const value = event.target.checked ? 'IMPORTANT' : null
                                                                setFieldValue('tags.3', event.target.value)
                                                            }} 
                                                            type="checkbox" 
                                                            name="tags" 
                                                            value="IMPORTANT"
                                                        />
                                                        <Form.Check.Label htmlFor="chk-important">
                                                            <span>Important </span><span className='dot' id='dot-important'></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>
                                    <Button type="submit">Add Task</Button>
                                </Form>
                            )}
                            </Formik>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export { AddTask };