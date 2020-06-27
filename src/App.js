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
import ArtworkAll from './components/Artwork/ArtworkAll'

function App() {
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
						return <ArtworkCreate />;
					}}
				/>{' '}
				<Route
					path='/artwork-all'
					render={() => {
						return <ArtworkAll />;
					}}
				/>
			</main>
			<footer>{/* <Route path='*' component={Footer} /> */}</footer>
		</>
	);
}

export default App;
