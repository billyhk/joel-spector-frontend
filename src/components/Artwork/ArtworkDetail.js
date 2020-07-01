import React, { useState, useEffect } from 'react';
import { APIURL } from '../../config';
import { Link, Route, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history';
import ArtworkCategoryNav from './ArtworkCategoryNav';

const ArtworkDetail = (props) => {
	const history = createHashHistory();

	const [artwork, setArtwork] = useState({});
	const [deleted, setDeleted] = useState(false);
	const [error, setError] = useState(false);
	const [fullCategory, setFullCategory] = useState('');
	const artworkId = props.match.params.id;

	useEffect(() => {
		props.scrollUp();
		fetchMyApi();
		// eslint-disable-next-line
	}, []);

	async function fetchMyApi() {
		const url = `${APIURL}/api/work/${artworkId}`;
		await fetch(url, {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((data) => {
				setArtwork(data);
				setFullCategory(
					data.artworkSubcategory !== ''
						? `${props.toTitleCase(data.artworkCategory)}: ${props.toTitleCase(
								data.artworkSubcategory
						  )}`
						: props.toTitleCase(data.artworkCategory)
				);
			})
			.catch(() => {
				setError(true);
			});
	}

	const onDeleteArtwork = (event) => {
		let confirm = prompt(
			"This action will delete the current work. Please type 'confirm' to delete",
			''
		);
		if (confirm === 'confirm') {
			const url = `${APIURL}/api/work/${artworkId}`;
			fetch(url, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			})
				.then((res) => {
					setDeleted(true);
				})
				.catch(console.error);
		}
	};

	if (deleted) {
		return history.goBack;
	}

	return (
		<div className='artwork-detail-container'>
			<Route
				path='*'
				render={() => {
					return <ArtworkCategoryNav />;
				}}
			/>

			<h1 className='artwork-form-heading'>{artwork.title}</h1>
			<h2>{fullCategory}</h2>
			{!artwork ? (
				<div className='loading'>Loading...</div>
			) : (
				<div>
					<Link
						className='btn btn-info item'
						to={`/artwork//edit`}
						onClick={props.scrollUp}>
						Update Artwork Information
					</Link>

					<button onClick={onDeleteArtwork} className='btn btn-danger item'>
						Delete Transaction
					</button>
				</div>
			)}
		</div>
	);
};

export default ArtworkDetail;
