import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { TaskList } from '@/Tasks';

const useStyles = makeStyles(theme => ({
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
    addButton: {
        marginTop: theme.spacing(10)
    }
}))

const AllTasks = (props) => {

    const [taskCategory, setTaskCategory] = useState("all");
    const classes = useStyles();
    const taskCategories = ["All", "Work", "Important", "Other"];

    const handleCategory = (category) => {
        setTaskCategory(category);
    }

    const handleAddTask = () => {
        props.taskFormStatusChanger(true)
    }

    return (
        <Grid container spacing={3}>
            <Grid item md={9} xs={12} className={classes.taskRow}>
                <TaskList taskNav="today" expanded={true}/>
                <TaskList taskNav="upcoming" expanded={true}/>
                <TaskList taskNav="overdue" expanded={false}/>
                <TaskList taskNav="completed" expanded={false}/>
            </Grid>
            <Grid item md={3} xs={12}>
                <Grid container justify="flex-end">
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
    )
}

export { AllTasks }
