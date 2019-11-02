import React from 'react';

const RecipeAbstractItem = () => {
	return (
		<div className="recipe-abstract-item">
			<img src="https://feelgoodfoodie.net/wp-content/uploads/2019/07/Falafel-Recipe-19.jpg" height="175" />
			<div className="recipe-abstract">
				<h2>Falafels</h2>
				<div className="recipe-abstract-rating-cont">
					<div className="recipe-abstract-stars-cont">
						<i class="fas fa-star" />
						<i class="fas fa-star" />
						<i class="fas fa-star" />
						<i class="fas fa-star" />
						<i class="fas fa-star" />
					</div>
					<div className="recipe-abstract-rating-text">4.6 / 5 sur 7 avis</div>
				</div>
				<div className="recipe-abstract-ingredients">
					<span>Ingredients: </span>
					<p>ingredient1, ingredient1, ingredient1, ingredient1, ingredient1, ingredient1, ingredient1</p>
				</div>
				<div className="recipe-abstract-time">
					<i class="far fa-clock"></i>{` `}1h20
				</div>
			</div>
		</div>
	);
};

export default RecipeAbstractItem;
