import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import ViewListIcon from '@material-ui/icons/ViewList';
import NotesIcon from '@material-ui/icons/Notes';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    toolbarList: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(2)
    },
    drawerPaper: {
        width: drawerWidth,
        borderRight: 'none'
    },
    sidebarListItem: {
        marginTop: theme.spacing(1),
        "&:hover": {
            background: "transparent",
            color: theme.palette.primary.dark,
            "& svg": {
                color: theme.palette.primary.dark
            }
        }
    },
    active: {
        "& span": {
            color: theme.palette.primary.main
        },
        "& svg": {
            color: theme.palette.primary.main
        }
    }
}));

const Sidebar = (props) => {
    const classes = useStyles();
    const SidebarLink = React.forwardRef((props, ref) => <NavLink activeClassName={classes.active} innerRef={ref} {...props}/>);

    const drawer = (
        <List className={classes.toolbarList}>
            <ListItem className={classes.sidebarListItem} button={true} disableRipple={true} key="Tasks" component={SidebarLink} to="/app/tasks">
                <ListItemIcon>
                    <ViewListIcon/>
                </ListItemIcon>
                <ListItemText primary="Tasks"/>
            </ListItem>
            <ListItem className={classes.sidebarListItem} button={true} disableRipple={true} key="Notes" component={SidebarLink} to="/app/notes">
                <ListItemIcon>
                    <NotesIcon/>
                </ListItemIcon>
                <ListItemText primary="Notes"/>
            </ListItem>
        </List>
    )

    return (
        <nav >
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor="left"

                    open={props.drawerOpen}
                    onClose={props.handleDrawerToggle}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                      keepMounted: true,
                    }}
                    >
                        {drawer}
                </Drawer>
            </Hidden>
        </nav>
    )
}

export {
    Sidebar
};
