import React, { useContext } from 'react';
import RecipeContext from '../../../context/recipe/recipeContext';


const Ingredient = ({ ingredient }) => {
	const recipeContext = useContext(RecipeContext);

    const { deleteIngredient } = recipeContext;
    
    const handleDeleteIngredient = e => {
        e.preventDefault();
        deleteIngredient(ingredient.id);
    }

	return (
		<div className="create-recipe-ingredient-item" key={ingredient.id}>
			<div className="btn-delete-cont" onClick={handleDeleteIngredient}>
				<button className="btn-delete">&times;</button>
			</div>
			<label>Nom:</label>
			<input type="text" value={ingredient.ingredientName} />
			<label>Quantité:</label>
			<input type="number" value={ingredient.ingredientQuantity} min="1" max="5000" />
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
	);
};

export default Ingredient;