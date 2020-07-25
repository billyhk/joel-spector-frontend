import React, { useState, useEffect } from 'react';
import { APIURL } from '../../config';
import { Link, Redirect } from 'react-router-dom';

const User = (props) => {
	const [user, setUser] = useState(null);
	const [deleted, setDeleted] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		props.scrollUp();
		fetch(`${APIURL}/api/user`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${props.token}`,
				// Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then((response) => response.json())
			.then(setUser)
			.catch(() => {
				setError(true);
			});
		// eslint-disable-next-line
	}, []);

	const onDeleteUser = (event) => {
		let confirm = prompt(
			"This action will delete the current user. Please type 'confirm' to delete",
			''
		);
		if (confirm === 'confirm') {
			fetch(`${APIURL}/api/user`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${props.userToken}`,
				},
			})
				.then((res) => {
					setDeleted(true);
				})
				.catch(console.error);
		}
	};
	if (deleted) {
		props.handleSignOut();
		return <Redirect to='/' />;
	}
	return (
		<div className='user-account-wrapper'>
			{!user ? (
				<div className='home-title'>Loading...</div>
			) : (
				<div>
					<p>
						<span className='user-detail-header'>Account Information</span>
					</p>
					<div className='user-account-info'>
						<p>
							<span className='user-detail-key'>Username:</span>
						</p>
						<p>
							<span className='user-detail-value'>{user.username}</span>
						</p>
					</div>
					<div className='user-detail-buttons'>
						<div className='mt-5 link'>
							<Link
								className='btn btn-info item'
								to='/user/edit'
								onClick={props.scrollUp}>
								Update Account Information
							</Link>
						</div>
						<button onClick={onDeleteUser} className='btn btn-danger item'>
							Delete Account
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default User;
