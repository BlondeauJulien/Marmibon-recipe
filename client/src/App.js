import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Recipe from './components/pages/Recipe';
import User from './components/pages/User';
import Search from './components/pages/Search';
import CreateRecipe from './components/pages/CreateRecipe'
import Footer from './components/layout/Footer';
import './App.css';

function App() {
	return (
		<Fragment>
			<Router>
				<NavBar />
				<main>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/recipe" component={Recipe} />
						<Route exact path="/user" component={User} />
						<Route exact path="/search" component={Search} />
						<Route exact path="/create" component={CreateRecipe} />
					</Switch>
				</main>
				<Footer />
			</Router>
		</Fragment>
	);
}

export default App;
