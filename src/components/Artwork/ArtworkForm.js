import React, { useState, useEffect } from 'react';

const ArtworkForm = (props) => {
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
						name='artworkCategory'
						className='form-input'
						id='artworkSubcategoryInput'
						onChange={(event) => {
							props.handleSecondaryDropdownSelect(event);
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
			<input
				required
				onChange={props.handleChange}
				name='imageUrl'></input>{' '}
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
			<label id='description-label'>Description (optional)</label>
			<input onChange={props.handleChange} name='description'></input>
			<button className='btn btn-blue' type='submit'>
				Submit
			</button>
		</>
	);
};

export default ArtworkForm;
