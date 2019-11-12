import React, { useState } from 'react';
import ReviewItem from './ReviewItem';

const Review = ( { recipeInfo }) => {
	const [review, setReview] = useState({
		reviewRating: 0,
		reviewContent: ''
	});

	const displayReviewTextArea = () => {
		document.querySelector('.review-content-cont').style.display = 'block';
	}

	const hideReviewTextArea = e => {
		if(review.reviewRating === 0 && review.reviewContent === '') {
			document.querySelector('.review-content-cont').style.display = 'none';
		}

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
		setReview({...review, reviewRating: Number(e.target.id.replace('sr-', '')) + 1} )
	}

	const onChangeReviewContent = e => {
		setReview({...review, reviewContent: e.target.value} )
	}

	return (
		<div className="review-container">
			<h2>7 Avis sur cette recette</h2>
			<div onMouseEnter={displayReviewTextArea} onMouseLeave={hideReviewTextArea} className="user-review-container">
				<h3>Qu'en avez-vous pensé ?</h3>
				<div className="grid-columns-2">
					<div className="user-stars-rating-cont">
						<span>Noter cette recette:</span>
						<div onMouseLeave={showStateRating} className="stars-rating">
								<i onMouseOver={previewRating} onClick={starsRatingPick} id="sr-0" className="fas fa-star grey sr" />
								<i onMouseOver={previewRating} onClick={starsRatingPick} id="sr-1" className="fas fa-star grey sr" />
								<i onMouseOver={previewRating} onClick={starsRatingPick} id="sr-2" className="fas fa-star grey sr" />
								<i onMouseOver={previewRating} onClick={starsRatingPick} id="sr-3" className="fas fa-star grey sr" />
								<i onMouseOver={previewRating} onClick={starsRatingPick} id="sr-4" className="fas fa-star grey sr" />
						</div>
						<div className="review-content-cont">
							<textarea
								maxLength="400"
								name="reviewContent"
								value={review.reviewContent}
								onChange={onChangeReviewContent}
							/>
						</div>

					</div>
					<div className="btn-review">
						<span>Ajouter un avis</span>
					</div>
				</div>
			</div>
			<div className="recipe-rating">
				<span className="overall-stars-rating-text">Cette recette a reçu:</span>
				<div className="overall-stars-rating-stars-cont">
					<i className="fas fa-star" />
					<i className="fas fa-star" />
					<i className="fas fa-star" />
					<i className="fas fa-star" />
					<i className="fas fa-star" />
				</div>
                <span className="nbr-review-text">Avec 7 notes et avis</span>
			</div>
            <div className="reviews-container">
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />

            </div>
		</div>
	);
};

export default Review;
