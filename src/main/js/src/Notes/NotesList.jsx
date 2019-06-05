import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useGetNotes } from '@/Services';



const useStyles = makeStyles(theme => ({
    taskDate: {
        margin: theme.spacing(1, 1, 1, 0),
        fontSize: theme.typography.pxToRem(12),
    },
    dot: {
        height: theme.spacing(1),
        width: theme.spacing(1),
        borderRadius: "50%",
        display: "inline-block",
        verticalAlign: "middle"
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
    star: {
        fontSize: 14,
        marginRight: theme.spacing(1),
        color: theme.palette.primary.dark,
        display: "inline-block",
        verticalAlign: "middle"
    },
    taskDesc: {
        transition: "color 1s"
    },
    completedDescription: {
        color: '#8f8f8f'
    },
    loadMore: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    loadingGrid: {
        height: "100%"
    }
}));

const NotesList = (props) => {
    const [notes, setNotes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [lastPage, setLastPage] = useState(false);
    const [loading, setLoading] = useState(true);
    const getNotes = useGetNotes();

    const classes = useStyles();

    useEffect(() => {
		getNotes(0, props.notesCategory, props.notesSort, props.notesSortDirection).then(responseNotes => {
            setNotes(responseNotes.content);
            setLastPage(responseNotes.last);
            setTimeout(function() {
                setLoading(false);
            }, 500)
        });
        setCurrentPage(0);
        props.setReRender(false);
    }, [props.notesCategory, props.reRender, props.notesSort, props.notesSortDirection]);

    const handleLoadMore = () => {
        let current = currentPage + 1
        getNotes(current, props.notesCategory, props.notesSort, props.notesSortDirection).then(responseNotes => {
            setNotes(n => n.concat(responseNotes.content));
            setLastPage(responseNotes.last);
        });
        setCurrentPage(current);
    };

    const handleTag = (tag) => {
        if (tag != null) {
            return (<Tooltip title={capitalize(tag)}>
                <span className={classNames(classes.dot, classes["dot"+tag.toLowerCase()])}/>
            </Tooltip>);
        }
        return '';
    };

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    const handleDate = (date) => {
        return moment(date).format("MMM Do");
    };


    return (
        <React.Fragment>
            {loading ? (
                <Grid container className={classes.loadingGrid} alignItems="center" justify="center">
                    <Grid item>
                        <CircularProgress className={classes.progress} />
                    </Grid>
                </Grid>
            ) : (
                <React.Fragment>
                    {notes&&
                    <React.Fragment>
                        <List className={classes.list} component="nav">
                            {notes.map(note =>
                                <React.Fragment key={note.id}>
                                    <ListItem
                                        button
                                        onClick={() => props.setNoteId(note.id)}
                                        selected={props.noteId === note.id}
                                    >
                                        <ListItemText
                                            classes={{
                                                secondary: classes.listTextSecondary
                                            }}
                                            primary={note.title}
                                            secondary={
                                                <React.Fragment>
                                                    {note.important&&
                                                    <StarIcon className={classes.star} />
                                                    }
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.taskDate}
                                                    >
                                                        {handleDate(note.creationDateTime)}
                                                    </Typography>
                                                    {handleTag(note.tag)}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                </React.Fragment>
                            )}
                        </List>
                        {!lastPage&&
                        <Button className={classes.loadMore} variant="outlined" color="primary" onClick={handleLoadMore}>Load More</Button>
                        }
                    </React.Fragment>
                    }
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export { NotesList }
