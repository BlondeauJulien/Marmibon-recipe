import React, { useState, useEffect } from 'react';
import ReviewItem from './ReviewItem';
import uuidv4 from 'uuid/v4';
import spinner from '../../layout/spinner.gif';

const Review = ( { user, recipeInfo, createReview, isAuthenticated, averageRatingStarsClassName, userHasReviewed, loading }) => {


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
				if(user._id === recipeInfo.reviews[i].authorId || user._id == recipeInfo.user) {
					display.display = "none";
					break;
				}
			}
			if(user._id == recipeInfo.user) {
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
			el.innerText = "Vous devez être connecter pour donner votre avis"
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
			el.innerText = "Vous devez être connecter pour donner votre avis"
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
			el.innerText = "Ajouter une note et un commentaire s'il vous plait"
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
			<h2>{recipeInfo.reviews.length} Avis sur cette recette</h2>
			{loading.review ? (
				<img src={spinner} style={{width: '125px', margin: 'auto', display: 'block'}}/>
			) : (
				<div  onMouseEnter={displayReviewTextArea} onMouseLeave={hideReviewTextArea}  style={displayReviewRating()} className="user-review-container">
				<h3>Qu'en avez-vous pensé ?</h3>
				<p className="alert-msg-review"></p>
				{ userHasReviewed.userHasReviewed ? (
					<span className="review-sent">{userHasReviewed.msg}</span>
				) : (
					<div className="grid-columns-2">
					<div className="user-stars-rating-cont">
						<span>Noter cette recette:</span>
						<div onMouseLeave={showStateRating} className="stars-rating-pick">
								<i onMouseOver={previewRating} onClick={starsRatingPick} id="sr-0" className="fas fa-star grey sr" />
								<i onMouseOver={previewRating} onClick={starsRatingPick} id="sr-1" className="fas fa-star grey sr" />
								<i onMouseOver={previewRating} onClick={starsRatingPick} id="sr-2" className="fas fa-star grey sr" />
								<i onMouseOver={previewRating} onClick={starsRatingPick} id="sr-3" className="fas fa-star grey sr" />
								<i onMouseOver={previewRating} onClick={starsRatingPick} id="sr-4" className="fas fa-star grey sr" />
						</div>
						<div className="review-content-cont">
							<span>Votre commentaire:</span>
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
						<span onClick={submitReview}>Ajouter mon avis</span>
					</div>
				</div>
				)}

			</div>
			)}


			<div className="recipe-rating">
				<span className="overall-stars-rating-text">Cette recette a reçu:</span>
				<div className="overall-stars-rating-stars-cont">
					{averageRatingStarsClassName().map(el => {
						return (<i key={Math.random()} className={el} />);
					})}
				</div>
                <span className="nbr-review-text">Avec {recipeInfo.reviews.length} {recipeInfo.reviews.length > 1 ? "notes et avis" : "note et avis"}</span>
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
