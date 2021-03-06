import React, { useState, useContext, useEffect } from 'react';
import ReviewItem from './ReviewItem';
import uuidv4 from 'uuid/v4';
import spinner from '../../layout/spinner.gif';
import LanguageContext from '../../../context/language/languageContext';

const Review = ( { user, recipeInfo, createReview, isAuthenticated, averageRatingStarsClassName, userHasReviewed, loading }) => {
	const languageContext = useContext(LanguageContext);

	const { languageDisplayed, language, switchLanguage } = languageContext;

	const [review, setReview] = useState({
		reviewRating: 0,
		reviewContent: ''
	});

	useEffect(() => {
		if(review.reviewRating) {
			document.querySelector('.review-content-cont').style.display = 'block';
		}
	}, [review.reviewRating])

	const displayReviewTextArea = () => {
		if(!userHasReviewed) {
			document.querySelector('.review-content-cont').style.display = 'block';
		}
	}

	const hideReviewTextArea = e => {
		if(!userHasReviewed) {
			if(review.reviewRating === 0 && review.reviewContent === '') {
				document.querySelector('.review-content-cont').style.display = 'none';
			}
		}
	}

	const displayReviewRating = () => {
		let display = {};
		if(isAuthenticated) {
			for(let i = 0; i<recipeInfo.reviews.length; i++) {
				console.log( user._id === recipeInfo.user);
				console.log( user._id === recipeInfo.user);
				if(user._id === recipeInfo.reviews[i].authorId || user._id === recipeInfo.user) {
					display.display = "none";
					break;
				}
			}
			if(user._id === recipeInfo.user) {
				display.display = "none";
			}
		}

		return display;
	}

	const previewRating = e => {
		let stars = document.querySelectorAll('.sr');
		
		let starTarget = Number(e.target.id.replace('sr-', ''));
		
		for(let i = 0; i<stars.length; i++) {
			if(i<= starTarget) {
				stars[i].className = 'fas fa-star brand-color-txt sr';
			} else {
				stars[i].className = 'fas fa-star grey sr';
			}
		}
	}

	const showStateRating = () => {
		let stars = document.querySelectorAll('.sr');

		for(let i = 0; i<stars.length; i++) {
			if(i < review.reviewRating) {
				stars[i].className = 'fas fa-star brand-color-txt sr';
			} else {
				stars[i].className = 'fas fa-star grey sr';
			}
		}
	}

	const starsRatingPick = e => {
		if(!isAuthenticated) {
			let el = document.querySelector('.alert-msg-review')
			el.style.display = 'block';
			el.innerText =  language[languageDisplayed].review.needloginAlert 
			setTimeout(() => {
				el.style.display = 'none';
			}, 5000);
		} else {
			setReview({...review, reviewRating: Number(e.target.id.replace('sr-', '')) + 1} )
		}
	}

	const onChangeReviewContent = e => {
		if(!isAuthenticated) {
			let el = document.querySelector('.alert-msg-review')
			el.style.display = 'block';
			el.innerText = language[languageDisplayed].review.needloginAlert
			setTimeout(() => {
				el.style.display = 'none';
			}, 5000);
		} else {
			setReview({...review, reviewContent: e.target.value} )
		}
	}

	const submitReview = () => {
		if(review.reviewRating === 0 || review.reviewContent === '') {
			let el = document.querySelector('.alert-msg-review')
			el.style.display = 'block';
			el.innerText = language[languageDisplayed].review.addReviewAlert
			setTimeout(() => {
				el.style.display = 'none';
			}, 5000);
		} else {
			let reviewForm = {...review};
			reviewForm.id = uuidv4();
			createReview(recipeInfo._id, reviewForm);
		}
		
	}


	return (
		<div id="review-section" className="review-container">
			{languageDisplayed === "fr" ? (
				<h2>{recipeInfo.reviews.length} Avis sur cette recette</h2>
			) : (
				<h2>{recipeInfo.reviews.length} Review{recipeInfo.reviews.length > 1 && "s"} on this recipe</h2>
			)}

			{loading.review ? (
				<img src={spinner} style={{width: '125px', margin: 'auto', display: 'block'}} alt="spinner loading"/>
			) : (
				<div  onMouseEnter={displayReviewTextArea} onMouseLeave={hideReviewTextArea}  style={displayReviewRating()} className="user-review-container">
				<h3>{languageDisplayed === "fr" ? `Qu'en avez-vous pensé ?` : 'What did you think about it?'}</h3>
				<p className="alert-msg-review"></p>
				{ userHasReviewed.userHasReviewed ? (
					<span className="review-sent">{languageDisplayed === "fr" ? userHasReviewed.msg : "Your review has been added"}</span>
				) : (
					<div className="grid-columns-2">
					<div className="user-stars-rating-cont">
						<span>{languageDisplayed === "fr" ? 'Noter cette recette' : 'Rate this recipe'}:</span>
						<div onMouseLeave={showStateRating} className="stars-rating-pick">
								<i onMouseOver={previewRating} onClick={starsRatingPick} id="sr-0" className="fas fa-star grey sr" />
								<i onMouseOver={previewRating} onClick={starsRatingPick} id="sr-1" className="fas fa-star grey sr" />
								<i onMouseOver={previewRating} onClick={starsRatingPick} id="sr-2" className="fas fa-star grey sr" />
								<i onMouseOver={previewRating} onClick={starsRatingPick} id="sr-3" className="fas fa-star grey sr" />
								<i onMouseOver={previewRating} onClick={starsRatingPick} id="sr-4" className="fas fa-star grey sr" />
						</div>
						<div className="review-content-cont">
							<span>{languageDisplayed === "fr" ? 'Votre commentaire' : 'Your review'}</span>
							<textarea
								minLength="10"
								maxLength="400"
								name="reviewContent"
								value={review.reviewContent}
								onChange={onChangeReviewContent}
							/>
						</div>

					</div>
					<div className="btn-review">
						<span onClick={submitReview}>{languageDisplayed === "fr" ? 'Ajouter mon avis' : 'Send my review'}:</span>
					</div>
				</div>
				)}

			</div>
			)}


			<div className="recipe-rating">
				<span className="overall-stars-rating-text">{languageDisplayed === "fr" ? 'Cette recette a reçu' : 'This recipe average'}:</span>
				<div className="overall-stars-rating-stars-cont">
					{averageRatingStarsClassName().map(el => {
						return (<i key={Math.random()} className={el} />);
					})}
				</div>
				{languageDisplayed === "fr" ? (
                	<span className="nbr-review-text">Avec {recipeInfo.reviews.length} {recipeInfo.reviews.length > 1 ? "notes et avis" : "note et avis"}</span>
				): (
					<span className="nbr-review-text">Via {recipeInfo.reviews.length} {recipeInfo.reviews.length > 1 ? "reviews" : "review"}</span>
				)}
			</div>
            <div className="reviews-container">
				{
					recipeInfo.reviews.map(review => {
						return <ReviewItem key={review.id} review={review} />
					})
				}

            </div>
		</div>
	);
};

export default Review;
