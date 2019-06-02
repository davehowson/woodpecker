import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Slide from '@material-ui/core/Slide';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';

import {noteService} from '@/Services';

const styles = theme => ({
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
    buttons: {
        margin: theme.spacing(1, 0, 0)
    },
    quill: {
        height: 200,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4)
    },
    buttonsDelete: {
       marginRight: 'auto'
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
});

const BookmarkComponent = (props) => {
    const [bookmarkId, setBookmarkId] = useState(null);
    const [bookmarkTitle, setBookmarkTitle] = useState('');
    const [bookmarkUrl, setBookmarkUrl] = useState('');
    const [bookmarkCategory, setBookmarkCategory] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    useEffect(() => {
        if (props.bookmarkId != null)
            noteService.getBookmark(props.bookmarkId).then(note => {
                setBookmarkId(note.id);
                setBookmarkTitle(note.title);
                setBookmarkDescription(note.description);
                if (note.tag == null) {
                    setBookmarkTag('');
                } else {
                    setBookmarkTag(note.tag);
                }
                setBookmarkImportant(note.important);
            });
    }, [props.bookmarkId]);


    const handleModalClose = () => {
        setBookmarkId(null);
        setBookmarkTitle('');
        setBookmarkUrl('');
        setBookmarkCategory('');
        props.setBookmarkId(null)
        props.setBookmarkModalStatus(false);
    }

    const handleModalOpen = () => {
        props.setBookmarkModalStatus(true);
    }

    const handleDeleteClick = () => {
        setDeleteConfirm(!deleteConfirm);
    }

    const deleteBookmark = () => {
        noteService.deleteBookmark(bookmarkId).then(() => {
            handleModalClose();
        })
    }

    const {classes} = props;

    return (<React.Fragment>
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
            }, {setStatus, setSubmitting}) => {
                if (tag == '')
                    tag = null

                setStatus();
                if (bookmarkId == null) {
                    noteService.create(title, description, tag, important).then(function(response) {
                        handleModalClose();
                    })
                } else {
                    noteService.update(bookmarkId, title, description, tag, important).then(function(response) {
                        handleModalClose();
                    })
                }

            }}
            enableReinitialize={true}
            >
            {
                ({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    setFieldValue,
                    errors,
                }) => (<Dialog open={props.noteModalStatus} onClose={handleModalClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="sm">
                    <DialogTitle id="form-dialog-title" classes={{
                            root: classes.modalTitle
                        }}>
                        Add New Bookmark
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <Grid container={true} spacing={2}>
                                <Grid item={true} xs={12}>
                                    <TextField id="title" className={classes.textField} name="title" label="Bookmark Title" fullWidth={true}
                                    helperText={touched.title ? errors.title : ""}
                                    error={touched.title && Boolean(errors.title)}
                                    value={values.title}
                                    onChange={handleChange}
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
                                <Grid item={true} xs={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={(event) => {
                                                    setFieldValue("important", !values.important)
                                                }}
                                                checked={values.important}
                                                value="important"
                                            />
                                        }
                                        className={classes.important}
                                        label="Important"
                                      />
                                </Grid>
                            </Grid>
                        </form>

                    </DialogContent>
                    <DialogActions className={classes.buttons}>
                        <div className={classes.buttonsDelete}>
                            <IconButton aria-label="Delete" className={classes.deleteIcon} onClick={handleDeleteClick}>
                                <DeleteIcon />
                            </IconButton>
                            <Slide direction="right" in={deleteConfirm} mountOnEnter unmountOnExit>
                                <Button color="primary" onClick={deleteBookmark}>
                                    Delete Bookmark
                                </Button>
                            </Slide>
                        </div>
                        <Button color="secondary" onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button color="secondary" onClick={handleSubmit}>
                            Create Task
                        </Button>
                    </DialogActions>
                </Dialog>)
            }
        </Formik>
    </React.Fragment>)
}

BookmarkComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

const Bookmark = withStyles(styles)(BookmarkComponent);

export {
    Bookmark
};
