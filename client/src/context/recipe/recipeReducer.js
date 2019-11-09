import {
    CREATE_RECIPE_SUCCESS,
    CREATE_RECIPE_FAIL
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case CREATE_RECIPE_SUCCESS:
            return {
                ...state,
                recipe: action.payload
            }
        default:
            return state;
    }
}