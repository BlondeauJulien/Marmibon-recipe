import {
    GET_ALL_RECIPES,
    GET_RECIPE_BY_TYPE,
    SET_QUERY_VALUE,
    SET_NAV_QUERY_VALUE,
    GET_SEARCH_QUERY_RESULT,
    SET_SEARCH_LOADING,
    REDIRECT_SEARCH_CONT,
    RESET_REDIRECT_SEARCH_CONT,
    RESET_SEARCH_QUERY_VALUE,
    RESET_NAV_SEARCH_INPUT,
    RESET_SEARCH_RESULT

} from '../types';

export default (state, action) => {
    switch(action.type) {
        case GET_ALL_RECIPES:
        case GET_RECIPE_BY_TYPE:
        case GET_SEARCH_QUERY_RESULT:
            return {
                ...state,
                searchResult: action.payload,
                searchLoading: false
            };
        case SET_QUERY_VALUE:
            return {
                ...state,
                searchQueryValue: action.payload
            };
        case SET_NAV_QUERY_VALUE: 
            return {
                ...state,
                navSearchInput: action.payload.navSearchInput
            }
        case SET_SEARCH_LOADING:
            return {
                ...state,
                searchLoading: true
            };
        case REDIRECT_SEARCH_CONT: 
            return {
                ...state,
                redirectSearchCont: true
            };
        case RESET_REDIRECT_SEARCH_CONT:
            return{
                ...state,
                redirectSearchCont: false
            };
        case RESET_SEARCH_QUERY_VALUE: 
            return {
                ...state,
                searchQueryValue: {
                    name: '',
                    ingredient: '',
                    time: '',
                    user: ''
                }
            };
        case RESET_NAV_SEARCH_INPUT:
            return {
                ...state,
                navSearchInput: ''
            };
        case RESET_SEARCH_RESULT:
            return {
                ...state,
                searchResult: null
            }
        default:
            return state;
    }
}