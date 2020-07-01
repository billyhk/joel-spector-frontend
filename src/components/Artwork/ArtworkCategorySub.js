import React from 'react';
import { Link, Route } from 'react-router-dom';
import ArtworkCategoryNav from './ArtworkCategoryNav'

const ArtworkSubcategory = (props) => {
	return (
		<div className='artwork-subcat-container'>
            <Route path='*' render={() => {
				return <ArtworkCategoryNav/>
			}}/>
		</div>
	);
};

export default ArtworkSubcategory;
/*
// filter by category

let portraitsIndividual = artwork.filter((work) => work.artworkCategory === 'portraits' && work.subCategory === 'individual')



*/