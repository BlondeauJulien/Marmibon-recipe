import React, { Fragment } from 'react';
import Review from '../pagesComponents/recipeComponents/Review'

const Recipe = () => {
	return (
		<Fragment>
			<div className="recipe-container">
				<h1>Falafels</h1>
				<div className="recipe-header">
					<div className="recipe-user-info">
						<div className="recipe-author-logo">
							<span>J</span>
						</div>
						<span className="recipe-author-name">JulienBld</span>
					</div>
					<div className="recipe-rating-container">
						<div>
							<div className="stars-rating">
								<i className="fas fa-star" />
								<i className="fas fa-star" />
								<i className="fas fa-star" />
								<i className="fas fa-star-half" />
							</div>
							<a className="link-to-comments">7 commentaires</a>
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
							<span className="recipe-info-value">1h20</span>
						</div>
						<div>
							<span className="recipe-info-name">Personnes</span>
							<span className="recipe-info-value">4</span>
						</div>
						<div>
							<span className="recipe-info-name">Prix</span>
							<i className="fas fa-dollar-sign recipe-info-value" />
							<i className="fas fa-dollar-sign recipe-info-value" />
							<i className="fas fa-dollar-sign recipe-info-value" />
						</div>
						<div class="save-btn">
							<i className="far fa-heart heart-save" />
							<span>Je sauvegarde</span>
						</div>
					</div>
				</div>

				<div className="recipe-ing-inst-container">
					<div className="recipe-ingredients">
						<h2>Ingrédients</h2>
						<span className="ingredient-item">200 g de pois chiches</span>
						<span className="ingredient-item">1 oignon moyen</span>
						<span className="ingredient-item">2 gousses d'ail </span>
						<span className="ingredient-item">1 bouquet de persil </span>
						<span className="ingredient-item">3 cuillères à soupe de farine </span>
						<span className="ingredient-item">1 cuillère à café de cumin en poudre </span>
						<span className="ingredient-item">1 cuillère à café de coriandre en poudre</span>
						<span className="ingredient-item">1 cuillère à café de paprika </span>
					</div>
					<div className="recipe-instructions">
						<h2>Préparation</h2>
						<div className="step-container">
							<span className="step-number">Etape 1</span>
							<p className="step-instruction">
								{' '}
								faites tremper les pois chiches et les fèves dans l'eau 12 h, les égoutter et les cuire
								45 mn à l'auto cuiseur.{' '}
							</p>
						</div>
						<div className="step-container">
							<span className="step-number">Etape 2</span>
							<p className="step-instruction">peler oignon et ail, les hacher ainsi que le persil. </p>
						</div>
						<div className="step-container">
							<span className="step-number">Etape 3</span>
							<p className="step-instruction">Passer les fèves et les pois chiches au mixer</p>
						</div>
						<div className="step-container">
							<span className="step-number">Etape 4</span>
							<p className="step-instruction">
								Mélanger avec le persil, l'oignon, l'ail, la farine, les épices, le sel.{' '}
							</p>
						</div>
						<div className="step-container">
							<span className="step-number">Etape 5</span>
							<p className="step-instruction">
								Pétrissez le tout avec vos mains en ajoutant un peu d'eau si nécessaire.
							</p>
						</div>
						<div className="step-container">
							<span className="step-number">Etape 6</span>
							<p className="step-instruction">
								Rassemblez la pâte et laisser reposer au réfrigérateur pendant minimum 30 mn.{' '}
							</p>
						</div>
						<div className="step-container">
							<span className="step-number">Etape 7</span>
							<p className="step-instruction">
								façonner une trentaine de boulettes de la grosseur d'une pièce de 2 euros.
							</p>
						</div>
					</div>
				</div>
			</div>
            <Review />
		</Fragment>
	);
};

export default Recipe;
