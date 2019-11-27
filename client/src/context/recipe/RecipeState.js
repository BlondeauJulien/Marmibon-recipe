import React, { useReducer } from 'react';
import axios from "axios";
import RecipeContext from './recipeContext';
import recipeReducer from './recipeReducer';
import {
        CREATE_RECIPE_SUCCESS,
        CREATE_RECIPE_FAIL,
        LOAD_RECIPE,
        LOAD_RECIPE_FAIL,
        GET_RANDOM_RECIPE,
        SET_RECIPE_TO_UPDATE,
        ADD_RECIPE_REVIEW,
        REDIRECT_TO_RECIPE,
        SET_LOADING,
        STOP_LOADING,
        USER_SAVE_RECIPE,
        USER_UNSAVE_RECIPE,
        RESET_REDIRECT
} from '../types';

const RecipeState = (props) => {
	const initialState = {
                recipeInfo: null,
                recipeAuthor: null,
                recipeToUpdate: null,
                userHasReviewed: false,
                pushToCreatedRecipe: false,
                redirect: {
                        recipeCont: false
                },
                loading: {
                        recipePage: false,
                        saveRecipeBtn: false,
                        updateRecipe: false,
                        deleteRecipeInUser: false

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
                        setLoading("recipePage");
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
                        stopLoading("recipePage");
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

        // Get random recipe

        const getRandomRecipe = async () => {
                try {
                        setLoading("recipePage");
                        const recipeRes = await axios.get(`/api/recipes/getrandom`);
                        const recipeAuthorRes = await axios.get(`/api/users/${recipeRes.data.user}`)
                        dispatch({
                                type: GET_RANDOM_RECIPE,
                                payload: {
                                        recipeRes: recipeRes.data,
                                        recipeAuthorRes: recipeAuthorRes.data
                                }
                        });
                        resetRedirect()
                } catch (err) {
                        console.log(err)
                }

        }

        // Update recipe

        const setRecipeToUpdate = (recipe) => {
                setLoading('updateRecipe');
                dispatch({
                        type: SET_RECIPE_TO_UPDATE,
                        payload: recipe
                })
                stopLoading('updateRecipe');
        }

        // Delete a recipe

        const deleteRecipe = async (recipeId) => {
                try {
                        setLoading('deleteRecipeInUser');
                        const res = await axios.delete(`/api/recipes/${recipeId}`);
                        stopLoading('deleteRecipeInUser')
                } catch (err) {
                        console.log(err)
                }
        }

        // Loading
        const setLoading = element => dispatch( {
                type: SET_LOADING,
                payload: element
        } );

        const stopLoading = element => dispatch({
                type: STOP_LOADING,
                payload: element
        });
        
        // Reset the redirection to recipe page

        const resetRedirect = () => dispatch({type: RESET_REDIRECT})

	return (
		<RecipeContext.Provider
			value={{
                recipeInfo: state.recipeInfo,
                recipeAuthor: state.recipeAuthor,
                recipeToUpdate: state.recipeToUpdate,
                userHasReviewed: state.userHasReviewed,
                pushToCreatedRecipe: state.pushToCreatedRecipe,
                redirect: state.redirect,
                loading: state.loading,
                createRecipe,
                loadRecipe,
                setRecipeToUpdate,
                deleteRecipe,
                createReview,
                userSaveRecipe,
                redirectToRecipe,
                userDeleteSaveRecipe,
                getRandomRecipe,
                resetRedirect        
		}}
		>
			{props.children}
		</RecipeContext.Provider>
	);
};

export default RecipeState;