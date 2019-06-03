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
import SortIcon from '@material-ui/icons/Sort';

import { NotesList, EditNote } from '@/Notes';
import { Menu, MenuItem, IconButton} from "@material-ui/core";

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
    addButton: {
        padding: theme.spacing(0, 1),
        fontSize: theme.typography.pxToRem(12),
    },
    sortButton: {
        color: '#a2a2a2',
    },
    sortRow: {
        paddingBottom: theme.spacing(1),
        display: "flex"
    },
    listRow: {
        textAlign: "center",
        [theme.breakpoints.up('md')]: {
            height: '65vh',
            overflow: 'auto',
            background: '#f7f7f7',
            padding: 3,
            borderRadius: 5
        }
    },
    title: {
        marginBottom: theme.spacing(1)
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
}));

const Notes = () => {
    const [notesCategory, setNotesCategory] = useState("all");
    const [notesSort, setNotesSort] = useState("createdAt");
    const [notesSortDirection, setNotesSortDirection] = useState("desc");
    const [noteId, setNoteId] = useState(null);
    const [taskHeader, setTaskHeader] = useState("Add Note");
    const [reRender, setReRender] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const classes = useStyles();
    const noteCategories = ["All", "Work", "Personal", "Other"];

    const handleSortOpen = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleSortClose = () => {
        setAnchorEl(null);
    };

    const handleSortChange = (sort, direction) => {
        setNotesSort(sort);
        setNotesSortDirection(direction);
        handleSortClose();
    };

    const handleCategory = (category) => {
        setNotesCategory(category);
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Woodpecker - Notes</title>
            </Helmet>
            <Container>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item md={4} sm={12}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <List className={classes.categories} component="nav" dense disablePadding>
                                            <IconButton
                                                className={classes.sortButton}
                                                aria-owns={anchorEl ? 'simple-menu' : undefined}
                                                aria-haspopup="true"
                                                onClick={handleSortOpen}
                                            >
                                                <SortIcon />
                                            </IconButton>
                                            <Menu
                                                id="sort-menu"
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleSortClose}
                                                getContentAnchorEl={null}
                                                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                                transformOrigin={{ vertical: "top", horizontal: "left" }}
                                            >
                                                <MenuItem disabled>Sort By</MenuItem>
                                                <MenuItem
                                                    selected={notesSort === 'createdAt' && notesSortDirection === 'desc'}
                                                    onClick={() => handleSortChange('createdAt', 'desc')}
                                                >
                                                    Date Created: Descending
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => handleSortChange('createdAt', 'asc')}
                                                    selected={notesSort === 'createdAt' && notesSortDirection === 'asc'}
                                                >
                                                    Date Created: Ascending
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => handleSortChange('title', 'desc')}
                                                    selected={notesSort === 'title' && notesSortDirection === 'desc'}
                                                >
                                                    Title: Descending
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => handleSortChange('title', 'asc')}
                                                    selected={notesSort === 'title' && notesSortDirection === 'asc'}
                                                >
                                                    Title: Ascending
                                                </MenuItem>
                                            </Menu>
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
                                            notesSort={notesSort}
                                            notesSortDirection={notesSortDirection}
                                            reRender={reRender}
                                            setReRender={setReRender}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={8} sm={12}>
                                <Grid container justify="center">
                                    <Grid item xs={10} className={classes.title}>
                                        <Typography componenet="h2" variant="h6" color={"primary"}>{taskHeader}</Typography>
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
