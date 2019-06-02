import React, { useState, useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { authenticationService } from '@/Services';
import { history, PrivateRoute } from '@/Utilities';
import { Home } from '@/Home';
import { Login, Register } from '@/Auth';
import { App } from '@/App';

import '@/App/App.scss'

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
              dark: '#9b0000'
        },
        secondary: {
              light: '#4ebaaa',
              main: '#00897b',
              dark: '#005b4f',
              contrastText: '#FFF',
        },
        background: {
            default: '#f0f0f0'
        }
      },
      status: {
        danger: 'orange',
      },
      typography: {
          useNextVariants: true
      },
      overrides: {
          MuiPaper: {
              elevation1: {
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
              }
          }
      }
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router history={history}>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/app" component={App} />
            </Router>
        </ThemeProvider>
    )
}

export { Routes };
