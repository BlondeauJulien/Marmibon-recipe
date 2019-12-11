import {
    CREATE_RECIPE_SUCCESS,
    CREATE_RECIPE_FAIL,
    LOAD_RECIPE,
    GET_RANDOM_RECIPE,
    ADD_RECIPE_REVIEW,
    RESET_USER_HAS_REVIEWED,
    REDIRECT_TO_RECIPE,
    REDIRECT_TO_EDIT,
    SET_LOADING,
    STOP_LOADING,
    USER_SAVE_RECIPE,
    USER_UNSAVE_RECIPE,
    RESET_REDIRECT,
    SET_RECIPE_TO_UPDATE,
    RESET_SET_RECIPE_TO_UPDATE,
    EDIT_RECIPE_SUCCESS,
    CLEAR_RECIPE_ERRORS,
    RECIPE_ERROR
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case CREATE_RECIPE_SUCCESS:
        case EDIT_RECIPE_SUCCESS:
                return {
                    ...state,
                    recipeInfo: action.payload.recipeRes,
                    recipeAuthor: action.payload.recipeAuthorRes,
                    pushToCreatedRecipe: true,
                    loading: {
                        ...state.loading,
                        recipePage: false,
                        sendingRecipe: false
                    },
                };
        case LOAD_RECIPE:
            return {
                ...state,
                recipeInfo: action.payload.recipeRes,
                recipeAuthor: action.payload.recipeAuthorRes,
                pushToCreatedRecipe: false,
                pushToEditRecipe: false,
                loading: {
                    ...state.loading,
                    recipePage: false,
                    sendingRecipe: false
                },
            };
        case CREATE_RECIPE_FAIL:
            return {
                ...state,
                recipeInfo: null,
                recipeAuthor: null,
                loading: {
                    ...state.loading,
                    recipePage: false,
                    sendingRecipe: false
                },
                recipeErrors: action.payload
            }
        case GET_RANDOM_RECIPE:
            return {
                ...state,
                recipeInfo: action.payload.recipeRes,
                recipeAuthor: action.payload.recipeAuthorRes,
                loading: { ...state.loading, recipePage: false},
                redirect: {...state.recipeCont, recipeCont: true},
            };
        case SET_RECIPE_TO_UPDATE:
            return {
                ...state,
                recipeToUpdate: action.payload,
                pushToEditRecipe: true
            };
        case RESET_SET_RECIPE_TO_UPDATE:
            return {
                ...state,
                recipeToUpdate: null
            };
        case ADD_RECIPE_REVIEW:
            return {
                ...state,
                userHasReviewed: action.payload
            };
        case RESET_USER_HAS_REVIEWED:
            return {
                ...state,
                userHasReviewed: false
            };
        case REDIRECT_TO_RECIPE:
            return {
                ...state,
                pushToCreatedRecipe: action.payload
            };
        case REDIRECT_TO_EDIT:
            return {
                ...state,
                pushToEditRecipe: action.payload
            };
        case USER_SAVE_RECIPE:
        case USER_UNSAVE_RECIPE:
            return {
                ...state,
                recipeInfo : action.payload.recipe,
                loading: { ...state.loading, saveRecipeBtn: false},
            };
        case SET_LOADING: 
            return {
                ...state,
                loading: { ...state.loading, [action.payload]: true}
            };
        case STOP_LOADING:
            return {
                ...state,
                loading: { ...state.loading, [action.payload]: false}
            };
        case RESET_REDIRECT: 
            return {
                ...state,
                redirect: {...state.recipeCont, recipeCont: false},
            
        };
        case CLEAR_RECIPE_ERRORS: 
            return {
                ...state,
                recipeErrors: null
            }
        default:
            return state;
    }
}