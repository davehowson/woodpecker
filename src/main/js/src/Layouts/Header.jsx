import React, { useState } from 'react';
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

import { authenticationService } from '@/Services';
import { history } from '@/Utilities';
import logo from '@/img/header.png';

const useStyles = makeStyles(theme => ({
    appBar: props => ({
        width: `calc(100% - ${props.drawerWidth}px)`,
    }),
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    headerLogo: {
        height: 37,
        display: 'none',
    },
    navButtons: {
        marginLeft: 'auto',
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
        padding: theme.spacing(0, 5),
    },
    indicator: {
        backgroundColor: 'transparent',
        height: theme.spacing(0.5),
        display: 'flex',
        justifyContent: 'center',
        '& > div': {
            maxWidth: 50,
            width: '100%',
            backgroundColor: '#fff',
        },
    },
    userDropdown: {
        marginLeft: theme.spacing(2),
        padding: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            marginLeft: 'auto',
        },
    },
    avatar: {
        color: theme.palette.secondary.main,
    },
    iconRoot: {
        width: '1.9em',
        height: '1.9em',
    },
}));

const Header = props => {
    const [currentUser, setCurrentUser] = useState(
        authenticationService.currentUserValue
    );
    const [anchorEl, setAnchorEl] = useState(null);
    const [pageValue, setPageValue] = useState(0);

    const logout = () => {
        authenticationService.logout();
        history.push('/');
    };

    const handleDropClose = () => {
        setAnchorEl(null);
    };

    const handleDropOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handlePageChange = (event, newValue) => {
        setPageValue(newValue);
    };

    const classes = useStyles(props);

    const AppBarLink = React.forwardRef((props, ref) => (
        <NavLink activeClassName={classes.active} innerRef={ref} {...props} />
    ));

    return (
        <AppBar
            color="primary"
            position="fixed"
            elevation={5}
            className={classes.appBar}
        >
            <Toolbar variant="regular">
                <IconButton
                    color="secondary"
                    aria-label="Open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    className={classes.menuButton}
                    classes={{
                        root: classes.avatarButtonRoot,
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <img src={logo} className={classes.headerLogo} />
                <Tabs
                    className={classes.navButtons}
                    value={history.location.pathname}
                    onChange={handlePageChange}
                    TabIndicatorProps={{ children: <div /> }}
                    classes={{
                        indicator: classes.indicator,
                    }}
                >
                    <Tab
                        className={classes.tab}
                        label="Tasks"
                        disableRipple
                        component={AppBarLink}
                        to="/app/tasks"
                        value="/app/tasks"
                    />
                    <Tab
                        className={classes.tab}
                        label="Notes"
                        disableRipple
                        component={AppBarLink}
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
                    <Avatar className={classes.avatar}>
                        <PersonIcon classes={{ root: classes.iconRoot }} />
                    </Avatar>
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleDropClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem disabled>{currentUser.name}</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export { Header };
