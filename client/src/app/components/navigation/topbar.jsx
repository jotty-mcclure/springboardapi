import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import auth from '../../_utilities/auth';

export default class Topbar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <Navbar id="topbar" color="light" className="absolute-top" light expand="md">
                <NavbarBrand href="/"></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="#"><i className="fas fa-cog"></i></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#"><i className="fas fa-database"></i></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" onClick={() => { auth.clearAppStorage(); }}><i className="fas fa-sign-out-alt"></i></NavLink>
                        </NavItem>
                        {/* <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> */}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}