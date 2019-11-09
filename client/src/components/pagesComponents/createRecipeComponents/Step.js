import React, { useContext } from 'react';
import RecipeContext from '../../../context/recipe/recipeContext';

const Step = ({ step, stepNumber, deleteStep }) => {
    const recipeContext = useContext(RecipeContext);

    const {  } = recipeContext;
    
    const handleDeleteStep = e => {
        e.preventDefault();
        deleteStep(step.id);
    }

	return (
		<div className="create-recipe-steps-item step-1">
			<div className="btn-delete-cont">
				<button className="btn-delete" onClick={handleDeleteStep}>&times;</button>
			</div>
			<label>Etape {stepNumber}:</label>
			<textarea maxlength="400" classNAme="create-recipe step-1" />
		</div>
	);
};

export default Step;
