import React, { useContext, useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
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
	const { createRecipe, recipeInfo, pushToCreatedRecipe, redirect, loading, recipeErrors, clearRecipeErrors } = recipeContext;

	useEffect(() => {
		loadUser();
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

	const [ recipe, setRecipe ] = useState({
		recipeName: '',
		serving: 1,
		prepTimeHours: '',
		prepTimeMins: '',
		price: '',
		recipeType: ''
	});

	const [ ingredients, setIngredients ] = useState([
		{
			id: uuidv4(),
			ingredientName: '',
			ingredientQuantity: '',
			ingredientMesure: 'gram'
		}
	]);

	const [ steps, setSteps ] = useState([
		{
			id: uuidv4(),
			stepName: '',
			stepContent: ''
		}
	]);

	const [captcha, setCaptcha] = useState(undefined);

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
		recipeForm.captcha = captcha;

		createRecipe(recipeForm);
	};

	return (
		<div className="create-recipe-cont">
			<h1>Créer une recette</h1>
			<form onSubmit={onSubmit}>
				<div className="create-recipe-single-input-cont">
					<div className="create-recipe-input-cont">
						<label htmlFor="recipeName" className="fwbold">Nom de la recette:</label>
						<input
							type="text"
							name="recipeName"
							id="recipeName"
							value={recipe.recipeName}
							onChange={handleChangeRecipe}
							minLength="4"
							maxLength="30"
							required
						/>
					</div>
					<div className="create-recipe-input-cont">
						<label htmlFor="serving" className="fwbold">Nombre de portion:</label>
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
						<label className="fwbold">Temps de préparation:</label>
						<input
							type="number"
							name="prepTimeHours"
							value={recipe.prepTimeHours}
							onChange={handleChangeRecipe}
							placeholder="Heures"
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
						<label className="fwbold">Prix:</label>
						<div className="price-radio-cont">
							<div className="radiobtn-recipe-price">
								<label>Faible:</label>
								<input type="radio" name="price" onClick={handleChangeRecipe} value="lowPrice" />
							</div>
							<div className="radiobtn-recipe-price">
								<label>Moyen:</label>
								<input type="radio" name="price" onClick={handleChangeRecipe} value="midPrice" />
							</div>
							<div className="radiobtn-recipe-price">
								<label>Elevé:</label>
								<input type="radio" name="price" onClick={handleChangeRecipe} value="highPrice" />
							</div>
						</div>
					</div>
				</div>

				<div className="recipe-type-cont">
					<span className="fwbold">Cette recette est:</span>
					<div className="radiobtn-recipe-type-cont">
						<div className="radiobtn-recipe-type">
							<label>Une entrée</label>
							<input type="radio" name="recipeType" onClick={handleChangeRecipe} value="starter" />
						</div>
						<div className="radiobtn-recipe-type">
							<label>Un plat</label>
							<input type="radio" name="recipeType" onClick={handleChangeRecipe} value="mainCourse" />
						</div>
						<div className="radiobtn-recipe-type">
							<label>Un déssert</label>
							<input type="radio" name="recipeType" onClick={handleChangeRecipe} value="dessert" />
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
				{recipeErrors && recipeErrors.map( (e,i) => (<p className="error-msg err-recipe-form" key={'error-' + i}>{e}</p>))}
				<div  style={{textAlign: "center", marginBottom: "8px"}}>
                    <ReCAPTCHA
                    style={{display: "inline-block"}}
                        sitekey="6LeLJsgUAAAAABBZTKu_FRvmvSHDzywvbRj2j69T"
                        onChange={(value) => setCaptcha(value)}
                    />
                </div>
				{loading.sendingRecipe ? (
					<div style={{width: '250px', margin: 'auto', display: 'block'}}>
						<img src={spinner} style={{width: '50px', margin: 'auto', display: 'block'}} alt="loading spinner"/>
					</div>
				) : (
					<input type="submit" value="Poster ma recette" className="btn btn-mid btn-submit-recipe" />
				)}
				
			</form>
		</div>
	);
};

export default CreateRecipe;
