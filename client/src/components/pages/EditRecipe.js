import React, { useContext, useState, useEffect } from 'react';
import uuidv4 from 'uuid/v4';
import Ingredient from '../pagesComponents/createRecipeComponents/Ingredient';
import Step from '../pagesComponents/createRecipeComponents/Step';
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';
import spinner from '../layout/spinner.gif';

const CreateRecipe = (props) => {
	const authContext = useContext(AuthContext);
	const recipeContext = useContext(RecipeContext);

	const { loadUser, isAuthenticated } = authContext;
	const { recipeInfo, pushToCreatedRecipe, redirectToRecipe, redirect, loading, recipeToUpdate, updateRecipe, redirectToEdit } = recipeContext;

	useEffect(() => {
		loadUser();
		redirectToEdit(false);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
        if(!isAuthenticated) {
            props.history.push('/')
        }
        // eslint-disable-next-line
    }, [isAuthenticated, props.history])

	useEffect(() => {
        if(recipeInfo !== null && pushToCreatedRecipe) {
            props.history.push(`/recipe/${recipeInfo._id}`)
        }
        // eslint-disable-next-line
	}, [recipeInfo, props.history]);
	
	useEffect(() => {
        if(redirect.recipeCont) {
            props.history.push(`recipe/${recipeInfo._id}`)
        }
    }, [redirect]);

    useEffect(() => {
        if(loading.updateRecipe) {
            return (<img src={spinner} style={{width: '125px', margin: 'auto', display: 'block'}}/>)
        }
	}, [loading])

	const [ recipe, setRecipe ] = useState({
		recipeName: recipeToUpdate.recipeName,
		serving: recipeToUpdate.serving,
		prepTimeHours: recipeToUpdate.prepTimeHours,
		prepTimeMins: recipeToUpdate.prepTimeMins,
		price: recipeToUpdate.price,
		recipeType: recipeToUpdate.recipeType
	});

	const [ ingredients, setIngredients ] = useState([...recipeToUpdate.ingredients]);

	const [ steps, setSteps ] = useState([...recipeToUpdate.steps]);

	const handleChangeRecipe = (e) => {
		setRecipe({ ...recipe, [e.target.name]: e.target.value });
	};

	/* Ingredient state events */

	const handleIngredientChange = (id, ingredient) => {
		const newIngredients = [ ...ingredients ];
		const index = newIngredients.findIndex((i) => i.id === id);
		newIngredients[index] = ingredient;
		setIngredients(newIngredients);
	};

	const addIngredient = (e) => {
		e.preventDefault();
		let newIng = {
			id: uuidv4(),
			ingredientName: '',
			ingredientQuantity: '',
			ingredientMesure: 'gram'
		};
		setIngredients([ ...ingredients, newIng ]);
	};

	const deleteIngredient = (id) => {
		setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
	};

	/* Step state events */

	const handleStepChange = (id, step) => {
		const newSteps = [ ...steps ];
		const index = newSteps.findIndex((s) => s.id === id);
		newSteps[index] = step;
		setSteps(newSteps);
	};

	const deleteStep = (id) => {
		setSteps(steps.filter((step) => step.id !== id));
	};

	const addStep = (e) => {
		e.preventDefault();
		let newStep = {
			id: uuidv4(),
			stepName: '',
			stepContent: ''
		};
		setSteps([ ...steps, newStep ]);
	};

	/* Submit create Recipe */

	const onSubmit = (e) => {
		e.preventDefault();

		let recipeForm = { ...recipe };
		recipeForm.ingredients = [ ...ingredients ];
		recipeForm.steps = [ ...steps ];
		recipeForm.steps.map((step, index) => {
			step.stepName = `Etape ${index + 1}`;
			return step;
		});

		updateRecipe(recipeToUpdate._id , recipeForm);
		redirectToRecipe(true)
	};


	return (
		<div className="create-recipe-cont">
			<h1>Editer votre recette</h1>
			<form onSubmit={onSubmit}>
				<div className="create-recipe-single-input-cont">
					<div className="create-recipe-input-cont">
						<label htmlFor="recipeName">Nom de la recette:</label>
						<input
							type="text"
							name="recipeName"
							id="recipeName"
							value={recipe.recipeName}
							onChange={handleChangeRecipe}
						/>
					</div>
					<div className="create-recipe-input-cont">
						<label htmlFor="serving">Nombre de portion:</label>
						<input
							type="number"
							name="serving"
							id="serving"
							value={recipe.serving}
							onChange={handleChangeRecipe}
							min="1"
							max="10"
						/>
					</div>
					<div className="create-recipe-input-cont">
						<label>Temps de préparation:</label>
						<input
							type="number"
							name="prepTimeHours"
							value={recipe.prepTimeHours}
							onChange={handleChangeRecipe}
							placeholder="Heures"
							min="0"
							max="24"
							className="pct-50"
						/>
						<input
							type="number"
							name="prepTimeMins"
							value={recipe.prepTimeMins}
							onChange={handleChangeRecipe}
							placeholder="Minutes"
							min="1"
							max="60"
							className="pct-50"
						/>
					</div>
					<div className="create-recipe-input-cont">
						<label>Prix:</label>
						<div className="price-radio-cont">
							<div className="radiobtn-recipe-price">
								<label>Faible:</label>
								<input type="radio" name="price" onChange={handleChangeRecipe} value="lowPrice" checked={recipe.price === "lowPrice"}/>
							</div>
							<div className="radiobtn-recipe-price">
								<label>Moyen:</label>
								<input type="radio" name="price" onChange={handleChangeRecipe} value="midPrice" checked={recipe.price === "midPrice"}/>
							</div>
							<div className="radiobtn-recipe-price">
								<label>Elevé:</label>
								<input type="radio" name="price" onChange={handleChangeRecipe} value="highPrice" checked={recipe.price === "highPrice"}/>
							</div>
						</div>
					</div>
				</div>

				<div className="recipe-type-cont">
					<span>Cette recette est:</span>
					<div className="radiobtn-recipe-type-cont">
						<div className="radiobtn-recipe-type">
							<label>Une entrée</label>
							<input type="radio" name="recipeType" onChange={handleChangeRecipe} value="starter" checked={recipe.recipeType === "starter"}/>
						</div>
						<div className="radiobtn-recipe-type">
							<label>Un plat</label>
							<input type="radio" name="recipeType" onChange={handleChangeRecipe} value="mainCourse" checked={recipe.recipeType === "mainCourse"}/>
						</div>
						<div className="radiobtn-recipe-type">
							<label>Un déssert</label>
							<input type="radio" name="recipeType" onChange={handleChangeRecipe} value="dessert" checked={recipe.recipeType === "dessert"}/>
						</div>
					</div>
				</div>

				<div className="create-recipe-steps-ing-cont">
					<div className="create-recipe-ingredient-cont">
						<span>Ingredients:</span>

						{ingredients.map((ingredient) => (
							<Ingredient
								key={ingredient.id}
								ingredient={ingredient}
								deleteIngredient={deleteIngredient}
								handleIngredientChange={handleIngredientChange}
							/>
						))}

						<button className="btn-add-item" title="ajouter un ingredient" onClick={addIngredient}>
							+
						</button>
					</div>
					<div className="create-recipe-steps-cont">
						<span>Etapes:</span>

						{steps.map((step) => (
							<Step
								key={step.id}
								step={step}
								stepNumber={steps.indexOf(step) + 1}
								deleteStep={deleteStep}
								handleStepChange={handleStepChange}
							/>
						))}

						<button className="btn-add-item" title="ajouter une étape" onClick={addStep}>
							+
						</button>
					</div>
				</div>

				<input type="submit" value="Editer ma recette" className="btn btn-mid btn-submit-recipe" />
			</form>
		</div>
	);
};

export default CreateRecipe;
