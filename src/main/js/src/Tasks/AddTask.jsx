import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import { Formik } from 'formik';
import * as Yup from 'yup';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { taskService } from '@/Services';


const styles = theme => ({
    addContainer: {
        minHeight: "75vh"
    },
    form: {
        marginTop: theme.spacing(2),
        width: '100%',
    },
    formControl: {
        minWidth: 120,
    },
    buttonsRow: {
        textAlign: 'right'
    },
    buttons: {
        margin: theme.spacing(1),
    },
    important: {
        marginTop: theme.spacing(2)
    },
    select: {
        '&:focus': {
            backgroundColor: '#fff'
        }
    },
    subtitle2: {
        marginTop: theme.spacing(2)
    }
});

const AddTaskComponent = (props) => {

    const {classes} = props;

    const handleCancel = () => {
        props.taskFormStatusChanger(false)
    }

    return (<React.Fragment>
        <Grid container className={classes.addContainer} justify="center" alignItems="center">
            <Grid item xs={5}>
                <Grid container>
                    <Typography variant="h6" color="primary" component="h2">Add New Task</Typography>
                    <Formik initialValues={{
                            description: '',
                            date: null,
                            time: null,
                            tag: ''
                        }} validationSchema={Yup.object().shape({
                            description: Yup.string().max(100, 'Description is too long').required('Description is required'),
                            date: Yup.date().nullable()
                        })} onSubmit={({
                            description,
                            date,
                            time,
                            tag
                        }, {setStatus, setSubmitting}) => {
                            setStatus();
                            if (!(date == null || date == "" || date == undefined)) {
                                date = moment(date).format("YYYY-MM-DD");
                            } else {
                                date = null;
                            }

                            if (!(time == null || time == "" || time == undefined)) {
                                time = moment(time).format("HH:mm");
                            } else {
                                time = null;
                            }

                            taskService.create(description, date, time, tag).then(function(response) {
                                handleCancel();
                            })
                        }}>
                        {
                            ({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                isValid,
                                setFieldValue,
                                errors
                            }) => (
                                <form onSubmit={handleSubmit} className={classes.form}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <Grid container={true} spacing={2}>
                                            <Grid item={true} xs={12}>
                                                <TextField
                                                    id="description"
                                                    className={classes.textField}
                                                    name="description"
                                                    label="Description"
                                                    fullWidth={true}
                                                    helperText={touched.description ? errors.description : ""}
                                                    error={touched.description && Boolean(errors.description)}
                                                    value={values.description}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item={true} xs={6}>
                                                <DatePicker
                                                    label="Date*"
                                                    value={values.date}
                                                    clearable
                                                    fullWidth
                                                    format="ll"
                                                    autoOk
                                                    onChange={value => {
                                                        setFieldValue("date", value);
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item={true} xs={6}>
                                                <TimePicker
                                                    label="Time*"
                                                    value={values.time}
                                                    clearable
                                                    fullWidth
                                                    autoOk
                                                    format="hh:mm a"
                                                    onChange={value => {
                                                        setFieldValue("time", value);
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item={true} xs={6}>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel htmlFor="tag-simple">Tag*</InputLabel>
                                                    <Select
                                                      value={values.tag}
                                                      onChange={handleChange}
                                                      inputProps={{
                                                          name: 'tag',
                                                          id: 'tag-simple'
                                                      }}
                                                      classes={{
                                                          select: classes.select
                                                      }}
                                                    >
                                                      <MenuItem value="">
                                                        <em>None</em>
                                                      </MenuItem>
                                                      <MenuItem value="WORK">Work</MenuItem>
                                                      <MenuItem value="PERSONAL">Personal</MenuItem>
                                                      <MenuItem value="OTHER">Other</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="caption" className={classes.subtitle2}>
                                                    *Optional
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} className={classes.buttonsRow}>
                                                <Button className={classes.buttons} color="primary" onClick={handleCancel}>
                                                    Cancel
                                                </Button>
                                                <Button className={classes.buttons} color="primary" onClick={handleSubmit}>
                                                    Create Task
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </MuiPickersUtilsProvider>

                                </form>
                            )
                        }
                    </Formik>
                </Grid>
            </Grid>
        </Grid>
    </React.Fragment>)
}

AddTaskComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const AddTask = withStyles(styles)(AddTaskComponent);

export { AddTask };
