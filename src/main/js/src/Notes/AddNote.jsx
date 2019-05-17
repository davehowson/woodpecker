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

import { noteService } from '@/Services';

import '@/Notes/AddNote.css';

const AddNote = (props) => {

    const handleModalClose = () => {
        props.setAddModalStatus(false);
    }

    const handleModalOpen = () => {
        props.setAddModalStatus(true);
    }

    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered show={props.addModalStatus} 
            onHide={handleModalClose}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Add Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="mx-4">
                        <Formik
                            initialValues={{
                                title: '',
                                description: '',
                                tags: []
                            }}
                            validationSchema={Yup.object().shape({
                                title: Yup.string().max(35, 'Title is too long').required('Title is required'),
                                description: Yup.string().max(1000, 'Description is too long').required('Description is required')
                            })}
                            onSubmit={({ title, description, tags }, { setStatus, setSubmitting }) => {
                                setStatus();
                                tags = tags.filter(e => e);

                                noteService.create(title, description, tags)
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
                                <Form.Group as={Row} controlId="noteTitle">
                                    <Form.Label column sm={4}>Title</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control type="text" name="title" onChange={handleChange} isInvalid={!!errors.title} />
                                        <Form.Control.Feedback type="invalid" >
                                            {errors.title}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="noteDescription">
                                    <Form.Label column sm={4}>Description</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control 
                                            name="description" 
                                            as="textarea" 
                                            rows="5" 
                                            value={values.description} 
                                            onChange={handleChange} 
                                            isInvalid={!!errors.description}
                                        />
                                        <Form.Control.Feedback type="invalid" >
                                            {errors.description}
                                        </Form.Control.Feedback>
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
                                <Button type="submit" className="float-right">Add Note</Button>
                            </Form>
                        )}
                        </Formik>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export { AddNote };