import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/recipe/recipeContext';
import SearchContext from '../../context/search/searchContext';

const Footer = () => {
	const recipeContext = useContext(RecipeContext);
	const searchContext = useContext(SearchContext);

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

	return (
		<footer>
			<div>
				<div className="arrow-back-top"><a href="#"><i className="fas fa-long-arrow-alt-up"></i></a></div>
                <div className="social-media-logo-container">
                <a href="https://www.facebook.com/marmiton" target="_blank"><i className="fab fa-facebook"></i></a>
                <a href="https://www.instagram.com/marmiton_org/" target="_blank"><i className="fab fa-instagram"></i></a>
                <a href="https://twitter.com/Marmiton_org" target="_blank"><i className="fab fa-twitter"></i></a>
                <a href="https://www.youtube.com/user/marmitonofficiel" target="_blank"><i className="fab fa-youtube"></i></a>
                <a href="https://www.pinterest.fr/marmiton/" target="_blank"><i className="fab fa-pinterest"></i></a>
                </div>
				<div className="footer-lists">
                    <div>
                        <p className="list-header">Recettes</p>
                        <ul>
                            <li><Link to="/search" onClick={getAllRecipes} href="#">Voir tout</Link></li>
                            <li><Link to="/search" onClick={() => getByRecipeType('starter')} href="#">Entrées</Link></li>
                            <li><Link to="/search" onClick={() => getByRecipeType('mainCourse')} href="#">Plats</Link></li>
                            <li><Link to="/search" onClick={() => getByRecipeType('dessert')} href="#">Dessert</Link></li>
                            <li><a onClick={getRandomRecipe} href="#">Recette au hasard</a></li>
                        </ul>
                    </div>
                    <div>
                    <p className="list-header">Info</p>
                        <ul>
                            <li>Contact</li>
                            <li>About</li>

                        </ul>
                    </div>
                </div>
				<p className="disclamer">Ce site a été créé dans un but d'apprentissage et inspiré pour le design de marmiton.org. <br/> Il n'a aucun but commercial.</p>
			</div>
		</footer>
	);
};

export default Footer;
