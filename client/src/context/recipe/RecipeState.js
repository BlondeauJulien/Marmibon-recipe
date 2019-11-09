import React, { useReducer } from 'react';
import axios from "axios";
import uuidv4 from 'uuid/v4';
import RecipeContext from './recipeContext';
import recipeReducer from './recipeReducer';
import {
        CREATE_RECIPE_SUCCESS,
        CREATE_RECIPE_FAIL
} from '../types';

const RecipeState = (props) => {
	const initialState = {
                recipe: null
	};

        const [ state, dispatch ] = useReducer(recipeReducer, initialState);

        const createRecipe = async formData => {
                const config = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                }

                try {
                        const res = await axios.post('/api/recipes', formData, config);
            
                        dispatch({
                            type: CREATE_RECIPE_SUCCESS,
                            payload: res.data
            
                        });
            
                } catch (err) {
                        console.log(err)
                        dispatch({
                                type: CREATE_RECIPE_FAIL,
                                payload: err.response.data.msg
                        })
                }
        }
        
        

	return (
		<RecipeContext.Provider
			value={{
                recipe: state.recipe,
                createRecipe
		}}
		>
			{props.children}
		</RecipeContext.Provider>
	);
};

export default RecipeState;