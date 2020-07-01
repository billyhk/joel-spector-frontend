import React from 'react';
import { Link, Route } from 'react-router-dom';
import ArtworkCategoryNav from './ArtworkCategoryNav';
import { MDBDataTableV5 } from 'mdbreact';
import artworkData from './data/jspectDB.json';

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

	console.log(
		artworkData.map((item, i) => {
			return {
				// id: item.id,
				title: item.title,
				date: item.date,
				fullCategory: fullCategory[i],
			};
		})
	);

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
			return {
				id: item.id,
				title: item.title,
				fullCategory: fullCategory[i],
			};
		}),
	};

	return (
		<div className='artwork-subcat-container'>
			<Route
				path='*'
				render={() => {
					return <ArtworkCategoryNav />;
				}}
			/>
			<div className='artwork-all-container'>
				<h1 className='artwork-form-heading'>All Works</h1>
				<div className='artwork-all-table'>
					<MDBDataTableV5 striped bordered data={data} fullPagination />
				</div>
			</div>
		</div>
	);
};

export default ArtworkAll;
