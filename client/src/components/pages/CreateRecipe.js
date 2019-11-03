import React from 'react';

const CreateRecipe = () => {
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
						<label>Price</label>
						<input />
					</div>
				</div>

				<div className="create-recipe-steps-ing-cont">
					<div className="create-recipe-ingredient-cont">
						<span>Ingredient:</span>
						<div className="create-recipe-ingredient-item">
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
					</div>
					<div className="create-recipe-steps-cont">
                    <span>Steps:</span>
						<div className="create-recipe-steps-item step-1">
							<label>Step 1:</label>
							<textarea maxlength="400" classNAme="create-recipe step-1" />
						</div>
					</div>
				</div>

				<input type="submit" value="Poster ma recette" className="btn btn-mid btn-submit-recipe" />
			</form>
		</div>
	);
};

export default CreateRecipe;
