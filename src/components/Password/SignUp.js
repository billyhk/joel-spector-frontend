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
	const [error, setError] = useState(false);
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);
	const [dropdownResult, setDropdownResult] = useState(null)

	const handleDropdownSelect = (e) => {
			setDropdownResult(e.target.value === 'Yes' ? (
				<>
					<label className='sign-in-text'>Administrator Password</label>
					<input
						required
						type='password'
						id='adminPassword'
						name='adminPassword'
						onChange={handleChange}
					/>
				</>
			) : (
				<p>We're sorry. Currently you must be an Administrator to hold an account.</p>
			));
	};

	const checkPassword = (e) => {
		e.preventDefault();
		setSubmit(true);
		user.password === user.passwordConfirm ? setValid(true) : setValid(false);
		user.adminPassword === process.env.ADMIN_KEY
			? setAdminValid(true)
			: setAdminValid(false);
		if (
			user.adminPassword === process.env.ADMIN_KEY &&
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
					setError(true);
				}
			})
			.catch(console.error);
	};

	if (redirectToReferrer) {
		return <Redirect to='/signin' />;
	}

	return (
		<div className='loggin-container'>
			<form onSubmit={checkPassword} id='sign-in-form'>
				<p className='loggin-form-title'>Sign up</p>
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
				<label className='sign-in-text'>
					Are You Signing Up As An Administrator?
				</label>

				<select
					required
					className='form-input'
					onChange={(e) => {
						handleDropdownSelect(e);
					}}>
					<option defaultValue hidden>
						Select One
					</option>
					<option>Yes</option>
					<option>No</option>
				</select>

				{dropdownResult}
				<br />

				<div>
					<button type='submit'>Submit</button>
					<Link to='/signin'>
						Already have an account? Click here to sign in
					</Link>

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
					{error && (
						<p className='sign-up-error'>
							That username has been taken already. Please choose a different
							one.
						</p>
					)}
				</div>
			</form>
		</div>
	);
};

export default SignUp;
