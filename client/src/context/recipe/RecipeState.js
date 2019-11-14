import React, { useReducer } from 'react';
import axios from "axios";
import RecipeContext from './recipeContext';
import recipeReducer from './recipeReducer';
import {
        CREATE_RECIPE_SUCCESS,
        CREATE_RECIPE_FAIL,
        LOAD_RECIPE,
        LOAD_RECIPE_FAIL,
        ADD_RECIPE_REVIEW,
        REDIRECT_TO_RECIPE
} from '../types';

const RecipeState = (props) => {
	const initialState = {
                recipeInfo: null,
                recipeAuthor: null,
                userHasReviewed: false,
                pushToCreatedRecipe: false
	};

        const [ state, dispatch ] = useReducer(recipeReducer, initialState);

        // Create recipe

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

        const loadRecipe = async id => {
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

        // Create an user review

        const createReview = async (id, formData) => {
                const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
                        const res = await axios.put(`/api/recipes/${id}/addreview`, formData, config);
                        console.log(res)
 			dispatch({
                                type: ADD_RECIPE_REVIEW,
                                payload: res.data
			}); 

		} catch (err) {
                        console.log('error')
/* 			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.msg
			}); */
		}
        }

        // Redirect to recipe after creation

        const redirectToRecipe = bool => {
                dispatch({
                        type: REDIRECT_TO_RECIPE,
                        payload: bool
                })
        }
        
        

	return (
		<RecipeContext.Provider
			value={{
                recipeInfo: state.recipeInfo,
                recipeAuthor: state.recipeAuthor,
                userHasReviewed: state.userHasReviewed,
                pushToCreatedRecipe: state.pushToCreatedRecipe,
                createRecipe,
                loadRecipe,
                createReview,
                redirectToRecipe              
		}}
		>
			{props.children}
		</RecipeContext.Provider>
	);
};

export default RecipeState;