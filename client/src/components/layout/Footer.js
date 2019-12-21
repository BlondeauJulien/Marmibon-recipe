import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/recipe/recipeContext';
import SearchContext from '../../context/search/searchContext';
import LanguageContext from '../../context/language/languageContext';

const Footer = () => {
	const recipeContext = useContext(RecipeContext);
    const searchContext = useContext(SearchContext);
    const languageContext = useContext(LanguageContext);

    const { getRandomRecipe } = recipeContext;
	const { 
		getAllRecipes,
		getByRecipeType
    } = searchContext;
    const { languageDisplayed, language, switchLanguage } = languageContext;

	return (
		<footer>
			<div>
				<div className="arrow-back-top"><a href="#"><i className="fas fa-long-arrow-alt-up"></i></a></div>
                <div className="social-media-logo-container">
                <a href="https://www.facebook.com/marmiton" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                <a href="https://www.instagram.com/marmiton_org/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://twitter.com/Marmiton_org" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                <a href="https://www.youtube.com/user/marmitonofficiel" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                <a href="https://www.pinterest.fr/marmiton/" target="_blank" rel="noopener noreferrer"><i className="fab fa-pinterest"></i></a>
                </div>
				<div className="footer-lists">
                    <div>
                        <p className="list-header">{language[languageDisplayed].footer.headerRecipes}</p>
                        <ul>
                            <li><Link to="/search" onClick={getAllRecipes} >{language[languageDisplayed].footer.seeAll}</Link></li>
                            <li><Link to="/search" onClick={() => getByRecipeType('starter')} >{language[languageDisplayed].footer.starters}</Link></li>
                            <li><Link to="/search" onClick={() => getByRecipeType('mainCourse')} >{language[languageDisplayed].footer.mainCourses}</Link></li>
                            <li><Link to="/search" onClick={() => getByRecipeType('dessert')} >{language[languageDisplayed].footer.desserts}</Link></li>
                            <li onClick={getRandomRecipe} style={{cursor: 'pointer'}}>{language[languageDisplayed].footer.random}</li>
                        </ul>
                    </div>
                    <div>
                    <p className="list-header">Info</p>
                        <ul>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/about">{language[languageDisplayed].footer.about}</Link></li>

                        </ul>
                    </div>
                </div>
				<p className="disclamer">{language[languageDisplayed].footer.txtfooter1} <br/> {language[languageDisplayed].footer.txtfooter2}</p>
			</div>
		</footer>
	);
};

export default Footer;
