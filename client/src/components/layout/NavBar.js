import React, { useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';
import SearchContext from '../../context/search/searchContext';
import LanguageContext from '../../context/language/languageContext';

import ukFlag from '../../css/flags/uk-flag.jpg';
import frFlag from '../../css/flags/fr-flag.jpg';

const NavBar = (props) => {
	const authContext = useContext(AuthContext);
	const recipeContext = useContext(RecipeContext);
	const searchContext = useContext(SearchContext);
	const languageContext = useContext(LanguageContext);

	const { isAuthenticated } = authContext;
	const { getRandomRecipe } = recipeContext;
	const { 
		getAllRecipes,
		getByRecipeType, 
		navSearchInput,
		setNavQueryValue, 
		redirectSearchCont,
		redirectToSearchCont,
		getSearchQueryFromNav,
		resetNavSearchInput
	} = searchContext;
	const { languageDisplayed, language, switchLanguage } = languageContext;
	
	useEffect(() => {
		if(redirectSearchCont) {
			resetNavSearchInput();
			props.history.push(`search`)
		}
		// eslint-disable-next-line
	}, [redirectSearchCont]);

	const onChange = e => setNavQueryValue({...navSearchInput, navSearchInput: e.target.value});

	const handleSubmitSearch = e => {
		e.preventDefault();
		redirectToSearchCont();
		getSearchQueryFromNav();
    }

	return (
		<header>
			<div className="header-top-container">
				<Link to="/" className="logo-container brand-color-txt">
					<i className="fas fa-cookie-bite" />
					<h1>marmibon</h1>
				</Link>
				<form onSubmit={handleSubmitSearch} className="search-bar-container">
					<i className="fas fa-search brand-color-txt" />
					<input type="search" name="name" onChange={onChange} value={navSearchInput} placeholder={language[languageDisplayed].header.searchplaceholder} />
				</form>
				<div className="header-btn-container">
					<Link to="/search" className="btn-search-mobile"><i className="fas fa-search brand-color-txt" /></Link>
					{isAuthenticated ? (
						<Link to="/user" className="btn btn-mid btn-brand brand-color-bg text-color-white">
							<i className="fas fa-user" />
					<p className="btn-user-header-text">{ language[languageDisplayed].header.myProfile }</p>
						</Link>
					) : (
						<Link to="/login" className="btn btn-mid btn-brand brand-color-bg text-color-white">
							<i className="fas fa-user" />
							<p className="btn-user-header-text">{ language[languageDisplayed].header.login }</p>
						</Link>
					)}

					{languageDisplayed === 'fr' ? (
						<img src={ukFlag} onClick={() => switchLanguage('eng')}  width="26" height="26" className="flag" alt="United Kingdom Flag" />
					) : (
						<img src={frFlag} onClick={() => switchLanguage('fr')}  width="26" height="26" className="flag" alt="France Flag" />						
					)} 
				</div>
			</div>

			<nav id="search-nav" className="header-nav">
				<ul>
					<li>
						<Link to="/search" onClick={getAllRecipes} >{ language[languageDisplayed].header.seeAll }</Link>
					</li>
					<li>
						<Link to="/search" onClick={() => getByRecipeType('starter')} >{ language[languageDisplayed].header.starters }</Link>
					</li>
					<li>
						<Link to="/search" onClick={() => getByRecipeType('mainCourse')} >{ language[languageDisplayed].header.mainCourses }</Link>
					</li>
					<li>
						<Link to="/search" onClick={() => getByRecipeType('dessert')} >{ language[languageDisplayed].header.desserts }</Link>
					</li>
					<li className="random-recipe">
						<a onClick={getRandomRecipe} style={{cursor: 'pointer'}}>{ language[languageDisplayed].header.random }</a>
					</li>
					{isAuthenticated && (
					<li className="create-recipe-nav">
						<Link to="/create" href="#">{ language[languageDisplayed].header.createRecipe }</Link>
					</li>)
					}
				</ul>
			</nav>
			{isAuthenticated && props.history.location.pathname !== "/create" && (
				<div className="mobileAddRecipeBtn">
					<Link to="/create"><i className="fas fa-plus"></i></Link>
				</div>
			)}
		</header>
	);
};

export default withRouter(NavBar);
