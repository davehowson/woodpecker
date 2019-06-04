import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { makeStyles } from '@material-ui/styles';
import { Tasks } from '@/Tasks';
import { Notes } from '@/Notes';
import { Bookmarks } from '@/Bookmarks';
import { Header, Sidebar } from '@/Layouts'
import { fontAwesomeLibrary } from '@/Utilities';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    }
}))

const App= (props) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    fontAwesomeLibrary();

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen)
    }
    const classes = useStyles();

    return (
            <Route
                render={({location}) =>(
                    <div className={classes.root}>
                        <Helmet>
                                {/*<style type="text/css">{`
                                    html {
                                        overflow-y: scroll;
                                    }
                                `}</style>*/}
                        </Helmet>
                        <Header drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle}/>
                        <Sidebar drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle}/>
                        <main className={classes.content}>
                            <div className={classes.appBarSpacer} />
                            <Switch>
                                <Route exact path={'/app'} render={() => (<Redirect to="/app/tasks" />)} />
                                <Route path={'/app/tasks'} component={Tasks} />
                                <Route path={'/app/notes'} component={Notes} />
                                <Route path={'/app/bookmarks'} component={Bookmarks} />
                            </Switch>
                        </main>
                    </div>
                )}
            />
    );
}

export { App };