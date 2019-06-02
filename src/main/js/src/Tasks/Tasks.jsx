import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Fab from '@material-ui/core/Fab';

import { AddTask, AllTasks } from '@/Tasks';

const useStyles = makeStyles(theme => ({
    card: {
        minHeight: '80vh'
    },
    fab: {
        position: 'fixed',
        bottom: 20,
        right: 20,
        top: 'auto',
        left: 'auto',
    },
    addIcon: {
        marginRight: theme.spacing(1),
        fontSize: 20,
    },
}))

const Tasks = () => {
    const [taskForm, setTaskForm] = useState(false);
    const classes = useStyles();

    const taskFormStatusChanger = () => {
        setTaskForm(!taskForm);
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Woodpecker - Tasks</title>
            </Helmet>
            <Container>
                <Card className={classes.card}>
                    <CardContent>
                        {taskForm ? (
                            <AddTask taskFormStatusChanger={taskFormStatusChanger}/>
                        ) : (
                            <AllTasks taskFormStatusChanger={taskFormStatusChanger}/>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </React.Fragment>
    );
}

export { Tasks };
