import React, { useContext, useEffect } from 'react';
import Ingredient from '../pagesComponents/createRecipeComponents/Ingredient';
import Step from '../pagesComponents/createRecipeComponents/Step';
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';

const CreateRecipe = () => {
	const authContext = useContext(AuthContext);
	const recipeContext = useContext(RecipeContext);

	const { loadUser } = authContext;
	const { ingredients, addIngredient, steps, addStep } = recipeContext;

	useEffect(() => {
		loadUser()
		// eslint-disable-next-line
	}, []);

	const handleAddIngredient = (e) => {
		e.preventDefault();
		addIngredient();
	}

	const handleAddStep = e => {
		e.preventDefault();
		addStep();
	}

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
						<label>Prix:</label>
						<div className="price-radio-cont">
						<div className="radiobtn-recipe-price">
							<label>Faible:</label>
							<input type="radio" name="recipe-price" value="low-price"/>
						</div>
						<div className="radiobtn-recipe-price">
							<label>Moyen:</label>
							<input type="radio" name="recipe-price" value="mid-price"/>
						</div>
						<div className="radiobtn-recipe-price">
							<label>Elevé:</label>
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

						{ingredients.map( ingredient => (
							<Ingredient key={ingredient.id} ingredient={ingredient}/>
						))}

						<button className="btn-add-item" title="ajouter un ingredient" onClick={handleAddIngredient}>+</button>
					</div>
					<div className="create-recipe-steps-cont">
                    <span>Etapes:</span>

						{steps.map( step => (
							<Step key={step.id} step={step} /> 
						))}
						<button className="btn-add-item" title="ajouter une étape" onClick={handleAddStep}>+</button>
					</div>
				</div>

				<input type="submit" value="Poster ma recette" className="btn btn-mid btn-submit-recipe" />
			</form>
		</div>
	);
};

export default CreateRecipe;
