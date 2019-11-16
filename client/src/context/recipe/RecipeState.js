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
        REDIRECT_TO_RECIPE,
        SET_LOADING,
        STOP_LOADING,
        USER_SAVE_RECIPE,
        USER_UNSAVE_RECIPE
} from '../types';

const RecipeState = (props) => {
	const initialState = {
                recipeInfo: null,
                recipeAuthor: null,
                userHasReviewed: false,
                pushToCreatedRecipe: false,
                loading: {
                        saveRecipeBtn: false
                }
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

        // save recipe Events

        const userSaveRecipe = async id => {
                try {
                        setLoading("saveRecipeBtn");
                        const res = await axios.put(`/api/recipes/${id}/saverecipe`);
                        dispatch({
                                type: USER_SAVE_RECIPE,
                                payload: res.data
                        })
                } catch (err) {
                        console.log(err)
                }
        }

        const userDeleteSaveRecipe = async id => {
                try {
                        setLoading("saveRecipeBtn");
                        const res = await axios.put(`/api/recipes/${id}/deletesaverecipe`);
                         dispatch({
                                type: USER_UNSAVE_RECIPE,
                                payload: res.data
                        })

                } catch (err) {
                        console.log(err)
                }
        }

        // Set Loading
        const setLoading = element => dispatch( {
                type: SET_LOADING,
                payload: element
        } );

        const stopLoading = element => dispatch( {
                type: STOP_LOADING,
                payload: element
        } );
        
        

	return (
		<RecipeContext.Provider
			value={{
                recipeInfo: state.recipeInfo,
                recipeAuthor: state.recipeAuthor,
                userHasReviewed: state.userHasReviewed,
                pushToCreatedRecipe: state.pushToCreatedRecipe,
                loading: state.loading,
                createRecipe,
                loadRecipe,
                createReview,
                userSaveRecipe,
                redirectToRecipe,
                userDeleteSaveRecipe            
		}}
		>
			{props.children}
		</RecipeContext.Provider>
	);
};

export default RecipeState;