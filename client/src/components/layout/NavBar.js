import React, { useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';
import SearchContext from '../../context/search/searchContext';

const NavBar = (props) => {
	const authContext = useContext(AuthContext);
	const recipeContext = useContext(RecipeContext);
	const searchContext = useContext(SearchContext);

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

	useEffect(() => {
		if(redirectSearchCont) {
			resetNavSearchInput();
			props.history.push(`search`)
		}
	}, [redirectSearchCont]);

	const onChange = e => setNavQueryValue({navSearchInput, navSearchInput: e.target.value});

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
					<input type="search" name="name" onChange={onChange} value={navSearchInput} placeholder="Je cherche une recette:" />
				</form>
				<div className="header-btn-container">
					{isAuthenticated ? (
						<Link to="/user" className="btn btn-mid btn-brand brand-color-bg text-color-white">
							<i className="fas fa-user" />
							{" "}Mon Profil
						</Link>
					) : (
						<Link to="/login" className="btn btn-mid btn-brand brand-color-bg text-color-white">
							<i className="fas fa-user" />
							{" "}Connexion
						</Link>
					)}
				</div>
			</div>

			<nav className="header-nav">
				<ul>
					<li>
						<Link to="/search" onClick={getAllRecipes} href="#">Voir Tout</Link>
					</li>
					<li>
						<Link to="/search" onClick={() => getByRecipeType('starter')} href="#">Entrées</Link>
					</li>
					<li>
						<Link to="/search" onClick={() => getByRecipeType('mainCourse')} href="#">Plats</Link>
					</li>
					<li>
						<Link to="/search" onClick={() => getByRecipeType('dessert')} href="#">Desserts</Link>
					</li>
					<li className="random-recipe">
						<a onClick={getRandomRecipe} href="#">Recette au hasard</a>
					</li>
					{isAuthenticated && (
					<li className="create-recipe-nav">
						<Link to="/create" href="#">Créer une recette</Link>
					</li>)
					}
				</ul>
			</nav>
		</header>
	);
};

export default withRouter(NavBar);
