import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import logo from '@/img/logo.png';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { history } from '@/Utilities';

import { useRegister, authenticationService } from '@/Services';

const useStyles = makeStyles(theme => ({
    logo: {
        width: 200,
        cursor: 'pointer',
    },
    row: {
        textAlign: 'center',
    },
    button: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const RegisterComponent = props => {
    const register = useRegister();

    useEffect(() => {
        if (authenticationService.currentUserValue) {
            history.push('/app/tasks');
        }
    }, []);

    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid item xs={9} className={classes.row}>
                <img
                    src={logo}
                    className={classes.logo}
                    onClick={() => props.handleClick('home')}
                />
            </Grid>
            <Grid item xs={9} className={classes.row}>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        passwordConfirm: '',
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string()
                            .required('Name is required')
                            .max(40, 'Too Long!'),
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Email is required')
                            .max(40, 'Email address too long'),
                        password: Yup.string()
                            .required('Password is Required')
                            .max(100, 'Password too long')
                            .min(
                                6,
                                'Password should be at least 6 characters long'
                            ),
                        passwordConfirm: Yup.string().oneOf(
                            [Yup.ref('password'), null],
                            'Passwords do not match'
                        ),
                    })}
                    onSubmit={(
                        { name, email, password },
                        { setStatus, setSubmitting }
                    ) => {
                        setStatus();
                        register(name, email, password).then(
                            user => {
                                const { from } = history.location.state || {
                                    from: { pathname: '/app/tasks' },
                                };
                                history.push(from);
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
                                variant="outlined"
                                margin="normal"
                                required={true}
                                helperText={touched.name ? errors.name : ''}
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
                                variant="outlined"
                                margin="normal"
                                required={true}
                                helperText={touched.email ? errors.email : ''}
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
                                variant="outlined"
                                margin="normal"
                                required={true}
                                helperText={
                                    touched.password ? errors.password : ''
                                }
                                error={
                                    touched.password && Boolean(errors.password)
                                }
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
                                variant="outlined"
                                margin="normal"
                                required={true}
                                helperText={
                                    touched.passwordConfirm
                                        ? errors.passwordConfirm
                                        : ''
                                }
                                error={
                                    touched.passwordConfirm &&
                                    Boolean(errors.passwordConfirm)
                                }
                                value={values.passwordConfirm}
                                onChange={handleChange}
                                type="password"
                            />

                            <Button
                                type="submit"
                                fullWidth={true}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                Register
                            </Button>
                        </form>
                    )}
                </Formik>
            </Grid>
            <Grid item xs={9}>
                <Typography>
                    <Link onClick={() => props.handleClick('login')} href="#">
                        Already have an account?
                    </Link>
                </Typography>
            </Grid>
        </React.Fragment>
    );
};

export { RegisterComponent };
