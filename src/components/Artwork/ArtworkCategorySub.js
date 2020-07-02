import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import ArtworkCategoryNav from './ArtworkCategoryNav';

import artworkData from './data/jspectDB.json';

const ArtworkSubcategory = (props) => {
	const [category, setCategory] = useState([]);
	const [isSubcategory, setIsSubcategory] = useState(false);

	let thisCategory = artworkData.filter((work) => {
		return (
			work.artworkCategory ===
			window.location.href.split('/')[
				window.location.href.split('/').length - 1
			]
		);
	});


	let subCategories = thisCategory.reduce((r, a) => {
		r[a.artworkSubcategory] = [...(r[a.artworkSubcategory] || []), a];
		return r;
	}, {});


	let thisCategoryImagesHi = thisCategory.map((item) => {
		return (
			<Link to={`/artwork/${item.id}`}>
				<img alt={item.title} src={item.imgUrlHi} />
				<p>{item.title}</p>
			</Link>
		);
	});

	// check for subcategory
	thisCategory[0].artworkSubcategory === '' ||
	thisCategory[0].artworkSubcategory === null
		? console.log('no subcategory')
		: Object.keys(subCategories).filter((key) => {
				return key;
		  });


	return (
		<div className='artwork-subcat-container'>
			<Route
				path='*'
				render={() => {
					return <ArtworkCategoryNav />;
				}}
			/>
			<h1 className='artwork-category-heading'>
				{props.toTitleCase(
					window.location.href.split('/')[
						window.location.href.split('/').length - 1
					]
				)}
			</h1>
			<div className='artwork-gallery-section'>{thisCategoryImagesHi}</div>
		</div>
	);
};

export default ArtworkSubcategory;