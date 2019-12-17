import React from 'react';

const Ingredient = ({ ingredient, deleteIngredient, handleIngredientChange }) => {

	const handleChange = (change) => {
		handleIngredientChange(ingredient.id, { ...ingredient, ...change });
	};

	const handleDeleteIngredient = (e) => {
		e.preventDefault();
		deleteIngredient(ingredient.id);
	};

	return (
		<div className="create-recipe-ingredient-item" key={ingredient.id}>
			<div className="btn-delete-cont" onClick={handleDeleteIngredient}>
				<button className="btn-delete">&times;</button>
			</div>
			<label htmlFor="ingredientName">Nom:</label>
			<input
				type="text"
				name="ingredientName"
				id="ingredientName"
				value={ingredient.ingredientName}
				onChange={(e) => handleChange({ ingredientName: e.target.value })}
				maxLength="20"
				required
			/>
			<label htmlFor="ingredientQuantity">Quantité:</label>
			<input
				type="number"
				name="ingredientQuantity"
				value={ingredient.ingredientQuantity}
				min="1"
				max="5000"
				onChange={(e) => handleChange({ ingredientQuantity: e.target.value })}
				required
			/>
			<label htmlFor="ingredientMesure">Mesure:</label>
			<select
				name="ingredientMesure"
				value={ingredient.ingredientMesure}
				onChange={(e) => handleChange({ ingredientMesure: e.target.value })}
			>
				<option value="whole">Entier</option>
				<option value="gram">Gramme</option>
				<option value="kilo">Kilo</option>
				<option value="liter">litre</option>
				<option value="centilitre">Centilitre</option>
			</select>
		</div>
	);
};

export default Ingredient;
