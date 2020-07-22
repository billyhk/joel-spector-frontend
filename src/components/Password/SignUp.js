import React, { useState, setState } from 'react';
import { APIURL } from '../../config';
import { Redirect, Link } from 'react-router-dom';

const SignUp = (props) => {
	const initialUserState = {
		username: '',
		password: '',
		passwordConfirm: '',
		adminPassword: '',
	};
	const [user, setUser] = useState(initialUserState);

	const [adminValid, setAdminValid] = useState(true);
	const [valid, setValid] = useState(true);
	const [submit, setSubmit] = useState(false);
	const [error, setError] = useState(false)
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);

	const checkPassword = (e) => {
		e.preventDefault();
		setSubmit(true);
		user.password === user.passwordConfirm ? setValid(true) : setValid(false);
		user.adminPassword === 'jspect2020'
			? setAdminValid(true)
			: setAdminValid(false);
		if (
			user.adminPassword === 'jspect2020' &&
			user.password === user.passwordConfirm
		) {
			setAdminValid(true);
			setValid(true);
			handleSubmit();
		} 
	};

	// const handleKeyDown = (e) => {
	// 	if (e.key === 'Enter') {
	// 		checkPassword();
	// 	}
	// };

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		fetch(`${APIURL}/api/user/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: user.username,
				password: user.password,
			}),
		})
			// .then((res) => res.json())
			.then((res) => {
				if (res.status === 200) {
					setRedirectToReferrer(true);
				} else {
					setError(true)
				}
			})
			.catch(console.error);
	};

	if (redirectToReferrer) {
		return <Redirect to='/signin' />;
	}

	return (
		<form onSubmit={checkPassword} id='sign-up-form'>
			<p>Sign up</p>
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
			<br />
			<label className='sign-in-text'>Confirm Password</label>
			<input
				required
				type='password'
				id='passwordConfirm'
				name='passwordConfirm'
				value={user.passwordConfirm}
				onChange={handleChange}
			/>
			<br />
			<label className='sign-in-text'>Administrator Password</label>
			<input
				required
				type='password'
				id='adminPassword'
				name='adminPassword'
				value={user.adminPassword}
				onChange={handleChange}
			/>
			<br />

			<div>
				<button type='submit'>Submit</button>
				<Link to='/signin'>Already have an account? Click here to sign in</Link>

				{submit && (
					<p className={valid ? 'valid' : 'invalid'}>
						{valid ? null : 'Passwords Must Match'}
					</p>
				)}
				{submit && (
					<p className={adminValid ? 'valid' : 'invalid'}>
						{' '}
						{adminValid ? null : 'Administrator Password is Incorrect'}
					</p>
				)}
				{error && <p className='sign-up-error'>
					That username has been taken already. Please choose a different one.
				</p>}
			</div>
		</form>
	);
};

export default SignUp;