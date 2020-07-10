import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { APIURL } from './config';

//misc. components
import NavBar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';

//artwork
import ArtworkCategorySub from './components/Artwork/ArtworkCategorySub';
import ArtworkCreate from './components/Artwork/ArtworkCreate';
import ArtworkDetail from './components/Artwork/ArtworkDetail';
import ArtworkUpdate from './components/Artwork/ArtworkUpdate';
import ArtworkAll from './components/Artwork/ArtworkAll';

const App = () => {
	const [artwork, setArtwork] = useState([]);
	const [error, setError] = useState(false);

	function scrollUp() {
		window.scrollTo(0, 0);
	}
	// convert data to Title Case
	function toTitleCase(str) {
		return str
			.replace(/([a-z])([A-Z])/g, function (
				allMatches,
				firstMatch,
				secondMatch
			) {
				return firstMatch + ' ' + secondMatch;
			})
			.toLowerCase()
			.replace(/([ -_]|^)(.)/g, function (allMatches, firstMatch, secondMatch) {
				return (firstMatch ? ' ' : '') + secondMatch.toUpperCase();
			});
	}

	useEffect(() => {
		scrollUp();
		fetchMyApi();
		// eslint-disable-next-line
	}, []);

	async function fetchMyApi() {
		await fetch(`${APIURL}/api/work/`, {
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

	return (
		<>
			<Route
				path='*'
				render={() => {
					return <NavBar />;
				}}
			/>
			<main>
				<Route exact path='/' component={Home} />
				<Route
					exact
					path='/artwork-category/:category'
					render={() => {
						return (
							<ArtworkCategorySub toTitleCase={toTitleCase} artwork={artwork} />
						);
					}}
				/>
				<Route
					exact
					path='/artwork-create'
					render={() => {
						return <ArtworkCreate toTitleCase={toTitleCase} />;
					}}
				/>
				<Route
					exact
					path='/artwork/:id'
					render={(routerProps) => {
						return (
							<ArtworkDetail
								{...routerProps}
								scrollUp={scrollUp}
								toTitleCase={toTitleCase}
								artwork={artwork}
							/>
						);
					}}
				/>
				<Route
					exact
					path='/artwork/:id/edit'
					render={(routerProps) => {
						return (
							<ArtworkUpdate
								{...routerProps}
								scrollUp={scrollUp}
								artwork={artwork}
								toTitleCase={toTitleCase}
							/>
						);
					}}
				/>

				<Route
					exact
					path='/artwork-all'
					render={() => {
						return <ArtworkAll toTitleCase={toTitleCase} artwork={artwork} />;
					}}
				/>
			</main>
			<footer>{/* <Route path='*' component={Footer} /> */}</footer>
		</>
	);
};

export default App;
