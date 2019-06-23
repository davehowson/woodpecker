import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import PanoramaFishEye from '@material-ui/icons/PanoramaFishEye';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Tooltip from '@material-ui/core/Tooltip';

import { useCompleteTask } from '@/Services';

const useStyles = makeStyles(theme => ({
    tableRow: {
        '& td': {
            '& span': {
                verticalAlign: 'middle',
            },
        },
    },
    tableCell: {
        borderBottom: 'none',
        [theme.breakpoints.down('sm')]: {
            fontSize: theme.typography.pxToRem(12),
        },
    },
    dot: {
        height: '15px',
        width: '15px',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: theme.spacing(2),
    },
    taskTime: {
        color: '#6b6b6b',
        fontSize: theme.typography.pxToRem(13),
    },
    dotwork: {
        backgroundColor: '#fff171',
    },
    dotpersonal: {
        backgroundColor: '#a7ff71',
    },
    dotother: {
        backgroundColor: '#a3a3a3',
    },
    taskDesc: {
        transition: 'color 1s',
    },
}));

const TaskRow = props => {
    const [isChecked, setIsChecked] = useState(props.task.complete);
    const completeTask = useCompleteTask();

    const classes = useStyles();

    const handleCheckbox = e => {
        setIsChecked(e.target.checked);
        let data = { taskId: props.task.id, status: !isChecked };

        completeTask(data);
    };

    const capitalize = s => {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    const handleTag = () => {
        if (props.task.tag != null) {
            return (
                <Tooltip title={capitalize(props.task.tag)}>
                    <span
                        className={classNames(
                            classes.dot,
                            classes['dot' + props.task.tag.toLowerCase()]
                        )}
                    />
                </Tooltip>
            );
        }
        return '';
    };

    const handleTime = () => {
        let date = '';
        if (props.task.date != null) {
            date = moment(props.task.date).calendar(null, {
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                nextWeek: 'dddd',
                lastDay: '[Yesterday]',
                lastWeek: '[Last] dddd',
                sameElse: 'MMM Do',
            });
        }
        if (props.task.time != null) {
            date = date.concat(
                moment(props.task.time, 'HH:mm:ss').format(' - hh:mm a')
            );
        }

        return date;
    };

    return (
        <TableRow className={classes.tableRow} key={props.task.id}>
            <TableCell className={classes.tableCell} padding="checkbox">
                <Checkbox
                    checked={isChecked}
                    onChange={handleCheckbox}
                    color="primary"
                    icon={<PanoramaFishEye color="disabled" />}
                    checkedIcon={<CheckCircle />}
                />
            </TableCell>
            <TableCell className={classes.tableCell}>
                <Typography className={classNames(classes.taskDesc)}>
                    {props.task.description}
                </Typography>
                <Typography className={classNames(classes.taskTime)}>
                    {handleTag(props.task.tags)}
                    {handleTime()}
                </Typography>
            </TableCell>
        </TableRow>
    );
};

export { TaskRow };
