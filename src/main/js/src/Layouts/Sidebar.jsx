import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '@/Layouts/Sidebar.css';

const Sidebar = (props) => {
    return (
        <div id="sidebar-wrapper">
            <div className="list-group list-group-flush top">
                <NavLink activeClassName="current" to="/app/dashboard" className="list-group-item list-group-item-action">
                    <FontAwesomeIcon className="sidebar-icon" icon="home" fixedWidth />
                </NavLink>
                <NavLink activeClassName="current" to="/app/tasks" className="list-group-item list-group-item-action">
                    <FontAwesomeIcon className="sidebar-icon" icon="tasks" fixedWidth />
                </NavLink>
                <NavLink activeClassName="current" to="/app/notes" className="list-group-item list-group-item-action">
                    <FontAwesomeIcon className="sidebar-icon" icon="edit" fixedWidth />
                </NavLink>
                <NavLink activeClassName="current" to="#" className="list-group-item list-group-item-action">
                    <FontAwesomeIcon className="sidebar-icon" icon="user-cog" fixedWidth />
                </NavLink>
            </div>
        </div>
    )
}

export { Sidebar };