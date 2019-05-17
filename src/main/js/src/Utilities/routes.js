import React, { useState, useEffect } from 'react';
import { Router, Route } from 'react-router-dom';

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
    
    return (
        <Router history={history}>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/app" component={App} />
        </Router>
    )
}

export { Routes };