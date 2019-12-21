import {
    SWITCH_LANGUAGE
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case SWITCH_LANGUAGE:
            return {
                ...state,
                languageDisplayed: action.payload
            };

        default:
            return state;
    }
}