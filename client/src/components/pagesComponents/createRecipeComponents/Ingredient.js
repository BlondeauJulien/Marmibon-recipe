import React from 'react';

const Ingredient = ({ ingredient, deleteIngredient, handleIngredientChange, lang }) => {

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
			<label htmlFor="ingredientName">{lang === 'fr' ? 'Nom' : 'Name'}:</label>
			<input
				type="text"
				name="ingredientName"
				id="ingredientName"
				value={ingredient.ingredientName}
				onChange={(e) => handleChange({ ingredientName: e.target.value })}
				maxLength="20"
				required
			/>
			<label htmlFor="ingredientQuantity">{lang === 'fr' ? 'Quantité' : 'Quantity'}:</label>
			<input
				type="number"
				name="ingredientQuantity"
				value={ingredient.ingredientQuantity}
				min="1"
				max="5000"
				onChange={(e) => handleChange({ ingredientQuantity: e.target.value })}
				required
			/>
			<label htmlFor="ingredientMesure">{lang === 'fr' ? 'Mesure' : 'Mesurement'}:</label>
			<select
				name="ingredientMesure"
				value={ingredient.ingredientMesure}
				onChange={(e) => handleChange({ ingredientMesure: e.target.value })}
			>
				<option value="gram">{lang === 'fr' ? 'Gramme' : 'Gram'}</option>
				<option value="kilo">Kilo</option>
				<option value="liter">{lang === 'fr' ? 'litre' : 'liter'}</option>
				<option value="centilitre">{lang === 'fr' ? 'Centilitre' : 'Centiliter'}</option>
				<option value="whole">{lang === 'fr' ? 'Entier' : 'Whole'}</option>
			</select>
		</div>
	);
};

export default Ingredient;
