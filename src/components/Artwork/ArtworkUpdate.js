import React, { useState, useEffect } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { APIURL } from '../../config';
import { createHashHistory } from 'history';

import ArtworkCategoryNav from './ArtworkCategoryNav';
import ArtworkForm from './ArtworkForm';

const ArtworkUpdate = (props) => {
	const history = createHashHistory();

	const [artwork, setArtwork] = useState({});
	const [createdId, setCreatedId] = useState(null);

	const [error, setError] = useState(false);

	const artworkId = props.match.params.id;
	const [fullCategory, setFullCategory] = useState('');

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

	let formSelectTag = <h3>{fullCategory}</h3>;

	const handleChange = (e) => {
		e.persist();
		setArtwork({
			...artwork,
			artworkCategory: artwork.artworkCategory,
			artworkSubcategory: artwork.artworkSubcategory,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const url = `${APIURL}/api/work/${artworkId}`;

		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify(artwork),
		})
			.then((res) => res.json())
			.then((data) => {
				setCreatedId(data.id);
			})
			.catch(() => {
				setError(true);
			});
	};

	return (
		<div className='artwork-subcat-container'>
			<Route
				path='*'
				render={() => {
					return <ArtworkCategoryNav />;
				}}
			/>
			<main className='artwork-form-container'>
            <h1 id='artwork-form-heading-text'>Update Artwork id: {artwork.id}</h1>
				<p className='artwork-form-subheading'>
					Please fill out the form below to update information on this piece.
				</p>
				{error && <p>Something went wrong... Please try again!</p>}
				<form className='artwork-form-form' onSubmit={handleSubmit}>
					<ArtworkForm
						artwork={artwork}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						toTitleCase={props.toTitleCase}
					/>
				</form>
			</main>
		</div>
	);
};

export default ArtworkUpdate;
