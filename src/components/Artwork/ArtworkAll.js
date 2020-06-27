import React from 'react';
import { Link } from 'react-router-dom';
import ArtworkCategoryNav from './ArtworkCategoryNav';

const ArtworkAll = (props) => {
	return (
		<div className='artwork-subcat-container'>
			<ArtworkCategoryNav />
		</div>
	);
};

export default ArtworkAll;
