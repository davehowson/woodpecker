import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { authenticationService } from '@/Services';

import '@/Auth/Auth.css';


const Register = (props) => {

    useEffect(() => {
        if (authenticationService.currentUserValue) {
            props.history.push('/app');
        }
    })

    return( 
        <Container className="auth-container">
            <Helmet>
                <style>{'body { background: #870000; background: -webkit-linear-gradient(to left, #190A05, #870000); background: linear-gradient(to left, #190A05, #870000);}'}</style>
            </Helmet>
            <Row className="h-100">
                <Col className="d-flex align-items-center text-white">
                    <div className="w-75">
                        <h2 className="mb-3">Register</h2>
                        <Formik
                            initialValues={{
                                name: '',
                                email: '',
                                password: '',
                                passwordConfirm: ''
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().required('Name is required').max(40,'Too Long!'),
                                email: Yup.string().email('Invalid email address').required('Email is required').max(40, 'Email address too long'),
                                password: Yup.string().required('Password is Required').max(100, 'Password too long'),
                                passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match')
                            })}
                            onSubmit={({ name, email, password }, { setStatus, setSubmitting }) => {
                                setStatus();
                                authenticationService.register(name, email, password)
                                .then(
                                    user => {
                                        const { from } = props.location.state || { from: { pathname: "/app" } };
                                        props.history.push(from);
                                    },
                                    error => {
                                        setSubmitting(false);
                                        setStatus(error);
                                    }
                                );
                            }}
                            validateOnChange={false}
                            validateOnBlur={false}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                values,
                                touched,
                                isValid,
                                errors,
                            }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="name"
                                            placeholder="Enter name"
                                            value={values.name}
                                            onChange={handleChange}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control 
                                            type="email"
                                            name="email"
                                            placeholder="Enter email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password" 
                                            name="password"
                                            placeholder="Password"
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={!!errors.password}    
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPasswordConfirm">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password" 
                                            name="passwordConfirm"
                                            placeholder="Re-enter Password"
                                            value={values.passwordConfirm}
                                            onChange={handleChange}
                                            isInvalid={!!errors.passwordConfirm}    
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.passwordConfirm}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button variant="light" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        <Link to="/login">
                            <Button variant="link" type="submit" className="text-white pl-0 mt-3">
                                Already have an account?
                            </Button>
                        </Link>
                   </div>
                </Col>
                <Col>
                    
                </Col>
            </Row>
        </Container>
    )
}

export { Register }