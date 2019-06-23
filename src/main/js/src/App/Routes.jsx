import React, { useState, useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';

import { authenticationService } from '@/Services';
import { history, PrivateRoute } from '@/Utilities';
import { Home } from '@/Home';
import { App } from '@/App';

import '@/App/App.scss';

const Routes = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        authenticationService.currentUser.subscribe(x => setCurrentUser(x));
    });

    const theme = createMuiTheme({
        palette: {
            primary: {
                light: '#ff5131',
                main: '#d50000',
                dark: '#9b0000',
            },
            secondary: {
                light: '#6d6d6d',
                main: '#424242',
                dark: '#1b1b1b',
                contrastText: '#FFF',
            },
            background: {
                default: '#ffffff',
            },
        },
        status: {
            danger: 'orange',
        },
        typography: {
            useNextVariants: true,
        },
        overrides: {
            MuiPaper: {
                elevation1: {
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
                <Router history={history}>
                    <Route path="/" exact component={Home} />
                    <PrivateRoute path="/app" component={App} />
                </Router>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export { Routes };
