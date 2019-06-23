import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Helmet } from 'react-helmet';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import logo from '@/img/logo.png';
import { LoginComponent, RegisterComponent } from '@/Home';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#740403',
        height: '100vh',
        background: `url(https://source.unsplash.com/1K5FKIyKVxQ/1366x768/)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    logo: {
        width: 300,
    },
    row: {
        textAlign: 'center',
    },
    button: {
        margin: theme.spacing(1, 0.5),
    },
    paper: {
        margin: theme.spacing(0, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    paperRoot: {
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
    },
    credit: {
        bottom: 0,
        left: 5,
        position: 'absolute',
        color: 'white',
    },
    disclaimer: {
        marginTop: theme.spacing(2),
    },
}));

const Home = () => {
    const [page, setPage] = useState('home');

    const classes = useStyles();

    const handleClick = location => {
        setPage(location);
    };

    let CustomComponent;

    if (page === 'login') {
        CustomComponent = <LoginComponent handleClick={handleClick} />;
    } else if (page === 'register') {
        CustomComponent = <RegisterComponent handleClick={handleClick} />;
    } else {
        CustomComponent = (
            <React.Fragment>
                <Helmet>
                    <title>Woodpecker</title>
                </Helmet>
                <Grid item xs={9} className={classes.row}>
                    <img src={logo} className={classes.logo} />
                </Grid>
                <Grid item xs={9} className={classes.row}>
                    <Typography variant="body1" align="center">
                        Woodpecker is a Productivity Application that helps you
                        organize your tasks and notes in one place. No need to
                        switch between mutliple applications to manage your
                        work, Woodpecker’s got your back.
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        component="p"
                        align="center"
                        color="primary"
                        className={classes.disclaimer}
                    >
                        **This application is functional, yet still under
                        development**
                    </Typography>
                </Grid>
                <Grid item xs={9} className={classes.row}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => handleClick('login')}
                    >
                        LOGIN
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => handleClick('register')}
                    >
                        REGISTER
                    </Button>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <Grid container className={classes.root}>
            <Grid item xs={false} sm={4} md={6}>
                <Typography variant="caption" className={classes.credit}>
                    Image courtesy of Unsplash
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sm={8}
                md={6}
                component={Paper}
                classes={{ root: classes.paperRoot }}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                        spacing={2}
                    >
                        {CustomComponent}
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
};

export { Home };
