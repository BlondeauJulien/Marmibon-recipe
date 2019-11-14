import React, { Fragment, useContext, useEffect } from 'react';
import Review from '../pagesComponents/recipeComponents/Review';
import AuthContext from '../../context/auth/authContext';

import RecipeContext from '../../context/recipe/recipeContext';

const Recipe = (props) => {

	const recipeContext = useContext(RecipeContext);
	const authContext = useContext(AuthContext);

	const { recipeInfo, recipeAuthor, loadRecipe, createReview, userHasReviewed, redirectToRecipe } = recipeContext;

    const { loadUser, isAuthenticated } = authContext;

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		loadRecipe(props.match.params.recipeId);
		redirectToRecipe(false)
        // eslint-disable-next-line
	}, []);

	if(recipeInfo === null || recipeAuthor === null) {
		return (
			<h1>Error</h1>
		)
	}

	const averageRatingStarsClassName = () => {
		let total = 0;

		recipeInfo.reviews.forEach(r => {
			total += r.reviewRating;
		});

		let averageRating = Math.round(total / recipeInfo.reviews.length);

		let starsArr = [];

		for(let i = 1; i<=5; i++) {
			if(i <= averageRating ) {
				starsArr.push("fas fa-star brand-color-txt")
			} else {
				starsArr.push("fas fa-star grey")
			}
		}

		return starsArr
	}
	
	return (
		<Fragment>
			<div className="recipe-container">
				<h1>{recipeInfo.recipeName}</h1>
				<div className="recipe-header">
					<div className="recipe-user-info">
						<div className="recipe-author-logo">
							<span>{recipeAuthor[0].toUpperCase()}</span>
						</div>
						<span className="recipe-author-name">{recipeAuthor}</span>
					</div>
					<div className="recipe-rating-container">
						<div>
							<div className="stars-rating">
								{averageRatingStarsClassName().map((el) => {
									return (<i key={Math.random()} className={el} />);
								})}
							</div>
							<a href="#review-section" className="link-to-comments">{recipeInfo.reviews.length} commentaire{recipeInfo.reviews.length > 1 && "s"}</a>
						</div>
						<div>
							<i className="far fa-heart heart-saved" />
							<span>57 fois sauvegardé</span>
						</div>
					</div>
				</div>

				<div className="recipe-general-info-container">
					<div className="recipe-img-container">
						<img
							src="https://feelgoodfoodie.net/wp-content/uploads/2019/07/Falafel-Recipe-19.jpg"
							width="300"
							heigth="350"
						/>
					</div>
					<div className="recipe-text-info-cont">
						<div>
							<span className="recipe-info-name">Temps</span>
							<span className="recipe-info-value">
								{recipeInfo.prepTimeHours}
							h
							{recipeInfo.prepTimeMins < 10 ? '0' + recipeInfo.prepTimeMins : recipeInfo.prepTimeMins}
							</span>
						</div>
						<div>
							<span className="recipe-info-name">Personnes</span>
							<span className="recipe-info-value">{recipeInfo.serving}</span>
						</div>
						<div>
							<span className="recipe-info-name">Prix</span>
							{ recipeInfo.price === "lowPrice" ?
								(<i className="fas fa-dollar-sign recipe-info-value" />) :
								recipeInfo.price === "midPrice" ? 
								(<>
								<i className="fas fa-dollar-sign recipe-info-value" /> 
								<i className="fas fa-dollar-sign recipe-info-value" />
								</>) :
								(<>
								<i className="fas fa-dollar-sign recipe-info-value" /> 
								<i className="fas fa-dollar-sign recipe-info-value" /> 
								<i className="fas fa-dollar-sign recipe-info-value" />
								</>)
							}

						</div>
						<div className="save-btn">
							<i className="far fa-heart heart-save" />
							<span>Je sauvegarde</span>
						</div>
					</div>
				</div>

				<div className="recipe-ing-inst-container">
					<div className="recipe-ingredients">
						<h2>Ingrédients</h2>
						{recipeInfo.ingredients.map(ing => {
							return (<span key={ing.id} className="ingredient-item">{ing.ingredientQuantity} {ing.ingredientMesure} {ing.ingredientName}</span>)
						})}
					</div>
					<div className="recipe-instructions">
						<h2>Préparation</h2>
						{recipeInfo.steps.map(step => {
							return (
							<div key={step.id} className="step-container">
							<span className="step-number">{step.stepName}:</span>
							<p className="step-instruction">
								{step.stepContent}
							</p>
						</div>
						)
						})}
						
					</div>
				</div>
			</div>
			<Review recipeInfo={recipeInfo}
				createReview={createReview}
				isAuthenticated={isAuthenticated} 
				averageRatingStarsClassName={averageRatingStarsClassName}
				userHasReviewed={userHasReviewed}
			/>
		</Fragment>
	);
};

export default Recipe;
