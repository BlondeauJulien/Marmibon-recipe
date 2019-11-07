import React, { useContext } from 'react';
import RecipeContext from '../../../context/recipe/recipeContext';

const Step = ({ step }) => {
    const recipeContext = useContext(RecipeContext);

    const { deleteStep } = recipeContext;
    
    const handleDeleteRecipe = e => {
        e.preventDefault();
        deleteStep(step.id);
    }

	return (
		<div className="create-recipe-steps-item step-1">
			<div className="btn-delete-cont">
				<button className="btn-delete" onClick={handleDeleteRecipe}>&times;</button>
			</div>
			<label>Etape 1:</label>
			<textarea maxlength="400" classNAme="create-recipe step-1" />
		</div>
	);
};

export default Step;
