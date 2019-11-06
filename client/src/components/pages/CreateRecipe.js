import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const CreateRecipe = () => {
	const authContext = useContext(AuthContext);

	const { loadUser } = authContext;

	useEffect(() => {
		loadUser()
		// eslint-disable-next-line
    }, [])

	return (
		<div className="create-recipe-cont">
			<h1>Créer une recette</h1>
			<form>
				<div className="create-recipe-single-input-cont">
					<div className="create-recipe-input-cont">
						<label>Nom de la recette:</label>
						<input type="text"/>
					</div>
					<div className="create-recipe-input-cont">
						<label>Nombre de portion:</label>
						<input type="number" min="1" max="10" />
					</div>
					<div className="create-recipe-input-cont">
						<label>Temps de préparation:</label>
						<input type="number" placeholder="Heures" min="0" max="24" className="pct-50"/>
                        <input type="number" placeholder="Minutes" min="1" max="60" className="pct-50"/>
					</div>
					<div className="create-recipe-input-cont">
						<label>prix:</label>
						<div className="price-radio-cont">
						<div className="radiobtn-recipe-price">
							<label>Faible</label>
							<input type="radio" name="recipe-price" value="low-price"/>
						</div>
						<div className="radiobtn-recipe-price">
							<label>Moyen</label>
							<input type="radio" name="recipe-price" value="mid-price"/>
						</div>
						<div className="radiobtn-recipe-price">
							<label>Chère</label>
							<input type="radio" name="recipe-price" value="high-price"/>
						</div>
						</div>
					</div>
				</div>

				<div className="recipe-type-cont">
					<span>Cette recette est:</span>
					<div className="radiobtn-recipe-type-cont">
						<div className="radiobtn-recipe-type">
							<label>Une entrée</label>
							<input type="radio" name="recipe-type" value="starter"/>
						</div>
						<div className="radiobtn-recipe-type">
							<label>Un plat</label>
							<input type="radio" name="recipe-type" value="main-course" />
						</div>
						<div className="radiobtn-recipe-type">
							<label>Un déssert</label>
							<input type="radio" name="recipe-type" value="dessert"/>
						</div>
					</div>
				</div>

				<div className="create-recipe-steps-ing-cont">
					<div className="create-recipe-ingredient-cont">
						<span>Ingredient:</span>
						<div className="create-recipe-ingredient-item">
						<div className="btn-delete-cont"><button className="btn-delete">&times;</button></div>
							<label>Nom:</label>
							<input type="text" />
							<label>Quantité:</label>
							<input type="number" min="1" max="5000" />
							<label>Mesure:</label>
							<select name="measurement">
								<option value="entier">Entier</option>
								<option value="gram" selected>
									Gramme
								</option>
								<option value="kilo">Kilo</option>
								<option value="liter">litre</option>
								<option value="centilitre">Centilitre</option>
							</select>
						</div>
						<button className="btn-add-item" title="ajouter un ingredient">+</button>
					</div>
					<div className="create-recipe-steps-cont">
                    <span>Etapes:</span>
						<div className="create-recipe-steps-item step-1">
						<div className="btn-delete-cont"><button className="btn-delete">&times;</button></div>
							<label>Etape 1:</label>
							<textarea maxlength="400" classNAme="create-recipe step-1" />
						</div>
						<button className="btn-add-item" title="ajouter une étape">+</button>
					</div>
				</div>

				<input type="submit" value="Poster ma recette" className="btn btn-mid btn-submit-recipe" />
			</form>
		</div>
	);
};

export default CreateRecipe;
