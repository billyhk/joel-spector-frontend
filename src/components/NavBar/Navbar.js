import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const Navbar = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleCollapse = () => {
		if (isOpen === false) {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	};

	return (
		<MDBNavbar color='light-blue' dark expand='md' id='navbar'>
			<MDBNavbarBrand>
				<strong className='nav-caption'>Joel Spector</strong>
			</MDBNavbarBrand>
			<MDBNavbarToggler onClick={toggleCollapse} />
			<MDBCollapse id='navbarCollapse3' isOpen={isOpen} navbar>
				<MDBNavbarNav left>
					<MDBNavItem>
						<MDBNavLink to='/' onClick={toggleCollapse}>
							Home
						</MDBNavLink>
					</MDBNavItem>
					<MDBNavItem>
						<MDBDropdown>
							<MDBDropdownToggle nav caret>
								<span className='mr-2'>Artwork</span>
							</MDBDropdownToggle>
							<MDBDropdownMenu>
								<MDBDropdownItem href='/artwork-category/portraits'>
									Portraits
								</MDBDropdownItem>

								<MDBDropdownItem href='/artwork-category/paintings'>
									Paintings
								</MDBDropdownItem>

								<MDBDropdownItem href='/artwork-category/silverpoint'>
									Silverpoint
								</MDBDropdownItem>

								<MDBDropdownItem href='/artwork-category/works_on_paper'>
									Works on Paper
								</MDBDropdownItem>

								<div className='nav-second-category'>
									<MDBDropdownItem href='/artwork-all'>
										All Works
									</MDBDropdownItem>
									{props.token || localStorage.getItem('token') ? (
										<MDBDropdownItem href='/artwork-create'>
											Add (+)
										</MDBDropdownItem>
									) : null}{' '}
								</div>
							</MDBDropdownMenu>
						</MDBDropdown>
					</MDBNavItem>
					<MDBNavItem onClick={toggleCollapse}>
						{props.token || localStorage.getItem('token') ? (
							<MDBNavLink to='/' onClick={props.handleSignOut}>
								Sign Out
							</MDBNavLink>
						) : (
							<MDBNavLink to='/signin'>Sign In</MDBNavLink>
						)}{' '}
					</MDBNavItem>

					{/* <MDBNavItem>
							<MDBNavLink to='#!'>The Joel Spector Foundation</MDBNavLink>
						</MDBNavItem>

						<MDBNavItem>
							<MDBNavLink to='#!'>Merchandise</MDBNavLink>
						</MDBNavItem> */}
				</MDBNavbarNav>
				<MDBNavbarNav right>
					<MDBNavItem>
						{props.token || localStorage.getItem('token') ? (
							<h3>Logged in as Admin</h3>
						) : null}
					</MDBNavItem>
				</MDBNavbarNav>
			</MDBCollapse>
		</MDBNavbar>
	);
};

export default Navbar;
/*
import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <Router>
      <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="#!">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Features</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Pricing</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Dropdown</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
    );
  }
}

export default NavbarPage; */
