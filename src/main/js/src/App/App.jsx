import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Tasks } from '@/Tasks';
import { Dashboard } from '@/Dashboard';
import { Notes } from '@/Notes';
import { Sidebar, Header } from '@/Layouts'
import { fontAwesomeLibrary } from '@/Utilities';


const App = (props) => {
    const [sidebarClass, setSidebarClass] = useState('');
    const [contentClass, setContentClass] = useState('');
    const [pageName, setPageName] = useState('');
    
    fontAwesomeLibrary();

    const handleToggle = () => {
        if (sidebarClass == "toggled") {
            setSidebarClass('');
            setContentClass('');
        } else {
            setSidebarClass("toggled");
            setContentClass("toggled");
        }
    }

    return (
        <div className={"d-flex h-100 " + sidebarClass} id="wrapper">
            <Sidebar/>
            

            <div id="page-content-wrapper" className={contentClass}>
                <Header handleToggle={handleToggle} pageName={pageName} />
                <Route exact path={'/app'} render={() => (<Redirect to="/app/dashboard" />)} />
                <Route path={'/app/dashboard'} component={Dashboard} />
                <Route path={'/app/tasks'} component={Tasks} />
                <Route path={'/app/notes'} component={Notes} />
            </div>
        </div>
    );
}

export { App };