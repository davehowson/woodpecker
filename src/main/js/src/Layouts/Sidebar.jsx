import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '@/Layouts/Sidebar.css';

const Sidebar = (props) => {
    return (
        <div id="sidebar-wrapper">
        <div className="sidebar-heading">Woodpecker</div>
            <div className="list-group list-group-flush top">
                <NavLink activeClassName="current" to="/app/dashboard" className="list-group-item list-group-item-action">
                    <FontAwesomeIcon className="sidebar-icon" icon="home" fixedWidth />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink activeClassName="current" to="/app/tasks" className="list-group-item list-group-item-action">
                    <FontAwesomeIcon className="sidebar-icon" icon="check" fixedWidth />
                    <span>Tasks</span>
                </NavLink>
                <NavLink activeClassName="current" to="/app/notes" className="list-group-item list-group-item-action">
                    <FontAwesomeIcon className="sidebar-icon" icon="edit" fixedWidth />
                    <span>Notes</span>
                </NavLink>
                <NavLink activeClassName="current" to="#" className="list-group-item list-group-item-action">
                    <FontAwesomeIcon className="sidebar-icon" icon="bookmark" fixedWidth />
                    <span>Bookmarks</span>
                </NavLink>
            </div>
        </div>
    )
}

export { Sidebar };
