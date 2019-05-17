import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Badge from "react-bootstrap/Badge";

import { noteService } from "@/Services";

const Note = props => {
    const [note, setNote] = useState(null);
    const [readOnly, setReadOnly] = useState(true);
    const [editButton, setEditButton] = useState(false);

    useEffect(() => {
        if (props.noteId != null)
            noteService.getNote(props.noteId).then(note => setNote(note));

            return () => {
                setReadOnly(true);
                setEditButton(false);
            }
    }, [props.noteId]);

    const handleClose = () => {
        props.setNoteModalStatus(false);
    };


    const handleEditShow = tags => {
        setReadOnly(false)
        setEditButton(true)
    }

    const handleTag = (tags) => {
        let result = [];
        for (const key of Object.keys(tags)) {
            let tag = tags[key].name.toLowerCase();
            result.push(
                <Badge key={key} variant="secondary" className="mr-1" id={"badge-" + tag}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </Badge>
            );
        }
        result.sort()
        return result;
    }

    const handleTextAreaRows = () => {
        if (note.description.length > 200) {
            return 10
        } else {
            return 5
        }
    }

    const handleDelete = () => {
        if (props.noteId != null)
            noteService.deleteNote(props.noteId).then(() => {
                props.setNoteId(null);
                handleClose();
            });
    }

    const popover = (
        <Popover id="popover-basic" title="Confirm Delete" className="text-center">
            <span>Are you sure you want to delete this note?</span><br/>
            <Button variant="link" onClick={handleDelete}>Yes, I am Sure</Button>
        </Popover>
    )

    return (
        <Modal
            show={props.noteModalStatus}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg"
        >
            {note && (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>{note.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                id: note.id,
                                title: note.title,
                                description: note.description,
                                tagNames: note.tags
                            }}
                            enableReinitialize={true}
                            validationSchema={Yup.object().shape({
                                description: Yup.string()
                                    .max(1000, "Description is too long")
                                    .required("Description is required")
                            })}
                            onSubmit={({ id, title, description, tagNames }, { setStatus, setSubmitting }) => {
                                setStatus();
                                var tags = Object.keys(tagNames).map(function(key) {
                                    return tagNames[key].name;
                                });

                                noteService.update(id, title, description, tags)
                                .then(function(response){
                                    handleClose();
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
                                errors
                            }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId="noteDescriptionControl">
                                        <Form.Control 
                                            name="description" 
                                            readOnly={readOnly} 
                                            as="textarea" 
                                            rows={handleTextAreaRows()} 
                                            value={values.description} 
                                            onChange={handleChange} 
                                            isInvalid={!!errors.description}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.description}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-5">
                                        <div className="float-left">
                                            {handleTag(note.tags)}
                                        </div>
                                        <div className="float-right">
                                            <p className="text-muted">
                                                {moment(note.creationDateTime).format(
                                                    "MMM Do, YYYY"
                                                )}
                                            </p>
                                        </div>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="link" disabled={editButton} onClick={handleEditShow}>
                                            Edit Note
                                        </Button>
                                        <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
                                            <Button variant="link">Delete Note</Button>
                                        </OverlayTrigger>
                                    </Form.Group>
                                    <Form.Group className="text-right">
                                         <Button variant="primary" type="submit">
                                            Save Changes
                                        </Button>
                                        <Button variant="secondary" onClick={handleClose} className="ml-2">
                                            Cancel
                                        </Button>
                                    </Form.Group>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </>
            )}
        </Modal>
    );
};

export { Note };
