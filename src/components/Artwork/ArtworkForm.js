import React, { useState, useEffect } from 'react';
import { createHashHistory } from 'history';

const ArtworkForm = (props) => {
	const history = createHashHistory();

	useEffect(() => {
		props.setSecondDropdown(false);
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<label className='form-label'>Artwork Category</label>
			{props.formSelectTag}
			{props.secondDropdown === true && props.targetValue.length > 1 ? (
				<>
					<label className='form-label'>Artwork Subcategory</label>
					<select
						required
						name='artworkSubcategory'
						className='form-input'
						id='artworkSubcategoryInput'
						onChange={(event) => {
							props.handleSecondaryDropdownSelect(event);
							props.handleChange(event);
						}}>
						{' '}
						<option selected disabled hidden>
							Select Subcategory
						</option>
						{props.secondFormSelectTagOptions}
					</select>
				</>
			) : null}
			<label>Title</label>
			<input required onChange={props.handleChange} name='title'></input>
			<label>Image URL</label>
			<div className='size-inputs'>
				<div className='size-inputs-labels'>
					<label>High Resolution:</label>
					<label>Low (optional):</label>
				</div>
				<div className='size-inputs-inputs'>
					<input required onChange={props.handleChange} name='imgUrlHi'></input>{' '}
					<input onChange={props.handleChange} name='imgUrlLo'></input>{' '}
				</div>
			</div>
			<label>Date</label>
			<input
				required
				onChange={props.handleChange}
				type='date'
				name='date'></input>
			<label>Dimensions: Height (inches)</label>
			<div className='size-inputs'>
				<div className='size-inputs-labels'>
					<label>Height:</label>
					<label>Length:</label>
				</div>
				<div className='size-inputs-inputs'>
					<input
						onChange={props.handleChange}
						type='number'
						min='0'
						name='sizeHeight'></input>{' '}
					<input
						onChange={props.handleChange}
						type='number'
						min='0'
						name='sizeWidth'></input>
				</div>
			</div>
			<label>Description (optional)</label>
			<input onChange={props.handleChange} name='description'></input>
			<button className='btn btn-blue' type='submit'>
				Submit
			</button>
			<button
				className='btn btn-dark'
				id='cancel-button'
				onClick={history.goBack}>
				Cancel and Go Back
			</button>
		</>
	);
};

export default ArtworkForm;
