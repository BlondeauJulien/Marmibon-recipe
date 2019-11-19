import React, { useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';
import SearchContext from '../../context/search/searchContext';

const NavBar = () => {
	const authContext = useContext(AuthContext);
	const recipeContext = useContext(RecipeContext);
	const searchContext = useContext(SearchContext);

	const { isAuthenticated } = authContext;
	const { getRandomRecipe } = recipeContext;
	const { getAllRecipes, getByRecipeType } = searchContext;

	return (
		<header>
			<div className="header-top-container">
				<Link to="/" className="logo-container brand-color-txt">
					<i className="fas fa-cookie-bite" />
					<h1>marmibon</h1>
				</Link>
				<div className="search-bar-container">
					<i className="fas fa-search brand-color-txt" />
					<input type="search" placeholder="Je cherche une recette:" />
				</div>
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

export default NavBar;
