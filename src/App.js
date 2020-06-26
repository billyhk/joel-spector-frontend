import React from 'react';
import { Route } from 'react-router-dom';

//misc. components
import NavBar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';

//artwork
import ArtworkCategory from './components/Artwork/ArtworkCategory';
import ArtworkCreate from './components/Artwork/ArtworkCreate';
import ArtworkUpdate from './components/Artwork/ArtworkCreate';
import ArtworkDetail from './components/Artwork/ArtworkDetail';

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
			</main>
			<footer>
				{/* <Route path='*' component={Footer} /> */}
			</footer>
		</>
	);
}

export default App;
