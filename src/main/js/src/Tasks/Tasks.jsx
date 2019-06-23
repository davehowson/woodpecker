import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Scrollbars } from 'react-custom-scrollbars';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useGetTasks } from '@/Services';
import { AddTask, TaskList } from '@/Tasks';

const useStyles = makeStyles(theme => ({
    card: {
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
    cardContent: {
        width: '100%',
    },
    taskRow: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            maxHeight: '74vh',
            minHeight: '70vh',
            overflow: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1, 0),
        },
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    category: {
        textAlign: 'center',
        cursor: 'pointer',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
        },
    },
    categories: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'row',
        },
    },
    categoryText: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 500,
    },
    selectedCategory: {
        color: theme.palette.secondary.dark,
        backgroundColor: '#fff !important',
    },
    taskAddRow: {
        textAlign: 'center',
    },
    taskNavContainer: {
        height: '100%',
        flexDirection: 'row',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column-reverse',
        },
    },
}));

const Tasks = props => {
    const [taskForm, setTaskForm] = useState(false);
    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(true);
    const getTasks = useGetTasks();

    useEffect(() => {
        getTasks(props.category, props.tasksScope).then(tasks => {
            setTasks(tasks.today);
            setTimeout(function() {
                setLoading(false);
            }, 500);
        });
    }, [props.category, props.tasksScope, taskForm]);

    const classes = useStyles();

    const taskFormStatusChanger = () => {
        setTaskForm(!taskForm);
    };

    const handleAddTask = () => {
        taskFormStatusChanger(true);
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Woodpecker - Tasks</title>
            </Helmet>
            <Container>
                {taskForm ? (
                    <AddTask taskFormStatusChanger={taskFormStatusChanger} />
                ) : (
                    <React.Fragment>
                        {loading ? (
                            <Grid
                                container
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <CircularProgress
                                        className={classes.progress}
                                    />
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid container justify="center">
                                <Grid item md={12} lg={9}>
                                    <Scrollbars className={classes.taskRow}>
                                        <TaskList
                                            tasks={tasks}
                                            taskNav={props.tasksScope}
                                            expanded={true}
                                        />
                                    </Scrollbars>
                                </Grid>
                            </Grid>
                        )}
                    </React.Fragment>
                )}
            </Container>
        </React.Fragment>
    );
};

export { Tasks };
