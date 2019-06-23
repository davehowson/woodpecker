import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InboxIcon from '@material-ui/icons/Inbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import { TaskRow } from '@/Tasks';

const useStyles = makeStyles(theme => ({
    noTasks: {
        display: 'flex',
        alignContent: 'center',
        marginTop: theme.spacing(3),
        color: '#bbbbbb',
    },
}));

const TaskList = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
            {props.tasks && props.tasks.length > 0 ? (
                <Table className={classes.table}>
                    <TableBody>
                        {props.tasks.map(task => (
                            <TaskRow task={task} key={task.id} />
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <Grid container={true} alignItems="center" justify="center">
                    <Grid item={true} className={classes.noTasks}>
                        <Typography
                            variant="subtitle1"
                            className={classes.noTasks}
                        >
                            <InboxIcon />
                            <span>&nbsp;&nbsp;No Tasks</span>
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </React.Fragment>
    );
};

export { TaskList };
