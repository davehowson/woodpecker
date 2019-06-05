import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import PanoramaFishEye from '@material-ui/icons/PanoramaFishEye';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Tooltip from '@material-ui/core/Tooltip';

import { useCompleteTask } from '@/Services';

const useStyles = makeStyles(theme => ({
    tableRow: {
        "& td": {
            "& span": {
                verticalAlign: "middle"
            }
        }
    },
    tableCell: {
        borderBottom: 'none'
    },
    star: {
        verticalAlign: "middle",
        color: theme.palette.primary.main,
        marginLeft: theme.spacing(1),
        textShadow: "0px 1px 2px rgba(0, 0, 0, 0.33)"
    },
    noStar: {
        verticalAlign: "middle",
        color: "#fff",
        marginLeft: theme.spacing(1),
    },
    dot: {
        height: "15px",
        width: "15px",
        borderRadius: "50%",
        display: "inline-block"
    },
    dotimportant: {
        backgroundColor: "#df021e",
    },
    dotwork: {
        backgroundColor: "#fff171"
    },
    dotpersonal: {
        backgroundColor: "#a7ff71"
    },
    dotother: {
        backgroundColor: "#a3a3a3"
    },
    taskDesc: {
        transition: "color 1s"
    },
    completedDescription: {
        color: '#8f8f8f'
    }
}));

const TaskRow = (props) => {

    const [isChecked, setIsChecked] = useState(props.task.complete);
    const [rowClass, setRowClass] = useState('');
    const completeTask = useCompleteTask();

    const classes = useStyles();

    useEffect(() => {
        if (props.task.complete) {
            setRowClass(classes.completedDescription)
        } else {
            setRowClass('')
        }
    }, []);

    const handleCheckbox = (e) => {
        setIsChecked(e.target.checked)
        if (e.target.checked) {
            setRowClass(classes.completedDescription);
        } else {
            setRowClass('');
        }

        let data = {"taskId": props.task.id, "status": !isChecked};

        completeTask(data);
    };

    const capitalize = (s) => {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    };


    const handleTag = () => {
        if (props.task.tag != null) {
            return (<Tooltip title={capitalize(props.task.tag)}>
                <span className={classNames(classes.dot, classes["dot"+props.task.tag.toLowerCase()])}/>
            </Tooltip>);
        }
        return '';
    }

    const handleTime = () => {
        let date = "";
        if (props.task.date != null) {
            date = moment(props.task.date).format("MMM Do");
        }
        if (props.task.time != null) {
            date = date.concat(moment(props.task.time, "HH:mm:ss").format(" hh:mm a"))
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
                 icon={<PanoramaFishEye color="disabled"/>}
                 checkedIcon={<CheckCircle/>}
               />
            </TableCell>
            <TableCell className={classes.tableCell}><span className={classNames(classes.taskDesc, rowClass)}>{props.task.description}</span></TableCell>
            <TableCell className={classes.tableCell} align="right"><span className={classNames(classes.taskDesc, rowClass)}>{handleTime()}</span></TableCell>
            <TableCell className={classes.tableCell} padding="none">{handleTag(props.task.tags)}</TableCell>
        </TableRow>
    )
}


export { TaskRow }
