import React, { useState } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { APIURL } from '../../config';

import ArtworkCategoryNav from './ArtworkCategoryNav';
import ArtworkForm from './ArtworkForm';

const ArtworkCreate = (props) => {
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

	const [artwork, setArtwork] = useState(initialArtworkState);
	const [fullCategory, setFullCategory] = useState('');

	const [createdId, setCreatedId] = useState(null);
	const [error, setError] = useState(false);

	const handleChange = (e) => {
		e.persist();
		if (e.target.value === '') {
			e.target.value = null;
		}
		setArtwork({
			...artwork,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		console.log('called');
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

	const [secondDropdown, setSecondDropdown] = useState(false);
	const [secondFormSelectTagOptions, setSecondFormSelectTagOptions] = useState(
		''
	);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [targetValue, setTargetValue] = useState([]);
	const artworkCategories = {
		portraits: ['individual', 'group', 'children'],
		paintings: ['people', 'nudes', 'scenes', 'still_life'],
		silverpoint: ['silverpoint'],
		works_on_paper: ['figures', 'nudes'],
	};

	const artworkCategoriesOptions = Object.keys(artworkCategories).map(
		(item, i) => {
			return <option key={i} value={item}>{props.toTitleCase(item)}</option>;
		}
	);

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
			<option defaultValue disabled hidden>
				Select Artwork Category
			</option>
			{artworkCategoriesOptions}
		</select>
	);

	const handleDropdownSelect = (e) => {
		if (artworkCategories[e.target.value].length === 1) {
			setFullCategory(props.toTitleCase(artworkCategories[e.target.value][0]));
		}
		setSelectedCategory(e.target.value);
		setTargetValue(artworkCategories[e.target.value]);
		setSecondDropdown(true);
		setSecondFormSelectTagOptions(
			artworkCategories[e.target.value].map((item) => {
				return <option value={item}>{props.toTitleCase(item)}</option>;
			})
		);
		artwork.artworkSubcategory = '';
	};

	const handleSecondaryDropdownSelect = (e) => {
		setFullCategory(
			`${props.toTitleCase(selectedCategory)}: ${props.toTitleCase(
				e.target.value
			)}`
		);
	};

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
			<main className='artwork-form-container'>
				<h1 id='artwork-form-heading-text'>Add Artwork</h1>
				<p className='artwork-form-subheading'>
					Please fill out the form below to add a new Joel Spector piece to the
					database.
				</p>
				{error && <p>Something went wrong... Please try again!</p>}
				<form className='artwork-form-form' onSubmit={handleSubmit}>
					<ArtworkForm
						artwork={artwork}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						toTitleCase={props.toTitleCase}
						setFullCategory={setFullCategory}
						setSecondDropdown={setSecondDropdown}
						formSelectTag={formSelectTag}
						secondDropdown={secondDropdown}
						targetValue={targetValue}
						handleSecondaryDropdownSelect={handleSecondaryDropdownSelect}
						secondFormSelectTagOptions={secondFormSelectTagOptions}
					/>
				</form>
			</main>
		</div>
	);
};

export default ArtworkCreate;
