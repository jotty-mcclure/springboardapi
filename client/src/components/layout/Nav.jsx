import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter, Link } from 'react-router-dom';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTachometer, faHome } from '@fortawesome/fontawesome-free-solid';

export default class Navigation extends React.Component {
    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                <div className="sidebar-collapse">
                    <Nav vertical id="side-menu">
                        <NavItem>
                            <Link to="/" className="nav-link">
                                <FontAwesomeIcon icon='home' />
                                <span className="nav-label">Home</span>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/about" className="nav-link">
                                <FontAwesomeIcon icon='tachometer-alt' />
                                <span className="nav-label">About</span>
                            </Link>
                        </NavItem>
                    </Nav>
                </div>
            </nav>
        );
    }
}