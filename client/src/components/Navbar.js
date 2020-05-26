import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return(
        <Navbar collapseOnSelect expand="lg">
            <Link to="/">BootCamp Hub</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Register</Link>
                    <Link to="/profile">Profile</Link>
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Navigation;