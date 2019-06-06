import React, {useEffect} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from '@material-ui/core/Link';

import { useLogin, authenticationService } from '@/Services';


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
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

const LoginComponent = (props) => {

    const login = useLogin();

    useEffect(() => {
        if (authenticationService.currentUserValue) {
            props.history.push('/app/tasks');
        }
    });

    const { classes } = props;

    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Login
               </Typography>
               <Formik initialValues={{
                       email: '',
                       password: ''
                   }} validationSchema={Yup.object().shape({
                       email: Yup.string().email('Invalid email address').required('Email is required').max(40, 'Email is too long'),
                       password: Yup.string().required('Password is required').max(100, 'Password is too long').min(6, 'Password too short'),
                   })} onSubmit={({
                       email,
                       password
                   }, {setStatus, setSubmitting}) => {
                       setStatus();
                       login(email, password)
                       .then(
                           () => {
                               const { from } = props.location.state || { from: { pathname: "/app/tasks" } };
                               props.history.push(from);
                           },
                           error => {
                               setSubmitting(false);
                               setStatus(error);
                           }
                       );
                   }}>
                   {
                       ({
                           handleSubmit,
                           handleChange,
                           values,
                           touched,
                           errors
                       }) => (
                           <form onSubmit={handleSubmit} className={classes.form}>
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
                                   type="password"/>
                               <Button type="submit" fullWidth={true} variant="contained" color="primary" className={classes.submit}>
                                   Login
                               </Button>
                           </form>
                       )
                   }
               </Formik>

               <Typography className={classes.typography}>
                   <Link href="/register" className={classes.link}>
                       Create an account
                   </Link>
               </Typography>
            </Paper>
        </main>
    )
}

LoginComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

const Login = withStyles(styles)(LoginComponent)

export { Login }
