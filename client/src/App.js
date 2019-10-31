import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Home from './components/pages/Home';
import Login from './components/pages/Login'
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
					</Switch>
				</main>
				<Footer />
			</Router>
		</Fragment>
	);
}

export default App;
