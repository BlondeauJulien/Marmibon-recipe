import React, { useContext, useState, useEffect } from 'react';
import uuidv4 from 'uuid/v4';
import Ingredient from '../pagesComponents/createRecipeComponents/Ingredient';
import Step from '../pagesComponents/createRecipeComponents/Step';
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';
import LanguageContext from '../../context/language/languageContext';
import spinner from '../layout/spinner.gif';

const EditRecipe = (props) => {
	const authContext = useContext(AuthContext);
	const recipeContext = useContext(RecipeContext);
	const languageContext = useContext(LanguageContext);

	const { loadUser, isAuthenticated } = authContext;
	const { recipeInfo, redirect, loading, recipeToUpdate, updateRecipe, redirectToEdit, pushToCreatedRecipe, recipeErrors, clearRecipeErrors} = recipeContext;
	const { languageDisplayed } = languageContext;

	useEffect(() => {
		loadUser();
		redirectToEdit(false);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
        if(!isAuthenticated) {
            props.history.push('/')
		}
		if(recipeErrors) {
            setTimeout(() => {
				clearRecipeErrors()
            }, 60000);
		}
		// eslint-disable-next-line
	}, [recipeErrors, isAuthenticated, props.history])
	
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
		// eslint-disable-next-line
    }, [redirect]);

    useEffect(() => {
        if(loading.updateRecipe) {
            return (<img src={spinner} style={{width: '125px', margin: 'auto', display: 'block'}} alt="spinner loading"/>)
        }
	}, [loading])

	const [ recipe, setRecipe ] = useState({
		recipeName: recipeToUpdate !== null ? recipeToUpdate.recipeName : '',
		serving: recipeToUpdate !== null ? recipeToUpdate.serving : '',
		prepTimeHours: recipeToUpdate !== null ? recipeToUpdate.prepTimeHours : '',
		prepTimeMins: recipeToUpdate !== null ? recipeToUpdate.prepTimeMins : '',
		price: recipeToUpdate !== null ? recipeToUpdate.price : '',
		recipeType: recipeToUpdate !== null ? recipeToUpdate.recipeType : ''
	});

	const [ ingredients, setIngredients ] = useState(recipeToUpdate !== null ? [...recipeToUpdate.ingredients] : []);

	const [ steps, setSteps ] = useState(recipeToUpdate !== null ? [...recipeToUpdate.steps] : []);

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
	};


	return (
		<div className="create-recipe-cont">
			<h1>{languageDisplayed === 'fr' ? `Editer votre recette` : 'Edit your recipe'}</h1>
			<form onSubmit={onSubmit}>
				<div className="create-recipe-single-input-cont">
					<div className="create-recipe-input-cont">
						<label htmlFor="recipeName" className="fwbold">{languageDisplayed === 'fr' ? `Nom de la recette` : 'Recipe Name'}:</label>
						<input
							type="text"
							name="recipeName"
							id="recipeName"
							value={recipe.recipeName}
							onChange={handleChangeRecipe}
							maxLength="30"
							required
						/>
					</div>
					<div className="create-recipe-input-cont" >
						<label htmlFor="serving" className="fwbold">{languageDisplayed === 'fr' ? `Nombre de portion` : 'Serving'}:</label>
						<input
							type="number"
							name="serving"
							id="serving"
							value={recipe.serving}
							onChange={handleChangeRecipe}
							min="1"
							max="10"
							required
						/>
					</div>
					<div className="create-recipe-input-cont">
						<label className="fwbold">{languageDisplayed === 'fr' ? `Temps de préparation` : 'Preparation time'}:</label>
						<input
							type="number"
							name="prepTimeHours"
							value={recipe.prepTimeHours}
							onChange={handleChangeRecipe}
							placeholder={languageDisplayed === 'fr' ? `Heures` : 'Hours'}
							min="0"
							max="24"
							className="pct-50"
							required
						/>
						<input
							type="number"
							name="prepTimeMins"
							value={recipe.prepTimeMins}
							onChange={handleChangeRecipe}
							placeholder="Minutes"
							min="1"
							max="59"
							className="pct-50"
							required
						/>
					</div>
					<div className="create-recipe-input-cont">
						<label className="fwbold">{languageDisplayed === 'fr' ? `Prix` : 'Price'}:</label>
						<div className="price-radio-cont">
							<div className="radiobtn-recipe-price">
								<label>{languageDisplayed === 'fr' ? `Faible` : 'Low'}:</label>
								<input type="radio" name="price" onChange={handleChangeRecipe} value="lowPrice" checked={recipe.price === "lowPrice"}/>
							</div>
							<div className="radiobtn-recipe-price">
								<label>{languageDisplayed === 'fr' ? `Moyen` : 'Medium'}:</label>
								<input type="radio" name="price" onChange={handleChangeRecipe} value="midPrice" checked={recipe.price === "midPrice"}/>
							</div>
							<div className="radiobtn-recipe-price">
								<label>{languageDisplayed === 'fr' ? `Elevé` : 'high'}:</label>
								<input type="radio" name="price" onChange={handleChangeRecipe} value="highPrice" checked={recipe.price === "highPrice"}/>
							</div>
						</div>
					</div>
				</div>

				<div className="recipe-type-cont">
					<span className="fwbold">{languageDisplayed === 'fr' ? `Cette recette est` : 'This recipe is'}:</span>
					<div className="radiobtn-recipe-type-cont">
						<div className="radiobtn-recipe-type">
							<label>{languageDisplayed === 'fr' ? `Une entrée` : 'A starter'}</label>
							<input type="radio" name="recipeType" onChange={handleChangeRecipe} value="starter" checked={recipe.recipeType === "starter"}/>
						</div>
						<div className="radiobtn-recipe-type">
							<label>{languageDisplayed === 'fr' ? `Un plat` : 'A main course'}</label>
							<input type="radio" name="recipeType" onChange={handleChangeRecipe} value="mainCourse" checked={recipe.recipeType === "mainCourse"}/>
						</div>
						<div className="radiobtn-recipe-type">
							<label>{languageDisplayed === 'fr' ? `Un déssert` : 'A dessert'}</label>
							<input type="radio" name="recipeType" onChange={handleChangeRecipe} value="dessert" checked={recipe.recipeType === "dessert"}/>
						</div>
					</div>
				</div>

				<div className="create-recipe-steps-ing-cont">
					<div className="create-recipe-ingredient-cont">
						<span className="fwbold">{languageDisplayed === 'fr' ? `Ingrédients` : 'Ingredients'}:</span>

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
						<span className="fwbold">{languageDisplayed === 'fr' ? `Etapes` : 'Steps'}:</span>

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
				{recipeErrors && recipeErrors.map( (e,i) => (<p className="error-msg err-recipe-form" key={'error-' + i}>{e}</p>))}
				{loading.sendingRecipe ? (
					<div style={{width: '250px', margin: 'auto', display: 'block'}}>
						<img src={spinner} style={{width: '50px', margin: 'auto', display: 'block'}} alt="spinner loading"/>
					</div>
				) : (
					<input type="submit" value={languageDisplayed === 'fr' ? "Editer ma recette" : 'Edit my recipe'} className="btn btn-mid btn-submit-recipe" />
				)}
				
			</form>
		</div>
	);
};

export default EditRecipe;
