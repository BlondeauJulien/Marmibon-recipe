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
        RESET_SET_RECIPE_TO_UPDATE,
        EDIT_RECIPE_SUCCESS,
        ADD_RECIPE_REVIEW,
        RESET_USER_HAS_REVIEWED,
        REDIRECT_TO_RECIPE,
        REDIRECT_TO_EDIT,
        SET_LOADING,
        STOP_LOADING,
        USER_SAVE_RECIPE,
        USER_UNSAVE_RECIPE,
        RESET_REDIRECT,
        CLEAR_RECIPE_ERRORS,
        RECIPE_ERROR
} from '../types';

const RecipeState = (props) => {
	const initialState = {
                recipeInfo: null,
                recipeAuthor: null,
                recipeToUpdate: null,
                userHasReviewed: false,
                pushToCreatedRecipe: false,
                pushToEditRecipe: false,
                redirect: {
                        recipeCont: false
                },
                loading: {
                        recipePage: false,
                        saveRecipeBtn: false,
                        updateRecipe: false,
                        review: false,
                        sendingRecipe: false,
                        deleteRecipeInUser: false
                },
                recipeErrors: null
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
                        setLoading('sendingRecipe')
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
                        setLoading("review");
                        const res = await axios.put(`/api/recipes/${id}/addreview`, formData, config);
 			dispatch({
                                type: ADD_RECIPE_REVIEW,
                                payload: res.data
			}); 
                        stopLoading("review");
		} catch (err) {
                        stopLoading("review");
		}
        }

        const resetUserHasReviewed = () =>{
                dispatch({
                        type: RESET_USER_HAS_REVIEWED
                }); 
        }

        // Redirect to recipe after creation

        const redirectToRecipe = bool => {
                dispatch({
                        type: REDIRECT_TO_RECIPE,
                        payload: bool
                })
        }

        // Redirect to Edit component

        const redirectToEdit = bool => {
                dispatch({
                        type: REDIRECT_TO_EDIT,
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
                        stopLoading("saveRecipeBtn")
                } catch (err) {
                        console.log(err)
                        stopLoading("saveRecipeBtn")
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
                        stopLoading("saveRecipeBtn")
                } catch (err) {
                        console.log(err)
                        stopLoading("saveRecipeBtn")
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
                        stopLoading("recipePage");
                } catch (err) {
                        console.log(err)
                        stopLoading("recipePage");
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

        const resetRecipeToUpdate = () => dispatch({type: RESET_SET_RECIPE_TO_UPDATE})

        const updateRecipe = async (id, formData) => {
                const config = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                }

                try {
                        setLoading('sendingRecipe')
                        const recipeRes = await axios.put(`/api/recipes/edit/${id}`, formData, config);
                        const recipeAuthorRes = await axios.get(`/api/users/${recipeRes.data.user}`)
            
                        dispatch({
                            type: EDIT_RECIPE_SUCCESS,
                            payload: {
                                recipeRes: recipeRes.data,
                                recipeAuthorRes: recipeAuthorRes.data
                            }
            
                        });   
                        stopLoading('sendingRecipe')   
            
                } catch (err) {
                        console.log(err)
                        dispatch({
                                type: CREATE_RECIPE_FAIL,
                                payload: err.response.data.msg
                        })
                        stopLoading('sendingRecipe')   
                }
        }

        // Delete a recipe

        const deleteRecipe = async (recipeId) => {
                try {
                        setLoading('deleteRecipeInUser');
                        const res = await axios.delete(`/api/recipes/${recipeId}`);
                        stopLoading('deleteRecipeInUser')
                } catch (err) {
                        console.log(err)
                        stopLoading('deleteRecipeInUser')
                }
        }

        /* ERRORS */

        const setRecipeError = (msg) => {
                dispatch({
                    type: RECIPE_ERROR,
                    payload: msg
                })
            }
        
        const clearRecipeErrors = () => dispatch({type: CLEAR_RECIPE_ERRORS});
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
                pushToEditRecipe: state.pushToEditRecipe,
                redirect: state.redirect,
                loading: state.loading,
                recipeErrors: state.recipeErrors,
                createRecipe,
                loadRecipe,
                setRecipeToUpdate,
                resetRecipeToUpdate,
                updateRecipe,
                deleteRecipe,
                createReview,
                resetUserHasReviewed,
                userSaveRecipe,
                redirectToRecipe,
                redirectToEdit,
                userDeleteSaveRecipe,
                getRandomRecipe,
                resetRedirect,
                clearRecipeErrors,
                setRecipeError    
		}}
		>
			{props.children}
		</RecipeContext.Provider>
	);
};

export default RecipeState;