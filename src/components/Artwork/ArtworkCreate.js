import React, { useState } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { APIURL } from '../../config';

import ArtworkCategoryNav from './ArtworkCategoryNav';
import ArtworkForm from './ArtworkForm';

const ArtworkCreate = (props) => {
	// initialize the form data with empty strings
	const initialArtworkState = {
		artworkCategory: '',
		artworkSubcategory: '',
		title: '',
		imgUrlHi: '',
		date: '',
		sizeHeight: '',
		sizeWidth: '',
		description: '',
	};

	// initialize the POST data with the empty form
	const [artwork, setArtwork] = useState(initialArtworkState);

	// set createdID of new work after POST request to be used for Redirect to detail
	const [createdId, setCreatedId] = useState(null);
	const [error, setError] = useState(false);

	// use the POST request link from the drag and drop component to send the image url with the artwork form data
	const [imgUrl, setImgUrl] = useState('');

	// update state whenever the input value changes
	const handleChange = (e) => {
		e.persist();
		if (e.target.value === '') {
			e.target.value = null;
		}
		setArtwork({
			...artwork,
			imgUrlHi: imgUrl,
			[e.target.name]: e.target.value,
		});
	};

	// make a POST request to submit a new artwork, save the new id to use for <Redirect /> later
	const handleSubmit = (e) => {
		e.preventDefault();
		const url = `${APIURL}/api/work`;

		fetch(url, {
			method: 'POST',
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

	// create options for dropdown menus for artwork categories and subcategories
	const artworkCategories = {
		portraits: ['individual', 'group', 'children'],
		paintings: ['people', 'nudes', 'scenes', 'still_life'],
		silverpoint: ['silverpoint'],
		works_on_paper: ['figures', 'nudes'],
	};

	// construct the options tag for the first dropdown menu (categories)
	const artworkCategoriesOptions = Object.keys(artworkCategories).map(
		(item, i) => {
			return (
				<option key={i} value={item}>
					{props.toTitleCase(item)}
				</option>
			);
		}
	);

	// set the corresponding subcategories array based on the selected item from the first dropdown
	const [targetValue, setTargetValue] = useState([]);

	// dynamically render a second dropdown for subcategories after a category is chosen from the first dropdown
	const [secondDropdown, setSecondDropdown] = useState(false);

	// render the correct subcategory options based on the chosen category from the first dropdown
	const [secondFormSelectTagOptions, setSecondFormSelectTagOptions] = useState(
		''
	);

	// build the jsx for the first dropdown menu in the form (choose category)
	let formSelectTag = (
		<select
			required
			className='form-input'
			id='artworkCategoryInput'
			name='artworkCategory'
			onChange={(event) => {
				handleDropdownSelect(event);
				handleChange(event);
			}}>
			<option defaultValue hidden>
				Select Artwork Category
			</option>
			{artworkCategoriesOptions}
		</select>
	);

	// when an item in the first dropdown is selected, the second dropdown
	const handleDropdownSelect = (e) => {
		setSecondDropdown(true);
		setSecondFormSelectTagOptions(
			artworkCategories[e.target.value].map((item) => {
				return <option value={item}>{props.toTitleCase(item)}</option>;
			})
		);
		// clear the value of artworkSubcategory if the category selection is changed
		artwork.artworkSubcategory = '';
	};

	// if the item was created in the db, redirect user to its detail page
	if (createdId) {
		return <Redirect to={`/artwork/${createdId}`} />;
	}

	return (
		<div className='artwork-subcat-container'>
			<Route
				path='*'
				render={() => {
					return <ArtworkCategoryNav />;
				}}
			/>
			{props.token || localStorage.getItem('token') ? (
				<main className='artwork-form-container'>
					<h1 id='artwork-form-heading-text'>Add Artwork</h1>
					<p className='artwork-form-subheading'>
						Please fill out the form below to add a new Joel Spector piece to
						the database.
					</p>
					{error && <p>Something went wrong... Please try again!</p>}
					<form className='artwork-form-form' onSubmit={handleSubmit}>
						<ArtworkForm
							artwork={artwork}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
							toTitleCase={props.toTitleCase}
							setSecondDropdown={setSecondDropdown}
							formSelectTag={formSelectTag}
							secondDropdown={secondDropdown}
							targetValue={targetValue}
							secondFormSelectTagOptions={secondFormSelectTagOptions}
							setImgUrl={setImgUrl}
						/>
					</form>
				</main>
			) : (
				<p className='not-logged-in-message'>
					Sorry, you must be logged in to view this page.
				</p>
			)}{' '}
		</div>
	);
};

export default ArtworkCreate;
