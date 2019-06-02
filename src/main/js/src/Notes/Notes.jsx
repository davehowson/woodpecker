import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { NotesList, EditNote } from '@/Notes';

const useStyles = makeStyles(theme => ({
    card: {
        minHeight: '80vh'
    },
    categories: {
        display: "flex",
        flexDirection: "row"
    },
    category: {
        fontSize: theme.typography.pxToRem(12),
        textAlign: "center",
        cursor: "pointer",
        "& span": {
            color: '#a2a2a2',
            transition: 'color 500ms',
        },
        "&:focus": {
            backgroundColor: 'transparent !important',
            "& span": {
                color: theme.palette.secondary.dark
            }
        },
        "&:hover": {
            backgroundColor: 'transparent !important',
            "& span": {
                color: theme.palette.secondary.dark
            }
        }
    },
    selected: {
        backgroundColor: 'transparent !important',
        "& span": {
            color: '#004747 !important',
            fontWeight: 500
        },
    },
    listRow: {
        textAlign: "center",
        [theme.breakpoints.up('md')]: {
            maxHeight: '74vh',
            minHeight: '70vh',
            overflow: 'auto'
        }
    },
    title: {
        marginBottom: theme.spacing(1),
        textAlign: 'center'
    },
    fab: {
        position: 'fixed',
        bottom: 20,
        right: 20,
        top: 'auto',
        left: 'auto',
    },
    addIcon: {
        marginRight: theme.spacing(1),
        fontSize: 20,
    },
}))

const Notes = () => {
    const [notesCategory, setNotesCategory] = useState("all");
    const [noteId, setNoteId] = useState(null);
    const [taskHeader, setTaskHeader] = useState("Add Task");
    const [reRender, setReRender] = useState(false);

    const classes = useStyles();
    const noteCategories = ["All", "Work", "Personal", "Other"];

    const handleCategory = (category) => {
        setNotesCategory(category);
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Woodpecker - Notes</title>
            </Helmet>
            <Container>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item md={3} sm={12}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <List className={classes.categories} component="nav" dense disablePadding>
                                            {noteCategories.map(item =>
                                                <ListItem
                                                    className={classes.category}
                                                    selected={notesCategory === item.toLowerCase()}
                                                    onClick={() => handleCategory(item.toLowerCase())}
                                                    key={item}
                                                    classes={{
                                                        selected: classes.selected
                                                    }}
                                                >
                                                    <ListItemText classes={{primary: classes.categoryText}} primary={item}/>
                                                </ListItem>
                                            )}
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} className={classes.listRow}>
                                        <NotesList
                                            notesCategory={notesCategory}
                                            noteId={noteId}
                                            setNoteId={setNoteId}
                                            reRender={reRender}
                                            setReRender={setReRender}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={9} sm={12}>
                                <Grid container>
                                    <Grid item xs={12} className={classes.title}>
                                        <Typography componenet="h2" variant="h5">{taskHeader}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <EditNote
                                            noteId={noteId}
                                            setNoteId={setNoteId}
                                            setTaskHeader={setTaskHeader}
                                            setNotesCategory={setNotesCategory}
                                            reRender={reRender}
                                            setReRender={setReRender}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </React.Fragment>
    );
}

export { Notes };
