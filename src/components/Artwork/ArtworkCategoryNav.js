import React from 'react'
import {Link} from 'react-router-dom'

const ArtworkCategoryNav = () => (
	<nav className='subnav-container'>
		<div className='subnav-left'>
			<Link
				to='/artwork-category/portraits'
				className={
					window.location.href.indexOf('portraits') > -1
						? 'active1'
						: 'not-active'
				}>
				<span>Portraits</span>
			</Link>
			<Link
				to='/artwork-category/paintings'
				className={
					window.location.href.indexOf('paintings') > -1
						? 'active1'
						: 'not-active'
				}>
				<span>Paintings</span>
			</Link>
			<Link
				to='/artwork-category/silverpoint'
				className={
					window.location.href.indexOf('silverpoint') > -1
						? 'active1'
						: 'not-active'
				}>
				<span>Silverpoint</span>
			</Link>
			<Link
				to='/artwork-category/works_on_paper'
				className={
					window.location.href.indexOf('works_on_paper') > -1
						? 'active1'
						: 'not-active'
				}>
				<span>Works on Paper</span>
			</Link>
		</div>
		<div className='subnav-right'>
			<Link
				to='/artwork-all'
				className={
					window.location.href.indexOf('artwork-all') > -1
						? 'active1'
						: 'not-active'
				}>
				<span>All Works</span>
			</Link>
			<Link
				to='/artwork-create'
				className={
					window.location.href.indexOf('artwork-create') > -1
						? 'active1'
						: 'not-active'
				}>
				Add to the Collection (+){' '}
			</Link>
		</div>
	</nav>
);

export default ArtworkCategoryNav;