import React, { useState, setState } from 'react';
import { APIURL } from '../../config';
import { Redirect, Link } from 'react-router-dom';

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

const SignIn = (props) => {
	const initialUserState = {
		username: '',
		password: '',
	};
	const [user, setUser] = useState(initialUserState);
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);
	const [signInError, setSignInError] = useState(false);
	const [submit, setSubmit] = useState(false);

	const handleChange = (e) => {
		e.persist();
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const signIn = (e) => {
		e.preventDefault();
		setSubmit(true);
		fetch(`${APIURL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.headers.get('authorization'))
			.then((token) => {
				console.log(token);
				if (token) {
					props.setToken(token);
					localStorage.setItem('token', token);
					setRedirectToReferrer(true);
				} else {
					setSignInError(true);
				}
			})
			.catch(console.error);
	};

	if (redirectToReferrer) {
		// return <Redirect to='/user' />;
		return <Redirect to='/' />;
	}

	return (
		<div className='loggin-container'>
			<form onSubmit={signIn} id='sign-in-form'>
				<p className='loggin-form-title'>Sign in</p>
				<label className='sign-in-text'>Username</label>
				<input
					required
					type='username'
					id='username'
					name='username'
					value={user.username}
					onChange={handleChange}
				/>
				<br />
				<label className='sign-in-text'>Password</label>
				<input
					required
					type='password'
					id='password'
					name='password'
					value={user.password}
					onChange={handleChange}
				/>
				<div>
					<button type='submit'>Login</button>
					<Link to='/signup'>
						<p>Don't have an account? Click here to sign up.</p>
					</Link>
				</div>
				{signInError && submit ? (
					<p className='sign-in-error'>
						User information not found. Please try again.
					</p>
				) : null}
			</form>
		</div>
	);
};

export default SignIn;
