import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import logo from '@/img/woodpecker-logo.png';
import bg from '@/img/unsplash.jpg';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
        height: '100vh',
        background: `url(https://source.unsplash.com/lpqgCtnyhjw/1366x768/)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    logo: {
        width: 300
    },
    row: {
        textAlign: 'center'
    },
    button: {
        margin: theme.spacing()
    },
    paper: {
       margin: theme.spacing(0, 4),
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       justifyContent: 'center',
       height: '100%'
   },
   paperRoot: {
       backgroundColor: 'rgba(255, 255, 255, 0.96)'
   }


}));

const Home = () => {
    const classes = useStyles();

    return (
            <Grid container className={classes.root}>
                <Grid item xs={false} sm={4} md={6}/>
                <Grid item xs={12} sm={8} md={6} component={Paper} classes={{root:classes.paperRoot}}  elevation={6} square>
                    <div className={classes.paper}>
                        <Grid container alignItems="center" justify="center" spacing={2}>
                            <Grid item xs={9} className={classes.row}>
                                <img src={logo} className={classes.logo}/>
                            </Grid>
                            <Grid item xs={9} className={classes.row}>
                                <Typography variant="body1" align="center">
                                    Woodpecker is a Productivity Application that helps you organize
                                    your tasks and notes in one place. No need to switch between mutliple
                                    applications to manage your work, Woodpecker’s got your back.
                                </Typography>
                            </Grid>
                            <Grid item xs={9} className={classes.row}>
                                <Button variant="outlined" color="primary" className={classes.button} component={Link} to="/login">
                                    LOGIN
                                </Button>
                                <Button variant="outlined" color="primary" className={classes.button} component={Link} to="/register">
                                    REGISTER
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        )
}

export {
    Home
};
