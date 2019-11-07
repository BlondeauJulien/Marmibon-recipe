import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    ADD_STEP,
    DELETE_STEP
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case DELETE_INGREDIENT: 
            return {
                ...state,
                ingredients: state.ingredients.filter( ingredient => ingredient.id !== action.payload)
            };
        case ADD_STEP:
            return {
                ...state,
                steps: [...state.steps, action.payload]
            };
        case DELETE_STEP:
            return {
                ...state,
                steps: state.steps.filter( step => step.id !== action.payload)
            }    
        default:
            return state;
    }
}