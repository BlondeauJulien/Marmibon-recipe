import React, { Fragment, useContext, useEffect } from 'react';
import Review from '../pagesComponents/recipeComponents/Review';
import AuthContext from '../../context/auth/authContext';
import spinner from '../layout/spinner.gif';

import tomKaKaiImg from '../../css/Home/recipe1tomkakai.jpg'
import pizzaImg from '../../css/Home/recipe2pizza.jpg'
import fritesImg from '../../css/Home/recipe3frites.jpg'
import gazpachoImg from '../../css/Home/recipe4gazpacho.jpg'
import crepeImg from '../../css/Home/recipe5crepe.jpg'
import ramenImg from '../../css/Home/recipe6ramen.jpg'
import falafelImg from '../../css/Home/recipe7falafel.jpg'
import ratatouilleImg from '../../css/Home/recipe8ratatouille.jpg'
import padThaiImg from '../../css/Home/recipe9padthai.jpg'
import defaultImg from '../../css/Home/recipeDefault.jpg'

import RecipeContext from '../../context/recipe/recipeContext';
import LanguageContext from '../../context/language/languageContext';

const Recipe = (props) => {
	const recipeContext = useContext(RecipeContext);
	const authContext = useContext(AuthContext);
	const languageContext = useContext(LanguageContext);

	const { 
		recipeInfo, 
		recipeAuthor, 
		loadRecipe, 
		clearRecipeFromState,
		createReview, 
		resetUserHasReviewed,
		userHasReviewed, 
		redirectToRecipe, 
		userSaveRecipe, 
		userDeleteSaveRecipe,
		loading 
	} = recipeContext;

	const { loadUser, user, isAuthenticated } = authContext;
	const { languageDisplayed, language, switchLanguage } = languageContext;
	

	useEffect(() => {
		window.scrollTo(0, 0);
        if(localStorage.getItem('token') !== null) {
            loadUser()
		}
		resetUserHasReviewed();
		return () => {
			clearRecipeFromState()
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		loadRecipe(props.match.params.recipeId);
		redirectToRecipe(false)
        // eslint-disable-next-line
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		if(recipeInfo) {
			props.history.push(`/recipe/${recipeInfo._id}`)
		}
        // eslint-disable-next-line
	}, [recipeInfo]);

	if(loading.recipePage || (recipeInfo === null || recipeAuthor === null)) {
		return (
			<div className="recipe-container loading-recipe">
				<img src={spinner} style={{width: '125px', margin: 'auto', display: 'block'}} alt="spinner loading"/>
			</div>
		)
	}

/* 	if(recipeInfo === null || recipeAuthor === null) {
		return (
			<Error404 />
		)
	} */

	const saveRecipe = () => {
		if(isAuthenticated) {
			userSaveRecipe(recipeInfo._id)
		} else { 
			alert('cant save need loggin')
		}
	}

	const deleteRecipeFromsave = () => {
		userDeleteSaveRecipe(recipeInfo._id)
	}

	const btnSave = () => {
		if(recipeInfo !== null && isAuthenticated) {
			let isItSaved = recipeInfo.saved.filter(u => u === user._id);
			return isItSaved
		}
	}



	const averageRatingStarsClassName = () => {
		let total = 0;

		recipeInfo.reviews.forEach(r => {
			total += r.reviewRating;
		});

		let averageRating = Math.round(total / recipeInfo.reviews.length);
		if(isNaN(averageRating)) averageRating = 0;

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

	const blurred = {
		filter: "blur(5px)",
		WebkitFilter: "blur(5px)",
	}

	const getImg = () => {
		switch (recipeInfo.img) {
			case "tomkakai":
				return(<img src={tomKaKaiImg} width="300" alt="recipe" />);
			case "pizza":
				return(<img src={pizzaImg}  width="300" alt="recipe" />);
			case "frites":
				return(<img src={fritesImg}  width="300" alt="recipe" />);
			case "saladenicoise":
				return(<img src={gazpachoImg}  width="300" alt="recipe" />);
			case "crepe":
				return(<img src={crepeImg}  width="300" alt="recipe" />);
			case "ramen":
				return(<img src={ramenImg}  width="300" alt="recipe" />);
			case "falafel":
				return(<img src={falafelImg}  width="300" alt="recipe" />);
			case "ratatouille":
				return(<img src={ratatouilleImg}  width="300" alt="recipe" />);
			case "padthai":
				return(<img src={padThaiImg}  width="300" alt="recipe" />);
			default:
				return (<img src={defaultImg}  width="300"  style={blurred} alt="recipe"/>);
		}

	}

	const getMesureFrench = (qty, mesureName) => {
		let isEng = languageDisplayed === "eng"
		switch (mesureName) {
			case "whole":
				if(isEng) return `${qty} - whole`
				return qty > 1 ? `${qty} - entiers/ères` : `${qty} - entier/ère`;
			case "gram":
				if(isEng) return qty > 1 ? `${qty} grams` : `${qty} gram`;
				return qty > 1 ? `${qty} grammes` : `${qty} gramme`;
			case "kilo":
				return qty > 1 ? `${qty} kilos` : `${qty} kilo`;
			case "liter":
				if(isEng) return qty > 1 ? `${qty} liters` : `${qty} liter`;
				return qty > 1 ? `${qty} litres` : `${qty} litre`;
			case "centilitre":
				if(isEng) return qty > 1 ? `${qty} centiliters` : `${qty} centiliter`;
				return qty > 1 ? `${qty} centilitres` : `${qty} centilitre`;
			default:
				return "";
		}
	}

	/* BTN SAVE RECIPE */
	const saveBtn = () => {

		if(isAuthenticated) {
			if(user._id === recipeInfo.user) {
				return
			}
		}

		if(loading.saveRecipeBtn) {
			return (			
				<div style={{width: '250px', margin: 'auto', display: 'block'}}>
					<img src={spinner} style={{width: '50px', margin: 'auto', display: 'block'}} alt="spinner loading"/>
				</div>
			)
		} else {
			if(!isAuthenticated) {
				return 
			} else if (btnSave().length === 0) {
				return (
					<div onClick={saveRecipe} className="save-btn">
						<i className="far fa-heart heart-save" />
						<span>{languageDisplayed === "fr" ? "Je sauvegarde" : "Save it"}</span>
					</div>	
				)
			} else {
				return (
					<div onClick={deleteRecipeFromsave} className="unsave-btn">
						<span>{languageDisplayed === "fr" ? "Supprimer ma sauvegarde" : "Delete from saved"}</span>
					</div>	
				)
			}
		}
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
						<div className="stars-cont">
							<div className="stars-rating">
								{averageRatingStarsClassName().map((el) => {
									return (<i key={Math.random()} className={el} />);
								})}
							</div>
							{languageDisplayed === "fr" ? (
								<a href="#review-section" className="link-to-comments">{recipeInfo.reviews.length} commentaire{recipeInfo.reviews.length > 1 && "s"}</a>
							) : (
								<a href="#review-section" className="link-to-comments">{recipeInfo.reviews.length} review{recipeInfo.reviews.length > 1 && "s"}</a>
							)}
						</div>
						<div>
							<i className="far fa-heart heart-saved" />
							{languageDisplayed === "fr" ? (
								<span>{recipeInfo.saved.length} fois sauvegardé</span>
							) : (
								<span>saved {recipeInfo.saved.length} time{recipeInfo.saved.length > 1 && "s"}</span>
							) }
						</div>
					</div>
				</div>

				<div className="recipe-general-info-container">
					<div className="recipe-img-container">
						{getImg()}
					</div>
					<div className="recipe-text-info-cont">
						<div>
							<span className="recipe-info-name">{languageDisplayed === "fr" ? "Temps" : "Time"}</span>
							<span className="recipe-info-value">
								{recipeInfo.prepTimeHours}
							h
							{recipeInfo.prepTimeMins < 10 ? '0' + recipeInfo.prepTimeMins : recipeInfo.prepTimeMins}
							</span>
						</div>
						<div>
							<span className="recipe-info-name">{languageDisplayed === "fr" ? "Personnes" : "Serving"}</span>
							<span className="recipe-info-value">{recipeInfo.serving}</span>
						</div>
						<div>
							<span className="recipe-info-name">{languageDisplayed === "fr" ? "Prix" : "Price"}</span>
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
						{/* BTN SAVE  and delete from saved*/}
						{saveBtn()}
					
					</div>
				</div>

				<div className="recipe-ing-inst-container">
					<div className="recipe-ingredients">
						<h2>{languageDisplayed === "fr" ? "Ingrédients" : "Ingredients"}</h2>
						{recipeInfo.ingredients.map(ing => {
							return (<span key={ing.id} className="ingredient-item">{ing.ingredientName}: {getMesureFrench(ing.ingredientQuantity, ing.ingredientMesure)}</span>)
						})}
					</div>
					<div className="recipe-instructions">
						<h2>{languageDisplayed === "fr" ? "Préparation" : "Preparation"}</h2>
						{recipeInfo.steps.map((step, i) => {
							return (
								<div key={step.id} className="step-container">
									<span className="step-number">{languageDisplayed === "fr" ? `Etape ${i+1}` : `Step ${i+1}`}:</span>
									<p className="step-instruction">
										{step.stepContent}
									</p>
								</div>
							)
						})}
						
					</div>
				</div>
			</div>
			<Review 
				user={user}
				recipeInfo={recipeInfo}
				createReview={createReview}
				isAuthenticated={isAuthenticated} 
				averageRatingStarsClassName={averageRatingStarsClassName}
				userHasReviewed={userHasReviewed}
				loading={loading}
			/>
		</Fragment>
	);
};

export default Recipe;
