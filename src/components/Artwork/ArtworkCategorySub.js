import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { APIURL } from '../../config';
import ArtworkCategoryNav from './ArtworkCategoryNav';

// import artworkData from './data/jspectDB.json';

const ArtworkSubcategory = (props) => {
	const [category, setCategory] = useState([]);
	const [isSubcategory, setIsSubcategory] = useState(false);
	// const [artwork, setArtwork] = useState([]);
	const [error, setError] = useState(false);

	// useEffect(() => {
	// 	fetch(`${APIURL}/api/work`, {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Accept: 'application/json',
	// 				// Authorization: `Bearer ${localStorage.getItem('token')}`,
	// 			},
	// 		})
	// 			.then((response) => response.json())
	// 			.then((data) => {
	// 				setArtwork(data);
	// 			})
	// 			.catch(() => {
	// 				setError(true);
	// 			});

	// 	// eslint-disable-next-line
	// }, []);

	// set the current category of art based on the url path
	let thisCategory = props.artwork.filter((work) => {
		return (
			work.artworkCategory ===
			window.location.href.split('/')[
				window.location.href.split('/').length - 1
			]
		);
	});

	//reduce the full array of artworkCategory to multiple subcategory arrays
	let subCategories = thisCategory.reduce((r, a) => {
		r[a.artworkSubcategory] = [...(r[a.artworkSubcategory] || []), a];
		return r;
	}, {});

	// the gallery of images for each category
	// this is the jsx that we need for this page

	// if there's no subcategory, just return the full gallery for this category, otherwise return the items divided by their subCategory

/* UNCATEGORIZED GALLERY */	
	let thisCategoryGallery = thisCategory.map((item) => {
		return (
			<Link to={`/artwork/${item.id}`}>
				<img
					alt={item.title}
					src={item.imgUrlLo ? item.imgUrlLo : item.imgUrlHi}
				/>
				<p>{item.title}</p>
			</Link>
		);
	});

	/*
	// CATEGORIZED GALLERY
		let thisCategoryGallery;

	if (
		thisCategory[0].artworkSubcategory !== '' ||
		thisCategory[0].artworkSubcategory !== null
	) {
		thisCategoryGallery = Object.entries(subCategories).map(([key, value]) => {
			value.map((item) => {
				// console.log(item.title, item.artworkSubcategory);
				return (
					<Link to={`/artwork/${item.id}`}>
						<img
							alt={item.title}
							src={item.imgUrlLo ? item.imgUrlLo : item.imgUrlHi}
						/>
						<p>{item.title}</p>
					</Link>
				);
			});
		});
	} else {
		thisCategoryGallery = thisCategory.map((item) => {
			// console.log(item.title);
			return (
				<Link to={`/artwork/${item.id}`}>
					<img
						alt={item.title}
						src={item.imgUrlLo ? item.imgUrlLo : item.imgUrlHi}
					/>
					<p>{item.title}</p>
				</Link>
			);
		});
	}

	console.log(thisCategoryGallery)

	*/

	// Object.keys(subCategories).map((key) => {
	// 	return console.log(key);
	// });
	// }
	// else {
	// 	Object.keys(subCategories).map((subCategory) => {
	// 		console.log(subCategory);
	// 		return (
	// 			<>
	// 				<h3>{props.toTitleCase(subCategory)}</h3>
	// 				{item.artworkSubcategory === subCategory ? (
	// 					<Link to={`/artwork/${item.id}`}>
	// 						<img
	// 							alt={item.title}
	// 							src={item.imgUrlLo ? item.imgUrlLo : item.imgUrlHi}
	// 						/>
	// 						<p>{item.title}</p>
	// 					</Link>
	// 				) : null}
	// 			</>
	// 		);
	// 	});
	// }
	// });

	// check for subcategory, if it's an empty string or null then there is none
	// thisCategory[0].artworkSubcategory === '' ||
	// thisCategory[0].artworkSubcategory === null
	// 	? console.log('no subcategory')
	// 	: Object.keys(subCategories).filter((key) => {
	// 		console.log(key)
	// 			return key;
	// 	  });

	// isolate categories without subs
	// Object.keys(subCategories).filter((key) => {
	// 	if (
	// 		thisCategory[0].artworkSubcategory === '' ||
	// 		thisCategory[0].artworkSubcategory === null
	// 	) {
	// 		console.log(key);
	// 	}
	// });

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
			<div className='artwork-gallery-section'>{thisCategoryGallery}</div>
		</div>
	);
};

export default ArtworkSubcategory;
