import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SortIcon from '@material-ui/icons/Sort';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { Scrollbars } from 'react-custom-scrollbars';

import { NotesList, EditNote } from '@/Notes';

const useStyles = makeStyles(theme => ({
    notesListTitle: {
        marginLeft: theme.spacing(3),
        fontWeight: theme.typography.fontWeightMedium,
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
        display: 'flex',
    },
    divider: {
        boxShadow:
            '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
    },
    listRow: {
        textAlign: 'center',
        height: '65vh',
        overflow: 'auto',
    },
    title: {
        marginBottom: theme.spacing(1),
    },
    addIcon: {
        marginRight: theme.spacing(1),
        fontSize: 20,
    },
}));

const Notes = props => {
    const [notesSort, setNotesSort] = useState('createdAt');
    const [notesSortDirection, setNotesSortDirection] = useState('desc');
    const [noteId, setNoteId] = useState(null);
    const [taskHeader, setTaskHeader] = useState('Add Note');
    const [reRender, setReRender] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const classes = useStyles();

    const handleSortOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleSortClose = () => {
        setAnchorEl(null);
    };

    const handleSortChange = (sort, direction) => {
        setNotesSort(sort);
        setNotesSortDirection(direction);
        handleSortClose();
    };

    const handleCategory = () => {
        if (typeof props.category !== 'string') return '';
        return (
            props.category.charAt(0).toUpperCase() +
            props.category.slice(1) +
            ' Notes'
        );
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Woodpecker - Notes</title>
            </Helmet>
            <Container>
                <Grid container spacing={4}>
                    <Grid item md={4} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <IconButton
                                    className={classes.sortButton}
                                    aria-owns={
                                        anchorEl ? 'simple-menu' : undefined
                                    }
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
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <MenuItem disabled>Sort By</MenuItem>
                                    <MenuItem
                                        selected={
                                            notesSort === 'createdAt' &&
                                            notesSortDirection === 'desc'
                                        }
                                        onClick={() =>
                                            handleSortChange(
                                                'createdAt',
                                                'desc'
                                            )
                                        }
                                    >
                                        Date Created: Descending
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleSortChange('createdAt', 'asc')
                                        }
                                        selected={
                                            notesSort === 'createdAt' &&
                                            notesSortDirection === 'asc'
                                        }
                                    >
                                        Date Created: Ascending
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleSortChange('title', 'desc')
                                        }
                                        selected={
                                            notesSort === 'title' &&
                                            notesSortDirection === 'desc'
                                        }
                                    >
                                        Title: Descending
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleSortChange('title', 'asc')
                                        }
                                        selected={
                                            notesSort === 'title' &&
                                            notesSortDirection === 'asc'
                                        }
                                    >
                                        Title: Ascending
                                    </MenuItem>
                                </Menu>
                                <Typography
                                    display="inline"
                                    variant="body1"
                                    className={classes.notesListTitle}
                                >
                                    {handleCategory()}
                                </Typography>
                                <Divider className={classes.divider} />
                            </Grid>
                            <Grid item xs={12} className={classes.listRow}>
                                <Scrollbars>
                                    <NotesList
                                        notesCategory={props.category}
                                        noteId={noteId}
                                        setNoteId={setNoteId}
                                        notesSort={notesSort}
                                        notesSortDirection={notesSortDirection}
                                        reRender={reRender}
                                        setReRender={setReRender}
                                    />
                                </Scrollbars>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={8} sm={12}>
                        <Grid container justify="center">
                            <Grid item xs={10} className={classes.title}>
                                <Typography
                                    componenet="h2"
                                    variant="h6"
                                    color={'primary'}
                                >
                                    {taskHeader}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <EditNote
                                    noteId={noteId}
                                    setNoteId={setNoteId}
                                    setTaskHeader={setTaskHeader}
                                    reRender={reRender}
                                    setReRender={setReRender}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export { Notes };
