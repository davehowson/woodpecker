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

import { taskService } from '@/Services';
import { AddTask, TaskList } from '@/Tasks';

const useStyles = makeStyles(theme => ({
    card: {
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(2)
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
    taskRow: {
        [theme.breakpoints.up('md')]: {
            maxHeight: '74vh',
            minHeight: '70vh',
            overflow: 'auto'
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    category: {
        textAlign: 'right',
        cursor: 'pointer',
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
    taskNavContainer: {
        height: '100%'
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


    const taskCategories = ["All", "Work", "Personal", "Other"];

    useEffect(() => {
        taskService.getTasks(taskCategory).then(tasks => {
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
                <Card className={classes.card}>
                    <CardContent>
                        {taskForm ? (
                            <AddTask taskFormStatusChanger={taskFormStatusChanger}/>
                        ) : (
                            <React.Fragment>
                                {loading ? (
                                    <Grid container>
                                        <Grid item>
                                            <CircularProgress className={classes.progress} />
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Grid container spacing={3}>
                                        <Grid item md={9} xs={12} className={classes.taskRow}>
                                            <TaskList tasks={tasksToday} taskNav="today" expanded={true}/>
                                            <TaskList tasks={tasksUpcoming} taskNav="upcoming" expanded={true}/>
                                            <TaskList tasks={tasksOverdue} taskNav="overdue" expanded={false}/>
                                            <TaskList tasks={tasksCompleted} taskNav="completed" expanded={false}/>
                                        </Grid>
                                        <Grid item md={3} xs={12}>
                                            <Grid container justify="flex-end" alignItems="center" className={classes.taskNavContainer}>
                                                <Grid item xs={8}>
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
                                                <Grid item xs={8}>
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
