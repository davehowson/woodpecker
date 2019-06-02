import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from '@material-ui/core/Link';

import { authenticationService } from '@/Services';

import '@/Auth/Auth.css';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(6))]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        marginTop: theme.spacing(15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        marginTop: theme.spacing(3)
    },
    typography: {
        marginTop: theme.spacing(3)
    },
    link: {
        margin: theme.spacing(3)
    }
});


const RegisterComponent = (props) => {

    useEffect(() => {
        if (authenticationService.currentUserValue) {
            props.history.push('/app/tasks');
        }
    });

    const { classes } = props;

    return(
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Register
               </Typography>
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
                       <form onSubmit={handleSubmit}>
                           <TextField
                                  id="name"
                                  className={classes.textField}
                                  name="name"
                                  label="Name"
                                  fullWidth={true}
                                  margin="dense"
                                  helperText={touched.name ? errors.name : ""}
                                  error={touched.name && Boolean(errors.name)}
                                  value={values.name}
                                  onChange={handleChange}
                            />

                            <TextField
                                  id="email"
                                  className={classes.textField}
                                  name="email"
                                  label="Email Address"
                                  fullWidth={true}
                                  margin="dense"
                                  helperText={touched.email ? errors.email : ""}
                                  error={touched.email && Boolean(errors.email)}
                                  value={values.email}
                                  onChange={handleChange}
                            />

                            <TextField
                                   id="password"
                                   className={classes.textField}
                                   name="password"
                                   label="Password"
                                   fullWidth={true}
                                   margin="dense"
                                   helperText={touched.password ? errors.password : ""}
                                   error={touched.password && Boolean(errors.password)}
                                   value={values.password}
                                   onChange={handleChange}
                                   type="password"
                            />

                            <TextField
                                   id="passwordConfirm"
                                   className={classes.textField}
                                   name="passwordConfirm"
                                   label="Confirm Password"
                                   fullWidth={true}
                                   margin="dense"
                                   helperText={touched.passwordConfirm ? errors.passwordConfirm : ""}
                                   error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
                                   value={values.passwordConfirm}
                                   onChange={handleChange}
                                   type="password"
                            />

                           <Button type="submit" fullWidth={true} variant="contained" color="primary" className={classes.submit}>
                                Register
                            </Button>
                       </form>
                   )}
               </Formik>
               <Typography className={classes.typography}>
                   <Link href="/login" className={classes.link}>
                       Already have an account?
                   </Link>
               </Typography>
           </Paper>
       </main>
    )
}

RegisterComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

const Register = withStyles(styles)(RegisterComponent);

export { Register }
