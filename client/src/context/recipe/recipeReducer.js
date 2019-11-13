import {
    CREATE_RECIPE_SUCCESS,
    CREATE_RECIPE_FAIL,
    LOAD_RECIPE,
    ADD_RECIPE_REVIEW
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
        case ADD_RECIPE_REVIEW:
            console.log(state)
            return {
                ...state,
                userHasReviewed: action.payload
            }
        default:
            return state;
    }
}