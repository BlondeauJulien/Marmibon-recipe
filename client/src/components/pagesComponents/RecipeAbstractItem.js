import React from 'react';
import { Link } from 'react-router-dom';

const RecipeAbstractItem = ({recipe, user, isAuthenticated}) => {
	console.log(recipe)
	console.log(user)

	const averageRating = () => {
		let total = 0;

		recipe.reviews.forEach(r => {
			total += r.reviewRating;
		});

		let averageRating = Math.round(total / recipe.reviews.length);

		if(isNaN(averageRating)) return 0

		return averageRating
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

	return (
		<div className="recipe-abstract-item">
			{	isAuthenticated && recipe.user === user._id &&
				(<div className="btn-recipe-abstract-cont">
					<button className="btn-mini btn-mini-edit">Editer</button>
					<button className="btn-mini btn-mini-delete">Supprimer</button>
				</div>)
			}
			<img src="https://feelgoodfoodie.net/wp-content/uploads/2019/07/Falafel-Recipe-19.jpg" height="175" />
			<div className="recipe-abstract">
				<h2><Link to={`/recipe/${recipe._id}`}>{recipe.recipeName}</Link></h2>
				<div className="recipe-abstract-rating-cont">
					<div className="recipe-abstract-stars-cont">
						{averageRatingStarsClassName().map((el, i) => {
							return (<i key={i} className={el} />);
						})}
					</div>
					<div className="recipe-abstract-rating-text">{averageRating()} / 5 sur {recipe.reviews.length === 0 ? "0 avis" : `${recipe.reviews.length} avis`} </div>
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
