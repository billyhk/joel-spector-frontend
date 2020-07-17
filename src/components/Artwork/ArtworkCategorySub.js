import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { APIURL } from '../../config';
import ArtworkCategoryNav from './ArtworkCategoryNav';

// import artworkData from './data/jspectDB.json';

const ArtworkSubcategory = (props) => {
	const [artwork, setArtwork] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		props.scrollUp();
		fetchMyApi();
		// eslint-disable-next-line
	}, []);

	async function fetchMyApi() {
		await fetch(`${APIURL}/api/work`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				// Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setArtwork(data);
			})
			.catch(() => {
				setError(true);
			});
	}

	// set the current category of art based on the url path
	let thisCategory = artwork.filter((work) => {
		return (
			work.artworkCategory ===
			window.location.href.split('/')[
				window.location.href.split('/').length - 1
			]
		);
	});

	// if (
	// 	thisCategory[0].artworkSubcategory !== '' ||
	// 	thisCategory[0].artworkSubcategory !== null
	// ) {
	// 	setIsSubcategory(false);
	// } else {
	// 	setIsSubcategory(true);
	// }

	//reduce the full array of artworkCategory to multiple subcategory arrays
	let subCategories = thisCategory.reduce((r, a) => {
		r[a.artworkSubcategory] = [...(r[a.artworkSubcategory] || []), a];
		return r;
	}, {});

	// the gallery of images for each category
	// this is the jsx that we need for this page

	// if there's no subcategory, just return the full gallery for this category, otherwise return the items divided by their subCategory

	/* UNCATEGORIZED GALLERY */

	// let artworkCategoryGallery = thisCategory.map((item, i) => {
	// 	return (
	// <Link to={`/artwork/${item.id}`} key={i}>
	// 	<img
	// 		alt={item.title}
	// 		src={item.imgUrlLo ? item.imgUrlLo : item.imgUrlHi}
	// 	/>
	// 	<p>{item.title}</p>
	// </Link>
	// 	);
	// });

	/* CATEGORIZED GALLERY */

	let artworkCategoryGallery = Object.entries(subCategories).map(
		([key, value]) => {
			console.log(
				value.map((item, i) => {
					return item.id;
				})
			);
			if (key !== 'null') {
				return (
					<>
						<h2 className='artwork-subcategory-heading'>
							{props.toTitleCase(key)}
						</h2>
						<div className='artwork-gallery-section'>
							{value.map((item) => {
								return (
									<div>
										<Link to={`/artwork/${item.id}`} key={item.id}>
											<img alt={item.title} src={item.imgUrlHi} />
											<p>{item.title}</p>
										</Link>
									</div>
								);
							})}
						</div>
					</>
				);
			} else {
				return (
					<div className='artwork-gallery-section'>
						{value.map((item) => {
							return (
								<div>
									<Link to={`/artwork/${item.id}`} key={item.id}>
										<img alt={item.title} src={item.imgUrlHi} />
										<p>{item.title}</p>
									</Link>
								</div>
							);
						})}
						;
					</div>
				);
			}
		}
	);

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
			{artworkCategoryGallery}
		</div>
	);
};

export default ArtworkSubcategory;
