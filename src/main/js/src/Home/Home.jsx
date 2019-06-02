import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import logo from '@/img/woodpecker-logo.png';

const styles = theme => ({
    main: {
        minHeight: '100vh',
        backgroundColor: '#fff'
    },
    logo: {
        width: 600
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing(12)}px 0 ${theme.spacing(6)}px`
    },
    heroTitle: {
        fontFamily: 'Berkshire Swash, cursive'
    },
    heroButtons: {
        marginTop: theme.spacing(4)
    }
});

const HomeComponent = (props) => {
    const { classes } = props;
    return (<React.Fragment>
        <main className={classes.main}>
            <div className={classes.heroUnit}>
                <div className={classes.heroContent}>
                    <img src={logo} className={classes.logo}/>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph={true}>
                        ReactJS & Spring Based Productivity tool to manage tasks, notes & bookmarks.<br/>
                        <strong>This application is still under development</strong>
                    </Typography>
                    <div className={classes.heroButtons}>
                        <Grid container={true} spacing={1} justify="center">
                            <Grid item={true}>
                                <Button variant="contained" color="primary" component={Link} to="/login">
                                    Login
                                </Button>
                            </Grid>
                            <Grid item={true}>
                                <Button variant="outlined" color="primary" component={Link} to="/register">
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>

        </main>
    </React.Fragment>)
}

const Home = withStyles(styles)(HomeComponent)

export {
    Home
};
