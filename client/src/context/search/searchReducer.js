import {
    GET_ALL_RECIPES,
    GET_RECIPE_BY_TYPE,
    SET_QUERY_VALUE,
    GET_SEARCH_QUERY_RESULT

} from '../types';

export default (state, action) => {
    switch(action.type) {
        case GET_ALL_RECIPES:
        case GET_RECIPE_BY_TYPE:
        case GET_SEARCH_QUERY_RESULT:
            return {
                ...state,
                searchResult: action.payload
            };
        case SET_QUERY_VALUE:
            return {
                ...state,
                searchQueryValue: action.payload
            }
        default:
            return state;
    }
}