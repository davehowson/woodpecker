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

import { useLogin, authenticationService } from '@/Services';

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
    disclaimer: {
        marginTop: theme.spacing(2),
    },
}));

const LoginComponent = props => {
    const login = useLogin();

    useEffect(() => {
        if (authenticationService.currentUserValue) {
            history.push('/app/tasks');
        }
    });

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
                        email: '',
                        password: '',
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Email is required')
                            .max(40, 'Email is too long'),
                        password: Yup.string()
                            .required('Password is required')
                            .max(100, 'Password is too long')
                            .min(6, 'Password too short'),
                    })}
                    onSubmit={(
                        { email, password },
                        { setStatus, setSubmitting }
                    ) => {
                        setStatus();
                        login(email, password).then(
                            () => {
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
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors,
                    }) => (
                        <form onSubmit={handleSubmit} className={classes.form}>
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
                            <Button
                                type="submit"
                                fullWidth={true}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                Login
                            </Button>
                        </form>
                    )}
                </Formik>
            </Grid>
            <Grid item xs={9}>
                <Typography>
                    <Link
                        onClick={() => props.handleClick('register')}
                        href="#"
                    >
                        Don't have an account?
                    </Link>
                </Typography>
                <Typography
                    variant="subtitle2"
                    component="p"
                    align="center"
                    color="secondary"
                    className={classes.disclaimer}
                >
                    Use <em>john@example.com</em> : <em>password</em> for
                    testing purposes
                </Typography>
            </Grid>
        </React.Fragment>
    );
};

export { LoginComponent };
