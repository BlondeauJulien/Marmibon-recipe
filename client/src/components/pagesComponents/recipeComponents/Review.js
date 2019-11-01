import React from 'react';

const Review = () => {
	return (
		<div className="review-container">
			<h2>7 Avis sur cette recette</h2>
			<div className="user-review-container">
				<h3>Qu'en avez-vous pensé ?</h3>
				<div className="grid-columns-2">
					<div className="user-stars-rating-cont">
						<span>Noter cette recette:</span>
						<div className="stars-rating">
							<i class="fas fa-star grey" />
							<i class="fas fa-star grey" />
							<i class="fas fa-star grey" />
							<i class="fas fa-star grey" />
							<i class="fas fa-star grey" />
						</div>
					</div>
					<div className="btn-review">
						<span>Ajouter un avis</span>
					</div>
				</div>
			</div>
			<div className="recipe-rating">
				<span className="overall-stars-rating-text">Cette recette a reçu:</span>
				<div class="overall-stars-rating-stars-cont">
					<i class="fas fa-star" />
					<i class="fas fa-star" />
					<i class="fas fa-star" />
					<i class="fas fa-star" />
					<i class="fas fa-star" />
				</div>
                <span className="nbr-review-text">Avec 7 notes et avis</span>
			</div>
            <div className="reviews-container">
                
            </div>
		</div>
	);
};

export default Review;
