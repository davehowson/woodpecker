import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Slide from '@material-ui/core/Slide';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';


import {noteService} from '@/Services';

const useStyles = makeStyles(theme => ({
    modalTitle: {
        paddingBottom: theme.spacing(0),
        color: theme.palette.secondary.dark
    },
    form: {
        width: '100%'
    },
    formControl: {
        minWidth: 120
    },
    importantRow: {
        textAlign: "right"
    },
    important: {
        width: 55,
        height: 55,
        marginRight: 0
    },
    importantIcon: {
        fontSize: 30
    },
    buttons: {
        margin: theme.spacing(1, 0, 0)
    },
    quill: {
        height: 200,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4)
    },
    buttonRow: {
        marginTop: theme.spacing(2)
    },
    saveButtons: {
       marginLeft: 'auto'
    },
    deleteIcon: {
        marginRight: theme.spacing(1)
    },
    select: {
        '&:focus': {
            backgroundColor: '#fff'
        }
    },
    helperText: {
        marginTop: theme.spacing(2)
    }
}));

const EditNote = (props) => {
    const [noteId, setNoteId] = useState(null);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDescription, setNoteDescription] = useState('');
    const [noteTag, setNoteTag] = useState('');
    const [noteImportant, setNoteImportant] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    useEffect(() => {
        if (props.noteId != null)
            noteService.getNote(props.noteId).then(note => {
                setNoteId(note.id);
                setNoteTitle(note.title);
                setNoteDescription(note.description);
                if (note.tag == null) {
                    setNoteTag('');
                } else {
                    setNoteTag(note.tag);
                }
                setNoteImportant(note.important);
                props.setTaskHeader("Edit Task");
            });

    }, [props.noteId]);


    const handleClear = () => {
        setNoteId(null);
        setNoteTitle('');
        setNoteDescription('');
        setNoteTag('');
        setNoteImportant(false);
        props.setTaskHeader("Add Task")
        props.setNoteId(null)
    }


    const handleDeleteClick = () => {
        props.setReRender(true)
        setDeleteConfirm(!deleteConfirm);
    }

    const deleteNote = () => {
        noteService.deleteNote(noteId).then(() => {
            handleClear();
        })
    }

    const classes = useStyles();

    return (<Grid container justify="center">
        <Grid item xs={9}>
            <Formik initialValues={{
                    title: noteTitle,
                    description: noteDescription,
                    tag: noteTag,
                    important: noteImportant
                }} validationSchema={Yup.object().shape({
                    title: Yup.string().max(30, 'Title is too long').required('Title is required'),
                    description: Yup.string().max(1000, 'Description is too long').required('Description is required'),
                })} onSubmit={({
                    title,
                    description,
                    tag,
                    important
                }, {setStatus}) => {
                    if (tag == '')
                        tag = null

                    setStatus();
                    if (noteId == null) {
                        noteService.create(title, description, tag, important).then(() => {
                            props.setNotesCategory(tag !== null ? tag.toLowerCase() : "all");
                        })
                    } else {
                        noteService.update(noteId, title, description, tag, important).then(() => {
                            props.setNotesCategory(tag !== null ? tag.toLowerCase() : "all");
                        })

                    }

                }}
                enableReinitialize={true}
                >
                {
                    ({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        setFieldValue,
                        errors,
                    }) => (
                            <form onSubmit={handleSubmit} className={classes.form}>
                                <Grid container={true} spacing={2}>
                                    <Grid item={true} xs={10}>
                                        <TextField id="title" className={classes.textField} name="title" label="Title" fullWidth={true}
                                        helperText={touched.title ? errors.title : ""}
                                        error={touched.title && Boolean(errors.title)}
                                        value={values.title}
                                        onChange={handleChange}
                                    />
                                    </Grid>
                                    <Grid item={true} xs={2} className={classes.importantRow}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={() => {
                                                        setFieldValue("important", !values.important)
                                                    }}
                                                    color="primary"
                                                    checked={values.important}
                                                    value="important"
                                                    icon = {<StarBorderIcon className={classes.importantIcon}/>}
                                                    checkedIcon={<StarIcon className={classes.importantIcon}/>}
                                                />
                                            }
                                            className={classes.important}
                                          />
                                    </Grid>
                                    <Grid item={true} xs={12}>
                                        <FormControl className={classes.formControl} fullWidth={true}>
                                            <Field name="description">
                                                {
                                                    ({ field }) => <ReactQuill
                                                        value={field.value}
                                                        onChange={field.onChange(field.name)}
                                                        className={classes.quill}
                                                        />
                                                }
                                            </Field>
                                            <FormHelperText
                                            className={classes.helperText}
                                            error={touched.description && Boolean(errors.description)}
                                            >
                                                {touched.description ? errors.description : ""}
                                            </FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item={true} xs={6}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="tag-simple">Tag</InputLabel>
                                            <Select value={values.tag} onChange={handleChange} inputProps={{
                                                    name: 'tag',
                                                    id: 'tag-simple'
                                                }} classes={{
                                                    select: classes.select
                                                }}>
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="WORK">Work</MenuItem>
                                                <MenuItem value="PERSONAL">Personal</MenuItem>
                                                <MenuItem value="OTHER">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} className={classes.buttonRow}>
                                        <Grid container alignItems="center">
                                            {noteId&&
                                                <Grid item>
                                                    <IconButton aria-label="Delete" className={classes.deleteIcon} onClick={handleDeleteClick}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <Slide direction="right" in={deleteConfirm} mountOnEnter unmountOnExit>
                                                        <Button color="primary" onClick={deleteNote}>
                                                            Delete Note
                                                        </Button>
                                                    </Slide>
                                                </Grid>
                                            }
                                            <Grid item className={classes.saveButtons}>
                                                <Button color="primary" onClick={handleClear}>
                                                    Cancel
                                                </Button>
                                                <Button color="primary" onClick={handleSubmit}>
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        )
                }
            </Formik>
        </Grid>
    </Grid>)
}

export {
    EditNote
};
