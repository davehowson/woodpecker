import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/Inbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Divider from '@material-ui/core/Divider';

import { TaskRow } from '@/Tasks';

const useStyles = makeStyles(theme => ({
    noTasks: {
        textAlign: 'center',
        marginTop: theme.spacing(3),
        color: '#bbbbbb',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightMedium,
    },
    expansionPanelRoot: {
        '&:before': {
            display: 'none',
        },
    },
    expansionPanelExpanded: {
        '& $expansionPanelSummaryRoot': {
            minHeight: 30,
        },
    },
    expansionPanelSummaryContent: {
        display: 'block',
        color: theme.palette.secondary.dark,
    },
    expansionPanelSummaryRoot: {
        minHeight: theme.spacing(8),
    },
    expansionPanelSummaryExpanded: {
        '& $expansionPanelSummaryContent': {
            minHeight: 20,
            margin: theme.spacing(1, 0),
        },
    },
    expansionPanelDetails: {
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1, 0),
        },
    },
}));

const TaskList = props => {
    const [expanded, setExpanded] = useState(props.expanded);

    const classes = useStyles();

    const handleExpansion = () => {
        setExpanded(!expanded);
    };

    const titleToUpper = () => {
        const taskNav = props.taskNav;
        if (typeof taskNav !== 'string') return '';
        return taskNav.charAt(0).toUpperCase() + taskNav.slice(1);
    };

    const taskCount = () => {
        if (props.tasks != null) return props.tasks.length;
        return 0;
    };

    return (
        <React.Fragment>
            <ExpansionPanel
                expanded={expanded}
                onChange={handleExpansion}
                elevation={0}
                classes={{
                    root: classes.expansionPanelRoot,
                    expanded: classes.expansionPanelExpanded,
                }}
            >
                <ExpansionPanelSummary
                    classes={{
                        root: classes.expansionPanelSummaryRoot,
                        content: classes.expansionPanelSummaryContent,
                        expanded: classes.expansionPanelSummaryExpanded,
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="today-tasks-panel"
                    id="today-header"
                >
                    <Typography className={classes.heading} component="h2">
                        {titleToUpper()} ({taskCount()})
                    </Typography>
                    <Divider />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails
                    className={classes.expansionPanelDetails}
                >
                    {props.tasks && props.tasks.length > 0 ? (
                        <Table className={classes.table}>
                            <TableBody>
                                {props.tasks.map(task => (
                                    <TaskRow task={task} key={task.id} />
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <Grid
                            container={true}
                            alignItems="center"
                            justify="center"
                        >
                            <Grid item={true} className={classes.noTasks}>
                                <InboxIcon />
                                <Typography variant="subtitle1">
                                    No Tasks
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </React.Fragment>
    );
};

export { TaskList };
