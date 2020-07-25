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
	const [hasToken, setHasToken] = useState(false);

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

{									props.token || localStorage.getItem('token') ? (<MDBDropdownItem className='nav-dropdown-item'>
										<Link to='/artwork-create'>Add (+)</Link>
									</MDBDropdownItem>) : null
}								</div>
							</MDBDropdownMenu>
						</MDBDropdown>
					</MDBNavItem>
					<MDBNavItem onClick={toggleCollapse}>
						{props.token || localStorage.getItem('token') ? (
							<MDBNavLink to='/signin' onClick={props.handleSignOut}>
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
						{props.token || localStorage.getItem('token')
							? `Logged in as Admin`
							: null}
					</MDBNavItem>
				</MDBNavbarNav>
			</MDBCollapse>
		</MDBNavbar>
	);
};

export default Navbar;
