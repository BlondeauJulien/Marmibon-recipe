import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Recipe from './components/pages/Recipe';
import User from './components/pages/User';
import Search from './components/pages/Search';
import CreateRecipe from './components/pages/CreateRecipe';
import EditRecipe from './components/pages/EditRecipe';
import Contact from './components/pages/Contact';
import About from './components/pages/About';
import Footer from './components/layout/Footer';
import './App.css';

import AuthState from './context/auth/AuthState';
import RecipeState from './context/recipe/RecipeState';
import SearchContext from './context/search/SearchState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	return (
		<AuthState>
			<RecipeState>
				<SearchContext>
					<Router>
						<Fragment>
							<NavBar />
							<main id="main-cont">
								<Switch>
									<Route exact path="/" component={Home} />
									<Route exact path="/login" component={Login} />
									<Route exact path="/register" component={Register} />
									<Route exact path="/recipe/:recipeId" component={Recipe} />
									<Route exact path="/user" component={User} />
									<Route exact path="/search" component={Search} />
									<Route exact path="/create" component={CreateRecipe} />
									<Route exact path="/edit" component={EditRecipe} />
									<Route exact path="/contact" component={Contact} />
									<Route exact path="/about" component={About} />
								</Switch>
							</main>
							<Footer />
						</Fragment>
					</Router>
				</SearchContext>
			</RecipeState>
		</AuthState>
	);
}

export default App;
