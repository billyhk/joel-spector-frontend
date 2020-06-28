import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { APIURL } from '../../config';

import ArtworkCategoryNav from './ArtworkCategoryNav';
import ArtworkForm from './ArtworkForm';

const ArtworkCreate = (props) => {
	const initialArtworkState = {
		artworkCategory: '',
		title: '',
		imageUrl: '',
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

		setArtwork({
			...artwork,
			artworkCategory: fullCategory,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const url = `${APIURL}/artwork`;

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify(artwork),
		})
			.then((res) => res.json())
			.then((data) => {
				setCreatedId(data._id);
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
		(item) => {
			return <option value={item}>{props.toTitleCase(item)}</option>;
		}
	);

	let formSelectTag = (
		<select
			required
			// name='artworkCategory'
			className='form-input'
			id='artworkCategoryInput'
			onChange={(event) => {
				handleDropdownSelect(event);
			}}>
			<option selected disabled hidden>
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
	};

	const handleSecondaryDropdownSelect = (e) => {
		setFullCategory(
			`${props.toTitleCase(selectedCategory)}: ${props.toTitleCase(
				e.target.value
			)}`
		);
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
				<h1 className='artwork-form-heading'>Add Artwork</h1>
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
