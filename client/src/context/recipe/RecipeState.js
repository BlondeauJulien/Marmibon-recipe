import React, { useReducer } from 'react';
import axios from "axios";
import uuidv4 from 'uuid/v4';
import RecipeContext from './recipeContext';
import recipeReducer from './recipeReducer';
import {
        ADD_INGREDIENT,
        DELETE_INGREDIENT,
        ADD_STEP,
        DELETE_STEP
} from '../types';

const RecipeState = (props) => {
	const initialState = {
        user: null,
        recipeName: '',
        serving: '',
        prepTimeHours: '',
        prepTimeMins: '',
        price: '',
        recipeType: '',
        steps: [{
                id: uuidv4(),
                stepName: '',
                stepContent: ''
        }],
        ingredients: [{
                id: uuidv4(),
                ingredientName: '',
                ingredientQuantity: '',
                ingredientMesure: 'gram'
        }]
	};

        const [ state, dispatch ] = useReducer(recipeReducer, initialState);
        
        const addIngredient = () => {
                let newIng = {
                        id: uuidv4(),
                        ingredientName: '',
                        ingredientQuantity: '',
                        ingredientMesure: 'gram'
                }

                dispatch({
                        type: ADD_INGREDIENT,
                        payload: newIng
                })
        }

        const deleteIngredient = id => {
                dispatch({
                        type: DELETE_INGREDIENT,
                        payload: id
                })
        }

        const addStep = () => {
                let newStep = {
                        id: uuidv4(),
                        stepName: '',
                        stepContent: ''
                }

                dispatch({
                        type: ADD_STEP,
                        payload: newStep
                })
        }

        const deleteStep = id => {
                dispatch({
                        type: DELETE_STEP,
                        payload: id
                })
        }

	return (
		<RecipeContext.Provider
			value={{
                user: state.user,
                recipeName: state.recipeName,
                serving: state.serving,
                prepTimeHours: state.prepTimeHours,
                prepTimeMins: state.prepTimeMins,
                price: state.price,
                recipeType: state.recipeType,
                steps: state.steps,
                ingredients: state.ingredients,
                addIngredient,
                deleteIngredient,
                addStep,
                deleteStep
		}}
		>
			{props.children}
		</RecipeContext.Provider>
	);
};

export default RecipeState;