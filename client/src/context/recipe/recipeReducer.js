import {
    CREATE_RECIPE_SUCCESS,
    CREATE_RECIPE_FAIL,
    LOAD_RECIPE,
    GET_RANDOM_RECIPE,
    ADD_RECIPE_REVIEW,
    REDIRECT_TO_RECIPE,
    SET_LOADING,
    STOP_LOADING,
    USER_SAVE_RECIPE,
    USER_UNSAVE_RECIPE,
    RESET_REDIRECT
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case CREATE_RECIPE_SUCCESS:
        case LOAD_RECIPE:
            return {
                ...state,
                recipeInfo: action.payload.recipeRes,
                recipeAuthor: action.payload.recipeAuthorRes
            };
            case GET_RANDOM_RECIPE:
                return {
                    ...state,
                    recipeInfo: action.payload.recipeRes,
                    recipeAuthor: action.payload.recipeAuthorRes,
                    redirect: {recipeCont: true}
                };
        case ADD_RECIPE_REVIEW:
            return {
                ...state,
                userHasReviewed: action.payload
            };
        case REDIRECT_TO_RECIPE:
            return {
                ...state,
                pushToCreatedRecipe: action.payload
            };
        case USER_SAVE_RECIPE:
        case USER_UNSAVE_RECIPE:
            return {
                ...state,
                recipeInfo : action.payload.recipe,
                loading: { saveRecipeBtn: false},
            };
        case SET_LOADING: 
            return {
                ...state,
                loading: { [action.payload]: true}
            };
        case STOP_LOADING:
            return {
                ...state,
                loading: { [action.payload]: false}
            };
        case RESET_REDIRECT: {
            return {
                ...state,
                redirect: {recipeCont: false}
            }
        }
        default:
            return state;
    }
}