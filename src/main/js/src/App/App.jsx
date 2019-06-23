import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Tasks } from '@/Tasks';
import { Notes } from '@/Notes';
import { Bookmarks } from '@/Bookmarks';
import { Header, Sidebar } from '@/Layouts';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        alignItems: 'center',
        marginTop: 67,
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0),
        },
    },
}));

const App = props => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [category, setCategory] = useState('all');
    const [tasksScope, setTasksScope] = useState('today');

    const drawerWidth = 240;

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const classes = useStyles();

    return (
        <Route
            render={() => (
                <div className={classes.root}>
                    <Header
                        drawerOpen={drawerOpen}
                        handleDrawerToggle={handleDrawerToggle}
                        drawerWidth={drawerWidth}
                    />
                    <Sidebar
                        drawerOpen={drawerOpen}
                        handleDrawerToggle={handleDrawerToggle}
                        drawerWidth={drawerWidth}
                        category={category}
                        setCategory={setCategory}
                        tasksScope={tasksScope}
                        setTasksScope={setTasksScope}
                    />
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Switch>
                            <Route
                                exact
                                path={'/app'}
                                render={() => <Redirect to="/app/tasks" />}
                            />
                            <Route
                                path={'/app/tasks'}
                                render={props => (
                                    <Tasks
                                        {...props}
                                        category={category}
                                        tasksScope={tasksScope}
                                    />
                                )}
                            />
                            <Route path={'/app/notes'} render={props => (<Notes {...props} category={category}/>)} />
                            <Route
                                path={'/app/bookmarks'}
                                component={Bookmarks}
                            />
                        </Switch>
                    </main>
                </div>
            )}
        />
    );
};

export { App };
