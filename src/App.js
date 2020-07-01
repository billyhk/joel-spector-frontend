import React from 'react';
import { Route } from 'react-router-dom';

//misc. components
import NavBar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';

//artwork
import ArtworkCategorySub from './components/Artwork/ArtworkCategorySub';
import ArtworkCreate from './components/Artwork/ArtworkCreate';
import ArtworkUpdate from './components/Artwork/ArtworkCreate';
import ArtworkDetail from './components/Artwork/ArtworkDetail';
import ArtworkAll from './components/Artwork/ArtworkAll';

const App = () => {
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
					path='/artwork-category/:category'
					render={() => {
						return <ArtworkCategorySub />;
					}}
				/>
				<Route
					path='/artwork-create'
					render={() => {
						return <ArtworkCreate toTitleCase={toTitleCase} />;
					}}
				/>
				{/* <Route
						path='/artwork/:id'
						render={(routerProps) => {
							return <ArtworkDetail {...routerProps} scrollUp={scrollUp} toTitleCase={toTitleCase};
						}}
					/> */}
				{/* <Route
						path='/artwork/:id/edit'
						render={(routerProps) => {
							return <ArtworkUpdate {...routerProps} scrollUp={scrollUp}/>;
						}}
					/> */}

				<Route
					path='/artwork-all'
					render={() => {
						return <ArtworkAll toTitleCase={toTitleCase} />;
					}}
				/>
			</main>
			<footer>{/* <Route path='*' component={Footer} /> */}</footer>
		</>
	);
};

export default App;
