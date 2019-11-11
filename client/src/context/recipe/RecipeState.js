import React, { useReducer } from 'react';
import axios from "axios";
import RecipeContext from './recipeContext';
import recipeReducer from './recipeReducer';
import {
        CREATE_RECIPE_SUCCESS,
        CREATE_RECIPE_FAIL,
        LOAD_RECIPE,
        LOAD_RECIPE_FAIL
} from '../types';

const RecipeState = (props) => {
	const initialState = {
                recipeInfo: null,
                recipeAuthor: null
	};

        const [ state, dispatch ] = useReducer(recipeReducer, initialState);

        const createRecipe = async formData => {
                const config = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                }

                try {
                        const recipeRes = await axios.post('/api/recipes', formData, config);
                        const recipeAuthorRes = await axios.get(`/api/users/${recipeRes.data.user}`)
            
                        dispatch({
                            type: CREATE_RECIPE_SUCCESS,
                            payload: {
                                recipeRes: recipeRes.data,
                                recipeAuthorRes: recipeAuthorRes.data
                            }
            
                        });      
            
                } catch (err) {
                        console.log(err)
                        dispatch({
                                type: CREATE_RECIPE_FAIL,
                                payload: err.response.data.msg
                        })
                }
        }

        // Get Recipe from DB

        const loadRecipe = async (id) => {
                try {
                        const recipeRes = await axios.get(`/api/recipes/${id}`);
                        const recipeAuthorRes = await axios.get(`/api/users/${recipeRes.data.user}`)

                        dispatch({
                            type: LOAD_RECIPE,
                            payload: {
                                recipeRes: recipeRes.data,
                                recipeAuthorRes: recipeAuthorRes.data
                                }
                        })
            
                } catch (err) {
                        console.log(err)
                        dispatch({
                                type: LOAD_RECIPE_FAIL,
                                payload: err.response.data.msg
                
                        })
                }
        }
        
        

	return (
		<RecipeContext.Provider
			value={{
                recipeInfo: state.recipeInfo,
                recipeAuthor: state.recipeAuthor,
                createRecipe,
                loadRecipe
		}}
		>
			{props.children}
		</RecipeContext.Provider>
	);
};

export default RecipeState;