import React, { Component } from 'react';
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

class NavbarPage extends Component {
	state = {
		isOpen: false,
	};

	toggleCollapse = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		return (
			<MDBNavbar color='light-blue' dark expand='md' id='navbar'>
				<MDBNavbarBrand>
					<strong className='nav-caption'>Joel Spector</strong>
				</MDBNavbarBrand>
				<MDBNavbarToggler onClick={this.toggleCollapse} />
				<MDBCollapse id='navbarCollapse3' isOpen={this.state.isOpen} navbar>
					<MDBNavbarNav left>
						<MDBNavItem>
							<MDBNavLink to='/' onClick={this.toggleCollapse}>Home</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBDropdown>
								<MDBDropdownToggle nav caret>
									<span className='mr-2'>Artwork</span>
								</MDBDropdownToggle>
								<MDBDropdownMenu>
									<MDBDropdownItem className='nav-dropdown-item'>
										{' '}
										<Link to='/artwork-category/portraits'>Portraits</Link>
									</MDBDropdownItem>

									<MDBDropdownItem className='nav-dropdown-item'>
										<Link to='/artwork-category/paintings'>Paintings</Link>
									</MDBDropdownItem>

									<MDBDropdownItem className='nav-dropdown-item'>
										<Link to='/artwork-category/silverpoint'>Silverpoint</Link>
									</MDBDropdownItem>

									<MDBDropdownItem className='nav-dropdown-item'>
										<Link to='/artwork-category/works_on_paper'>
											Works on Paper
										</Link>
									</MDBDropdownItem>

									<div className='nav-second-category'>
										<MDBDropdownItem className='nav-dropdown-item'>
											<Link to='/artwork-all'>All Works</Link>
										</MDBDropdownItem>

										<MDBDropdownItem className='nav-dropdown-item'>
											<Link to='/artwork-create'>Add (+)</Link>
										</MDBDropdownItem>
									</div>
								</MDBDropdownMenu>
							</MDBDropdown>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink to='/signin' onClick={this.toggleCollapse}>Sign In</MDBNavLink>
						</MDBNavItem>
						{/* <MDBNavItem>
							<MDBNavLink to='#!'>The Joel Spector Foundation</MDBNavLink>
						</MDBNavItem>

						<MDBNavItem>
							<MDBNavLink to='#!'>Merchandise</MDBNavLink>
						</MDBNavItem> */}
					</MDBNavbarNav>
				</MDBCollapse>
			</MDBNavbar>
		);
	}
}

export default NavbarPage;
