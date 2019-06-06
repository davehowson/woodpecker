import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/AccountCircle';

import {authenticationService} from '@/Services';
import {history} from '@/Utilities';
import logo from '@/img/woodpecker-header.png';


const useStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor: '#FFF'
     },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
    },
    headerLogo: {
        height: 37,
    },
    navButtons: {
        marginLeft: "auto",
        marginRight: theme.spacing(2),

        [theme.breakpoints.down('xs')]: {
          display: 'none',
        },
    },
    tab: {
        width: 60,
        minWidth: 50,
        maxWidth: 70,
        minHeight: 64,
        padding: theme.spacing(0, 5)
    },
    selected: {
        backgroundColor: "#f4f4f4",
        color: theme.palette.primary.dark,
    },
    avatarButtonRoot: {
        padding: theme.spacing(1)
    },
    avatar: {
        backgroundColor: '#fff',
        color: theme.palette.primary.dark
    },
    userDropdown: {
        marginLeft: theme.spacing(2),
        padding: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
          marginLeft: "auto",
        },
    },
    iconRoot: {
        width: '1.9em',
        height: '1.9em'
    }
}));

const Header = (props) => {
    const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);
    const [anchorEl, setAnchorEl] = useState(null);
    const [pageValue, setPageValue] = useState(0);

    const logout = () => {
        authenticationService.logout();
        history.push('/');
    };

    const handleDropClose = () => {
        setAnchorEl(null)
    };

    const handleDropOpen = event => {
        setAnchorEl(event.currentTarget)
    };

    const handlePageChange = (event, newValue) => {
        setPageValue(newValue)
    };

    const avatarName = () => {
        const name = currentUser.name;
        let initials = name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return initials;
    };


    const classes = useStyles();

    const AppBarLink = React.forwardRef((props, ref) => <NavLink activeClassName={classes.active} innerRef={ref} {...props}/>);

    return (<AppBar color='inherit' position="fixed" className={classes.appBar} elevation={1}>
        <Toolbar variant="regular">
            <IconButton
                color="inherit"
                aria-label="Open drawer"
                edge="start"
                onClick={props.handleDrawerToggle}
                className={classes.menuButton}
                classes={{
                    root: classes.avatarButtonRoot
                }}
            >
                <MenuIcon />
            </IconButton>
            <img src={logo} className={classes.headerLogo}/>
            <Tabs
                className={classes.navButtons}
                value={history.location.pathname}
                onChange={handlePageChange}
                indicatorColor="primary"
            >
                <Tab
                    className={classes.tab}
                    label="Tasks"
                    disableRipple
                    component={AppBarLink}
                    classes={{
                        selected: classes.selected
                    }}
                    to="/app/tasks"
                    value="/app/tasks"
                />
                <Tab
                    className={classes.tab}
                    label="Notes"
                    disableRipple
                    component={AppBarLink}
                    classes={{
                        selected: classes.selected
                    }}
                    to="/app/notes"
                    value="/app/notes"
                />
            </Tabs>
            <IconButton
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={handleDropOpen}
              className={classes.userDropdown}
            >
                <Avatar className={classes.avatar}><PersonIcon classes={{root: classes.iconRoot}} /></Avatar>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleDropClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem disabled>{currentUser.name}</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </Toolbar>
    </AppBar>)
}

export {
    Header
};
