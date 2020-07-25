import React, { useState, useEffect } from 'react';
import { APIURL } from '../../config';
import { Link, Route, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history';
import ArtworkCategoryNav from './ArtworkCategoryNav';

// import artworkData from './data/jspectDB.json';

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
					data.artworkSubcategory === '' || data.artworkSubcategory === null
						? props.toTitleCase(data.artworkCategory)
						: `${props.toTitleCase(data.artworkCategory)}: ${props.toTitleCase(
								data.artworkSubcategory
						  )}`
				);
			})
			.catch(() => {
				setError(true);
			});
	}
	console.log(artwork);

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
		return <Redirect to={`/artwork-all`} />;
	}

	// console.log(artworkId,
	// 	artworkData.map((item) => {
	// 		if (item.id === artworkId) {
	// 			return item;
	// 		}
	// 	})
	// );

	return (
		<div className='artwork-detail-container-container'>
			<Route
				path='*'
				render={() => {
					return <ArtworkCategoryNav />;
				}}
			/>

			{!artwork ? (
				<div className='loading'>Loading...</div>
			) : (
				<div className='artwork-detail-container'>
					<img alt={artwork.title} src={artwork.imgUrlHi} />
					<div className='artwork-detail-headings-container'>
						<h1 className='artwork-detail-title'>{artwork.title}</h1>
						<h2 className='artwork-detail-fullCategory'>{`\u00b7${fullCategory}\u00b7`}</h2>
						<h3 className='artwork-detail-size'>{`${artwork.sizeWidth}"w x ${artwork.sizeHeight}"h`}</h3>
						<h4 className='artwork-detail-description'>
							{artwork.description}
						</h4>
					</div>

					<div className='artwork-detail-buttons-container'>
						<button
							className='btn btn-dark'
							id='cancel-button'
							onClick={history.goBack}>
							Go Back
						</button>
						{props.token || localStorage.getItem('token') ? (
							<Link
								className='btn btn-info item'
								to={`/artwork/${artworkId}/edit`}
								onClick={props.scrollUp}>
								Update Artwork Information
							</Link>
						) : null}{' '}
					</div>

					{props.token || localStorage.getItem('token') ? (
						<button onClick={onDeleteArtwork} className='btn btn-danger item'>
							Delete This Work
						</button>
					) : null}
				</div>
			)}
		</div>
	);
};

export default ArtworkDetail;
