import {
    GET_ALL_RECIPES,
    GET_RECIPE_BY_TYPE

} from '../types';

export default (state, action) => {
    switch(action.type) {
        case GET_ALL_RECIPES:
        case GET_RECIPE_BY_TYPE:
            return {
                ...state,
                searchResult: action.payload
            };
        default:
            return state;
    }
}