import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import tomKaKaiImg from '../../css/Home/recipe1tomkakai.jpg';
import pizzaImg from '../../css/Home/recipe2pizza.jpg';
import fritesImg from '../../css/Home/recipe3frites.jpg';
import gazpachoImg from '../../css/Home/recipe4gazpacho.jpg';
import crepeImg from '../../css/Home/recipe5crepe.jpg';
import ramenImg from '../../css/Home/recipe6ramen.jpg';
import falafelImg from '../../css/Home/recipe7falafel.jpg';
import ratatouilleImg from '../../css/Home/recipe8ratatouille.jpg';
import padThaiImg from '../../css/Home/recipe9padthai.jpg';
import defaultImg from '../../css/Home/recipeDefault.jpg';
import LanguageContext from '../../context/language/languageContext';

const RecipeAbstractItem = ({recipe, user, isAuthenticated, deleteRecipe, setRecipeToUpdate }) => {
	const languageContext = useContext(LanguageContext);

	const { languageDisplayed, switchLanguage } = languageContext;

	const txtLang = () => {
		if(languageDisplayed === "fr") {
			return {
				from: "sur",
				review: 'avis',
				reviews: 'avis'
			}
		}

		return {
			from: "from",
			review: 'review',
			reviews: 'reviews'
		}

	}

	const averageRating = () => {
		let total = 0;

		recipe.reviews.forEach(r => {
			total += r.reviewRating;
		});

		let averageRating = Math.round(total / recipe.reviews.length);

		if(isNaN(averageRating)) return 0;

		return averageRating;
	}

	const averageRatingStarsClassName = () => {
		let average = averageRating();

		let starsArr = [];

		for(let i = 1; i<=5; i++) {
			if(i <= average ) {
				starsArr.push("fas fa-star brand-color-txt")
			} else {
				starsArr.push("fas fa-star grey")
			}
		}

		return starsArr
	}

	const blurred = {
		filter: "blur(3px)",
		WebkitFilter: "blur(3px)",
	}

	const getImg = () => {
		switch (recipe.img) {
			case "tomkakai":
				return(<Link to={`/recipe/${recipe._id}`}><img src={tomKaKaiImg}  width="115" alt="recipe" /></Link>);
			case "pizza":
				return(<Link to={`/recipe/${recipe._id}`}><img src={pizzaImg}  width="115" alt="recipe"/></Link>);
			case "frites":
				return(<Link to={`/recipe/${recipe._id}`}><img src={fritesImg}  width="115" alt="recipe"/></Link>);
			case "saladenicoise":
				return(<Link to={`/recipe/${recipe._id}`}><img src={gazpachoImg}  width="115" alt="recipe"/></Link>);
			case "crepe":
				return(<Link to={`/recipe/${recipe._id}`}><img src={crepeImg}  width="115" alt="recipe"/></Link>);
			case "ramen":
				return(<Link to={`/recipe/${recipe._id}`}><img src={ramenImg}  width="115" alt="recipe"/></Link>);
			case "falafel":
				return(<Link to={`/recipe/${recipe._id}`}><img src={falafelImg}  width="115" alt="recipe"/></Link>);
			case "ratatouille":
				return(<Link to={`/recipe/${recipe._id}`}><img src={ratatouilleImg}  width="115" alt="recipe"/></Link>);
			case "padthai":
				return(<Link to={`/recipe/${recipe._id}`}><img src={padThaiImg}  width="115" alt="recipe"/></Link>);
			default:
				return (<Link to={`/recipe/${recipe._id}`}><img src={defaultImg}  width="115" style={blurred} alt="recipe"/></Link>);
		}

	}

	const displayConfirmDeleteCont = () => {
		document.getElementById(`btn-recipe-abstract-cont-${recipe._id}`).style.display = "none";
		document.getElementById(`confirm-delete-cont-${recipe._id}`).style.display = "block";
	}

	const hideConfirmDeleteCont = () => {
		document.getElementById(`confirm-delete-cont-${recipe._id}`).style.display = "none";
		document.getElementById(`btn-recipe-abstract-cont-${recipe._id}`).style.display = "block";
	}

	return (
		<div className="recipe-abstract-item">
			{	isAuthenticated && recipe.user === user._id && (
				<>
				<div id={"btn-recipe-abstract-cont-" + recipe._id} className="btn-recipe-abstract-cont">
					<button className="btn-mini btn-mini-edit" onClick={() => setRecipeToUpdate({...recipe})}>{languageDisplayed === "fr" ? "Editer" : "Edit"}</button>
					<button className="btn-mini btn-mini-delete" onClick={displayConfirmDeleteCont}>{languageDisplayed === "fr" ? "Supprimer" : "Delete"}</button>

				</div>
				<div id={"confirm-delete-cont-" + recipe._id} className="confirm-delete-cont">
					<span>{languageDisplayed === "fr" ? "Confirmer la suppression de" : "Confirm delete for"}: {recipe.recipeName}</span>
					<div style={{textAlign: "right", margin: "5px 0"}}>
						<button className="btn-mini btn-mini-delete" onClick={() => deleteRecipe(recipe._id)}>{languageDisplayed === "fr" ? "Supprimer" : "Delete"}</button>
						<button className="btn-mini btn-mini-back" onClick={hideConfirmDeleteCont}>{languageDisplayed === "fr" ? "Annuler" : "Cancel"}</button>
					</div>
				</div>
				</>)
			}
			{getImg()}
			<div className="recipe-abstract">
				<h2><Link to={`/recipe/${recipe._id}`}>{recipe.recipeName}</Link></h2>
				<div className="recipe-abstract-rating-cont">
					<div className="recipe-abstract-stars-cont">
						{averageRatingStarsClassName().map((el, i) => {
							return (<i key={i} className={el} />);
						})}
					</div>
					<div className="recipe-abstract-rating-text">{averageRating()} / 5 {txtLang().from} {recipe.reviews.length <= 1 ? `${recipe.reviews.length} ${txtLang().review}` : `${recipe.reviews.length} ${txtLang().reviews}`} </div>
				</div>
				<div className="recipe-abstract-ingredients">
					<span>Ingredients: </span>
					<p>{recipe.ingredients.map((ing, i) => {
						if(i === 9 || i === recipe.ingredients.length - 1) {
							return (ing.ingredientName)
						} else if (i < 10){
							return (ing.ingredientName + ", ")
						}
					})}</p>
				</div>
				<div className="recipe-abstract-time">
				<i className="far fa-clock"></i>{` `}{recipe.prepTimeHours}h{recipe.prepTimeMins < 10 ? ("0" + recipe.prepTimeMins.toString()) : (recipe.prepTimeMins)}
				</div>
			</div>
		</div>
	);
};

export default RecipeAbstractItem;
