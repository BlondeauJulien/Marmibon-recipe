import React, { Fragment, useContext, useEffect } from 'react';
import Review from '../pagesComponents/recipeComponents/Review';
import Error404 from '../errorsPages/Recipe404Error';
import AuthContext from '../../context/auth/authContext';
import spinner from '../layout/spinner.gif';

import tomKaKaiImg from '../../css/Home/recipe1tomkakai.jpg'
import pizzaImg from '../../css/Home/recipe2pizza.jpg'
import fritesImg from '../../css/Home/recipe3frites.jpg'
import saladeNicoiseImg from '../../css/Home/recipe4saladenicoise.jpg'
import crepeImg from '../../css/Home/recipe5crepe.jpg'
import ramenImg from '../../css/Home/recipe6ramen.jpg'
import falafelImg from '../../css/Home/recipe7falafel.jpg'
import ratatouilleImg from '../../css/Home/recipe8ratatouille.jpg'
import padThaiImg from '../../css/Home/recipe9padthai.jpg'
import defaultImg from '../../css/Home/recipeDefault.jpg'

import RecipeContext from '../../context/recipe/recipeContext';

const Recipe = (props) => {
	const recipeContext = useContext(RecipeContext);
	const authContext = useContext(AuthContext);

	const { 
		recipeInfo, 
		recipeAuthor, 
		loadRecipe, 
		createReview, 
		resetUserHasReviewed,
		userHasReviewed, 
		redirectToRecipe, 
		userSaveRecipe, 
		userDeleteSaveRecipe,
		loading 
	} = recipeContext;

    const { loadUser, user, isAuthenticated } = authContext;

	useEffect(() => {
        if(localStorage.getItem('token') !== null) {
            loadUser()
		}
		resetUserHasReviewed();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		loadRecipe(props.match.params.recipeId);
		redirectToRecipe(false)
		window.scrollTo(0, 0);
        // eslint-disable-next-line
	}, []);

	useEffect(() => {
		if(recipeInfo) {
			props.history.push(`/recipe/${recipeInfo._id}`)
		}

	}, [recipeInfo]);

	if(loading.recipePage) {
		return (
			<div className="recipe-container loading-recipe">
				<img src={spinner} style={{width: '125px', margin: 'auto', display: 'block'}}/>
			</div>
		)
	}

	if(recipeInfo === null || recipeAuthor === null) {
		return (
			<Error404 />
		)
	}

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
				return(<img src={tomKaKaiImg} width="300"  />);
			case "pizza":
				return(<img src={pizzaImg}  width="300"  />);
			case "frites":
				return(<img src={fritesImg}  width="300"  />);
			case "saladenicoise":
				return(<img src={saladeNicoiseImg}  width="300"  />);
			case "crepe":
				return(<img src={crepeImg}  width="300"  />);
			case "ramen":
				return(<img src={ramenImg}  width="300"  />);
			case "falafel":
				return(<img src={falafelImg}  width="300"  />);
			case "ratatouille":
				return(<img src={ratatouilleImg}  width="300"  />);
			case "padthai":
				return(<img src={padThaiImg}  width="300"  />);
			default:
				return (<img src={defaultImg}  width="300"  style={blurred}/>);
		}

	}

	/* BTN SAVE RECIPE */
	const saveBtn = () => {

		if(isAuthenticated) {
			if(user._id == recipeInfo.user) {
				return
			}
		}

		if(loading.saveRecipeBtn) {
			return (			
				<div style={{width: '250px', margin: 'auto', display: 'block'}}>
					<img src={spinner} style={{width: '50px', margin: 'auto', display: 'block'}}/>
				</div>
			)
		} else {
			if(!isAuthenticated) {
				return (
					<div onClick={saveRecipe} className="save-btn">
						<i className="far fa-heart heart-save" />
						<span>Je sauvegarde</span>
					</div>	
					)
			} else if (btnSave().length === 0) {
				return (
					<div onClick={saveRecipe} className="save-btn">
						<i className="far fa-heart heart-save" />
						<span>Je sauvegarde</span>
					</div>	
				)
			} else {
				return (
					<div onClick={deleteRecipeFromsave} className="unsave-btn">
						<span>Supprimer ma sauvegarde</span>
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
						<div class="stars-cont">
							<div className="stars-rating">
								{averageRatingStarsClassName().map((el) => {
									return (<i key={Math.random()} className={el} />);
								})}
							</div>
							<a href="#review-section" className="link-to-comments">{recipeInfo.reviews.length} commentaire{recipeInfo.reviews.length > 1 && "s"}</a>
						</div>
						<div>
							<i className="far fa-heart heart-saved" />
							<span>{recipeInfo.saved.length} fois sauvegardé</span>
						</div>
					</div>
				</div>

				<div className="recipe-general-info-container">
					<div className="recipe-img-container">
						{getImg()}
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
						{/* BTN SAVE  and delete from saved*/}
						{saveBtn()}
					
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
