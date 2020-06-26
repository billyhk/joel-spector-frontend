import React, { Component } from 'react';
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavItem,
	MDBNavLink,
	MDBNavbarToggler,
	MDBCollapse,
	MDBFormInline,
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownMenu,
	MDBDropdownItem,
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

class NavbarPage extends Component {
	state = {
		isOpen: false,
	};

	toggleCollapse = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		return (
			<Router>
				<MDBNavbar color='light-blue' dark expand='md' id='navbar'>
					<MDBNavbarBrand>
						<strong className='nav-caption'>Joel Spector</strong>
					</MDBNavbarBrand>
					<MDBNavbarToggler onClick={this.toggleCollapse} />
					<MDBCollapse id='navbarCollapse3' isOpen={this.state.isOpen} navbar>
						<MDBNavbarNav right>
							<MDBNavItem active>
								<MDBNavLink to='#!'>Home</MDBNavLink>
							</MDBNavItem>
							<MDBNavItem>
								<MDBNavLink to='#!'>The Joel Spector Foundation</MDBNavLink>
							</MDBNavItem>

							<MDBNavItem>
								<MDBDropdown>
									<MDBDropdownToggle nav caret>
										<span className='mr-2'>Artwork</span>
									</MDBDropdownToggle>
									<MDBDropdownMenu>
										<MDBDropdownItem href='#!'>Portraits</MDBDropdownItem>
										<MDBDropdownItem href='#!'>Paintings</MDBDropdownItem>
										<MDBDropdownItem href='#!'>Silverpoint</MDBDropdownItem>
										<MDBDropdownItem href='#!'>Works on Paper</MDBDropdownItem>
									</MDBDropdownMenu>
								</MDBDropdown>
							</MDBNavItem>
							<MDBNavItem>
								<MDBNavLink to='#!'>Merchandise</MDBNavLink>
							</MDBNavItem>
						</MDBNavbarNav>
					</MDBCollapse>
				</MDBNavbar>
			</Router>
		);
	}
}

export default NavbarPage;
