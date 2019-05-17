import React, { useEffect } from 'react';
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

const Login = (props) => {

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
                        <h2 className="mb-3">Login</h2>
                        <Formik
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email('Invalid email address').required('Email is required').max(40, 'Email is too long'),
                                password: Yup.string().required('Password is required').max(100, 'Password is too long')
                            })}
                            onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
                                setStatus();
                                authenticationService.login(email, password)
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
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email Address</Form.Label>
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
                                    
                                    <Button variant="light" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        <Link to="/register">
                            <Button variant="link" type="submit" className="text-white pl-0 mt-3">
                                Create an account
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

export { Login }