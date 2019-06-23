import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';

import BorderAllIcon from '@material-ui/icons/BorderAll';
import WorkIcon from '@material-ui/icons/Work';
import HomeIcon from '@material-ui/icons/Home';
import LayersIcon from '@material-ui/icons/Layers';

import { history } from '@/Utilities';

import logo from '@/img/header.png';

const useStyles = makeStyles(theme => ({
    toolbarList: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(2),
    },
    drawerPaper: props => ({
        position: 'relative',
        whiteSpace: 'nowrap',
        borderRight: 'none',
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
        width: props.drawerWidth,
        minHeight: '100vh',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        zIndex: theme.zIndex.appBar - 1,
    }),
    appBarSpacer: theme.mixins.toolbar,
    logoDiv: {
        textAlign: 'center',
    },
    logo: {
        height: 45,
        width: 175,
        margin: theme.spacing(2, 0),
    },
    subheader: {
        color: '#c9c9c9',
    },
    icon: {
        color: 'white',
    },
    list: { marginTop: theme.spacing(2) },
    listItem: {
        borderLeft: `5px solid ${theme.palette.secondary.main}`,
        transition: 'border 200ms',
    },
    selected: {
        borderLeft: `5px solid ${theme.palette.primary.main} !important`,
    },
    selectedAll: {
        borderLeft: `5px solid #000 !important`,
    },
    selectedWork: {
        borderLeft: `5px solid #fff171 !important`,
    },
    selectedPersonal: {
        borderLeft: `5px solid #a7ff71 !important`,
    },
    selectedOther: {
        borderLeft: `5px solid #a3a3a3 !important`,
    },
    active: {
        '& span': {
            color: theme.palette.primary.main,
        },
        '& svg': {
            color: theme.palette.primary.main,
        },
    },
}));

const Sidebar = props => {
    const classes = useStyles(props);

    const SidebarLink = React.forwardRef((props, ref) => (
        <NavLink activeClassName={classes.active} innerRef={ref} {...props} />
    ));

    const handleCategory = category => {
        props.setCategory(category);
    };

    const handleScope = scope => {
        props.setTasksScope(scope);
    };

    const drawer = (
        <div>
            <div className={classes.logoDiv}>
                <img src={logo} className={classes.logo} />
            </div>
            <Divider />
            <List
                className={classes.list}
                subheader={
                    <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        className={classes.subheader}
                    >
                        {history.location.pathname === '/app/tasks'
                            ? 'Task Categories'
                            : 'Note Categories'}
                    </ListSubheader>
                }
            >
                <ListItem
                    button
                    className={classes.listItem}
                    selected={props.category === 'all'}
                    onClick={() => handleCategory('all')}
                    classes={{ selected: classes.selectedAll }}
                    key={'All'}
                >
                    <ListItemIcon className={classes.icon}>
                        <BorderAllIcon />
                    </ListItemIcon>
                    <ListItemText primary={'All'} />
                </ListItem>
                <ListItem
                    button
                    className={classes.listItem}
                    selected={props.category === 'work'}
                    onClick={() => handleCategory('work')}
                    classes={{ selected: classes.selectedWork }}
                    key={'Work'}
                >
                    <ListItemIcon className={classes.icon}>
                        <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Work'} />
                </ListItem>
                <ListItem
                    button
                    className={classes.listItem}
                    selected={props.category === 'personal'}
                    onClick={() => handleCategory('personal')}
                    classes={{ selected: classes.selectedPersonal }}
                    key={'Personal'}
                >
                    <ListItemIcon className={classes.icon}>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Personal'} />
                </ListItem>
                <ListItem
                    button
                    className={classes.listItem}
                    selected={props.category === 'other'}
                    onClick={() => handleCategory('other')}
                    classes={{ selected: classes.selectedOther }}
                    key={'Other'}
                >
                    <ListItemIcon className={classes.icon}>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Other'} />
                </ListItem>
                <Divider />
            </List>

            {history.location.pathname === '/app/tasks' && (
                <List className={classes.list}>
                    <ListItem
                        button
                        className={classes.listItem}
                        selected={props.tasksScope === 'today'}
                        onClick={() => handleScope('today')}
                        classes={{ selected: classes.selected }}
                        key={'today'}
                    >
                        <ListItemText
                            classes={{
                                primary: classes.categoryText,
                            }}
                            primary={'Today'}
                        />
                    </ListItem>
                    <ListItem
                        button
                        className={classes.listItem}
                        selected={props.tasksScope === 'upcoming'}
                        onClick={() => handleScope('upcoming')}
                        classes={{ selected: classes.selected }}
                        key={'upcoming'}
                    >
                        <ListItemText
                            classes={{
                                primary: classes.categoryText,
                            }}
                            primary={'Upcoming'}
                        />
                    </ListItem>
                    <ListItem
                        button
                        className={classes.listItem}
                        selected={props.tasksScope === 'overdue'}
                        onClick={() => handleScope('overdue')}
                        classes={{ selected: classes.selected }}
                        key={'overdue'}
                    >
                        <ListItemText
                            classes={{
                                primary: classes.categoryText,
                            }}
                            primary={'Overdue'}
                        />
                    </ListItem>
                    <ListItem
                        button
                        className={classes.listItem}
                        selected={props.tasksScope === 'completed'}
                        onClick={() => handleScope('completed')}
                        classes={{ selected: classes.selected }}
                        key={'completed'}
                    >
                        <ListItemText
                            classes={{
                                primary: classes.categoryText,
                            }}
                            primary={'Completed'}
                        />
                    </ListItem>
                </List>
            )}
        </div>
    );

    return (
        <nav className={classes.drawer} aria-label="Mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    open={props.drawerOpen}
                    onClose={props.handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    );
};

export { Sidebar };
