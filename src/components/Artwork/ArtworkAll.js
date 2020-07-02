import React from 'react';
import { Link, Route } from 'react-router-dom';
import ArtworkCategoryNav from './ArtworkCategoryNav';
import { MDBDataTableV5 } from 'mdbreact';
import artworkData from './data/jspectDB.json';
import { MdFilterNone } from 'react-icons/md';

const ArtworkAll = (props) => {
	let fullCategory = artworkData.map((item) => {
		if (item.artworkSubcategory === '' || item.artworkSubcategory === null) {
			return props.toTitleCase(item.artworkCategory);
		} else {
			return `${props.toTitleCase(item.artworkCategory)}: ${props.toTitleCase(
				item.artworkSubcategory
			)}`;
		}
	});

	// console.log(
	// 	artworkData.map((item, i) => {
	// 		let idUrl = `/artwork/${item.id}`;

	// 		return {
	// 			id: [item.id, <Link to={idUrl}></Link>],
	// 			title: item.title,
	// 			// date: item.date,
	// 			fullCategory: fullCategory[i],
	// 		};
	// 	})
	// );

	const data = {
		columns: [
			{
				label: 'id',
				field: 'id',
				sort: 'asc',
				width: 150,
			},
			{
				label: 'Title',
				field: 'title',
				sort: 'asc',
				width: 400,
			},
			{
				label: 'Full Category',
				field: 'fullCategory',
				sort: 'asc',
				width: 400,
			},
		],
		rows: artworkData.map((item, i) => {
			let idUrl = `/artwork/${item.id}`;

			return {
				id: item.id,
				title: [
					item.title,
					<Link to={idUrl}>
						<span className='click-for-detail'>{<MdFilterNone />}</span>
					</Link>,
				],
				fullCategory: fullCategory[i],
			};
		}),
	};
	// <Link to={idUrl}>{item.id}</Link>
	return (
		<div className='artwork-subcat-container'>
			<Route
				path='*'
				render={() => {
					return <ArtworkCategoryNav />;
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
