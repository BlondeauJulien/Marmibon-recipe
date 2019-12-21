import React from 'react';

const Step = ({ step, stepNumber, deleteStep, handleStepChange, lang }) => {

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
	<label htmlFor="stepContent">{lang === 'fr' ? 'Etape' : 'Step'} {stepNumber}:</label>
			<textarea
				minLength="10"
				maxLength="400"
				className="create-recipe step-1"
				name="stepContent"
				value={step.stepContent}
				onChange={(e) => handleChange({ stepContent: e.target.value })}
				required
			/>
		</div>
	);
};

export default Step;
