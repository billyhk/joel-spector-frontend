import React, { useState, useEffect } from 'react';
import { APIURL } from '../../config';

import { Link, Route } from 'react-router-dom';
import ArtworkCategoryNav from './ArtworkCategoryNav';
import { MDBDataTableV5 } from 'mdbreact';
// import artworkData from './data/jspectDB.json';
import { MdFilterNone } from 'react-icons/md';

const ArtworkAll = (props) => {
	const [artwork, setArtwork] = useState([]);
	const [error, setError] = useState(false);

	let fullCategory = artwork.map((item) => {
		if (item.artworkSubcategory === '' || item.artworkSubcategory === null) {
			return props.toTitleCase(item.artworkCategory);
		} else {
			return `${props.toTitleCase(item.artworkCategory)}: ${props.toTitleCase(
				item.artworkSubcategory
			)}`;
		}
	});

	useEffect(() => {
		props.scrollUp();
		fetchMyApi();
		// eslint-disable-next-line
	}, []);

	async function fetchMyApi() {
		await fetch(`${APIURL}/api/work`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				// Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setArtwork(data);
			})
			.catch(() => {
				setError(true);
			});
	}

	const data = {
		columns: [
			{
				label: 'id',
				field: 'id',
				sort: 'asc',
				width: 50,
			},
			{
				label: 'Title',
				field: 'title',
				sort: 'asc',
				width: 800,
			},
			{
				label: 'Category',
				field: 'fullCategory',
				sort: 'asc',
				width: 400,
			},
		],
		rows: artwork.map((item, i) => {
			let idUrl = `/artwork/${item.id}`;

			return {
				id: item.id,
				title: [
					item.title,
					<Link to={idUrl} key={i}>
						<span className='click-for-detail'>{<MdFilterNone />}</span>
					</Link>,
				],
				fullCategory: fullCategory[i],
			};
		}),
	};
	return (
		<div className='artwork-subcat-container'>
			<Route
				path='*'
				render={() => {
					return <ArtworkCategoryNav token={props.token}/>;
				}}
			/>
			<div className='artwork-all-container'>
				<h1 id='all-artwork-heading-text'>All Works</h1>
				<div className='artwork-all-table'>
					<MDBDataTableV5
						hover
						striped
						bordered
						fixed
						entriesOptions={[10, 25, 50, 75, 100]}
						data={data}
						fullPagination
						pagingTop
						searchTop
						searchBottom={false}
						order={['title', 'asc']}
					/>
				</div>
			</div>
		</div>
	);
};

export default ArtworkAll;
