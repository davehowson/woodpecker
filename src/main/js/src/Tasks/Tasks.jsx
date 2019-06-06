import React, {useEffect, useState} from "react";
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

import { useGetTasks } from '@/Services';
import { AddTask, TaskList } from '@/Tasks';

const useStyles = makeStyles(theme => ({
    card: {
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(2)
    },
    cardContent: {
        width: '100%'
    },
    container: {
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column-reverse'
        }
    },
    taskRow: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            maxHeight: '74vh',
            minHeight: '70vh',
            overflow: 'auto'
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1, 0)
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    category: {
        textAlign: 'right',
        cursor: 'pointer',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center'
        }
    },
    categories: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'row',
        }
    },
    categoryText: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 500,
        textAlign: "right"
    },
    selectedCategory: {
        color: theme.palette.secondary.dark,
        backgroundColor: "#fff !important"
    },
    taskAddRow: {
        textAlign: 'center'
    },
    taskNavContainer: {
        height: '100%',
        flexDirection: 'row',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column-reverse',
        }
    }

}));

const Tasks = () => {
    const [taskForm, setTaskForm] = useState(false);
    const [taskCategory, setTaskCategory] = useState("all");
    const [tasksToday, setTasksToday] = useState(null);
    const [tasksUpcoming, setTasksUpcoming] = useState(null);
    const [tasksOverdue, setTasksOverdue] = useState(null);
    const [tasksCompleted, setTasksCompleted] = useState(null);
    const [loading, setLoading] = useState(true);
    const getTasks = useGetTasks();


    const taskCategories = ["All", "Work", "Personal", "Other"];

    useEffect(() => {
        getTasks(taskCategory).then(tasks => {
            setTasksToday(tasks.today);
            setTasksUpcoming(tasks.upcoming);
            setTasksOverdue(tasks.overdue);
            setTasksCompleted(tasks.completed);
            setTimeout(function() {
				setLoading(false)
			}, 500)
        });
    }, [taskCategory, taskForm]);

    const classes = useStyles();

    const taskFormStatusChanger = () => {
        setTaskForm(!taskForm);
    };

    const handleCategory = (category) => {
        setTaskCategory(category);
    };

    const handleAddTask = () => {
        taskFormStatusChanger(true)
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Woodpecker - Tasks</title>
            </Helmet>
            <Container>
                <Card className={classes.card} >
                    <CardContent className={classes.cardContent}>
                        {taskForm ? (
                            <AddTask taskFormStatusChanger={taskFormStatusChanger}/>
                        ) : (
                            <React.Fragment>
                                {loading ? (
                                    <Grid container justify="center" alignItems="center">
                                        <Grid item>
                                            <CircularProgress className={classes.progress} />
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Grid container  className={classes.container}>
                                        <Grid item md={12} lg={9} className={classes.taskRow}>
                                            <TaskList tasks={tasksToday} taskNav="today" expanded={true}/>
                                            <TaskList tasks={tasksUpcoming} taskNav="upcoming" expanded={true}/>
                                            <TaskList tasks={tasksOverdue} taskNav="overdue" expanded={false}/>
                                            <TaskList tasks={tasksCompleted} taskNav="completed" expanded={false}/>
                                        </Grid>
                                        <Grid item md={12} lg={3}>
                                            <Grid container justify="flex-end" alignItems="center" className={classes.taskNavContainer}>
                                                <Grid item xs={12} >
                                                    <List className={classes.categories} component="nav">
                                                        {taskCategories.map(item =>
                                                            <ListItem
                                                                button
                                                                className={classes.category}
                                                                selected={taskCategory === item.toLowerCase()}
                                                                onClick={() => handleCategory(item.toLowerCase())}
                                                                key={item}
                                                                classes={{
                                                                    selected: classes.selectedCategory
                                                                }}
                                                            >
                                                                <ListItemText classes={{primary: classes.categoryText}} primary={item}/>
                                                            </ListItem>
                                                        )}
                                                    </List>
                                                </Grid>
                                                <Grid item xs={12}  className={classes.taskAddRow}>
                                                    <Button variant="contained" color="primary" className={classes.addButton} onClick={() => handleAddTask()}>Add New Task</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )}
                            </React.Fragment>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </React.Fragment>
    );
}

export { Tasks };
