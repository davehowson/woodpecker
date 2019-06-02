import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Divider from '@material-ui/core/Divider';


import { TaskRow } from '@/Tasks';
import { taskService } from '@/Services';


const useStyles = makeStyles(theme => ({
    tasksText: {
        marginTop: theme.spacing(3),
        color: "#bbbbbb"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightMedium,
    },
    expansionPanelRoot: {
        "&:before": {
            display: "none"
        }
    },
    expansionPanelExpanded: {
        "& $expansionPanelSummaryRoot" : {
            minHeight: 30
        },
    },
    expansionPanelSummaryContent: {
        display: "block",
        color: theme.palette.secondary.dark,
    },
    expansionPanelSummaryRoot: {
        minHeight: theme.spacing(8)
    },
    expansionPanelSummaryExpanded: {
        "& $expansionPanelSummaryContent" : {
            minHeight: 20,
            margin: theme.spacing(1, 0)
        },

    }
}));

const TaskList = (props) => {
    const [tasks, setTasks] = useState(null);
    const [expanded, setExpanded] = useState(props.expanded)

    const classes = useStyles();

    useEffect(() => {
        let didCancel = false;

        if (!didCancel)
        {
            taskService.getTasks(props.taskNav, moment().format('YYYY-MM-DD')).then(tasks => setTasks(tasks));
        }
        return () => {
            didCancel = true;
        }
    }, [props.taskNav, props.taskModalStatus]);

    const handleExpansion = () => {
        setExpanded(!expanded);
    }

    const titleToUpper = () => {
        const taskNav = props.taskNav;
        if (typeof taskNav !== 'string') return '';
        return taskNav.charAt(0).toUpperCase() + taskNav.slice(1);
    }

    const taskCount = () => {
        if (tasks != null) return tasks.length;
        return 0
    }

    return (
        <React.Fragment>
            <ExpansionPanel
                expanded={expanded}
                onChange={handleExpansion}
                elevation={0}
                classes={{
                    root: classes.expansionPanelRoot,
                    expanded: classes.expansionPanelExpanded
                }}
            >
                <ExpansionPanelSummary
                    classes={{
                        root: classes.expansionPanelSummaryRoot,
                        content: classes.expansionPanelSummaryContent,
                        expanded: classes.expansionPanelSummaryExpanded
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="today-tasks-panel"
                    id="today-header"
                >
                    <Typography className={classes.heading} component="h2">{titleToUpper()} ({taskCount()})</Typography>
                    <Divider/>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                    {tasks && tasks.length > 0 ?
                        (<Table className={classes.table}>
                            <TableBody>
                                {tasks.map(task =>
                                   <TaskRow task={task} key={task.id} taskNav={props.taskNav} />
                                )}
                            </TableBody>
                        </Table>) : (
                            <Grid container={true} alignItems="center" justify="center">
                                <Grid item={true}>
                                    <Typography variant="h6" className={classes.tasksText}>
                                        - No Tasks -
                                    </Typography>
                                </Grid>
                            </Grid>
                        )
                    }
                </ExpansionPanelDetails>
            </ExpansionPanel>

        </React.Fragment>
    )
}

export { TaskList };
