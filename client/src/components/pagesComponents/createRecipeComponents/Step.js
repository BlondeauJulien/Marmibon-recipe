import React, { useContext, useEffect } from 'react';
import RecipeContext from '../../../context/recipe/recipeContext';

const Step = ({ step, stepNumber, deleteStep, handleStepChange }) => {
	const recipeContext = useContext(RecipeContext);

	const {} = recipeContext;

	useEffect(() => {
		let stepNbr = { stepName: `Etape ${stepNumber}` };
		// eslint-disable-next-line
	}, []);

	const handleChange = (change) => {
		handleStepChange(step.id, { ...step, ...change });
	};

	const handleDeleteStep = (e) => {
		e.preventDefault();
		deleteStep(step.id);
	};

	return (
		<div className="create-recipe-steps-item">
			<div className="btn-delete-cont">
				<button className="btn-delete" onClick={handleDeleteStep}>
					&times;
				</button>
			</div>
	<label htmlFor="stepContent">Etape {stepNumber}:</label>
			<textarea
				maxlength="400"
				classNAme="create-recipe step-1"
				name="stepContent"
				value={step.stepContent}
				onChange={(e) => handleChange({ stepContent: e.target.value })}
			/>
		</div>
	);
};

export default Step;
