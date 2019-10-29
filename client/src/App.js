import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import './App.css';

function App() {
	return (
		<Fragment>
			<Router>
				<NavBar />
			</Router>
		</Fragment>
	);
}

export default App;
