import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'; 
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { authenticationService } from '@/Services';
import { history } from '@/Utilities';

import '@/Layouts/Header.css';
import Logo from '@/logo.png';

const Header = (props) => {
    const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);

    const logout = () => {
        authenticationService.logout();
        history.push('/login');
    }

    const hideSidebar = (e) => {
        e.preventDefault();
        props.handleToggle();
    }

    const userDropdown = (
        <div id="user-dropdown-div">
            <span id="user-dropdown-text">
                {currentUser.name}
            </span>
        </div>
    )

    return (
        <Navbar expand="lg" bg="white" variant="light" fixed="top" className="shadow-sm">
            <Button variant="link" id="menu" onClick={hideSidebar}>
                <FontAwesomeIcon icon="bars" />
            </Button>
            <Navbar.Brand>Woodpecker</Navbar.Brand>
            <Nav id="basic-navbar-nav" className="ml-auto">
                <NavDropdown title={userDropdown} id="basic-nav-dropdown" alignRight>
                    <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            
        </Navbar>
    )
}

export { Header };