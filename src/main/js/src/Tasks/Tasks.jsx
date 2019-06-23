import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Scrollbars } from 'react-custom-scrollbars';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { useGetTasks } from '@/Services';
import { AddTask, TaskList } from '@/Tasks';

const useStyles = makeStyles(theme => ({
    taskRow: {
        padding: theme.spacing(2, 2, 0),

        height: '80vh !important',
        overflow: 'auto',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightMedium,
    },
    divider: {
        width: '95%',
        margin: theme.spacing(1, 0, 0),
        boxShadow:
            '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
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
    fab: {
        margin: theme.spacing(1),
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    },
}));

const Tasks = props => {
    const [taskForm, setTaskForm] = useState(false);
    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(true);
    const getTasks = useGetTasks();

    useEffect(() => {
        getTasks(props.category, props.tasksScope).then(tasks => {
            setTasks(tasks);
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

    const titleToUpper = () => {
        if (typeof props.tasksScope !== 'string') return '';
        return (
            props.tasksScope.charAt(0).toUpperCase() + props.tasksScope.slice(1)
        );
    };

    const taskCount = () => {
        if (tasks !== undefined || tasks != null) return tasks.length;
        return 0;
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
                                <Grid item xs={10}>
                                    <Typography
                                        className={classes.heading}
                                        component="h2"
                                    >
                                        {titleToUpper()} ({taskCount()})
                                    </Typography>
                                    <Divider className={classes.divider} />
                                </Grid>
                                <Grid item xs={12} lg={10}>
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
            <Fab
                color="primary"
                aria-label="Add"
                className={classes.fab}
                onClick={handleAddTask}
            >
                {taskForm ? <ChevronLeftIcon /> : <AddIcon />}
            </Fab>
        </React.Fragment>
    );
};

export { Tasks };
