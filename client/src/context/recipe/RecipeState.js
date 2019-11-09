import React, { useReducer } from 'react';
import axios from "axios";
import uuidv4 from 'uuid/v4';
import RecipeContext from './recipeContext';
import recipeReducer from './recipeReducer';
import {

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
		}}
		>
			{props.children}
		</RecipeContext.Provider>
	);
};

export default RecipeState;