import React, { useReducer } from 'react';
import axios from 'axios';
import SearchContext from './searchContext';
import searchReducer from './searchReducer';
import {
	GET_ALL_RECIPES,
	GET_RECIPE_BY_TYPE,
	SET_QUERY_VALUE,
	GET_SEARCH_QUERY_RESULT
} from '../types';

const SearchState = (props) => {
	const initialState = {
		searchQueryValue: {
			name: '',
			ingredient: '',
			time: '',
			user: ''
		},
		redirect: {
			searchCont: false
		},
		searchResult: null
	};

	const [ state, dispatch ] = useReducer(searchReducer, initialState);

	const getAllRecipes = async () => {
		try {
			const res = await axios.get('/api/recipes/all');
			dispatch({
				type: GET_ALL_RECIPES,
				payload: res.data
			})
		} catch (err) {
			console.log(err)
		}
	}

	const getByRecipeType = async (type) => {
		try {
			const res = await axios.get(`/api/recipes/getbytype/${type}`);
			dispatch({
				type: GET_RECIPE_BY_TYPE,
				payload: res.data
			})
		} catch (err) {
			console.log(err)
		}
	}

	const setQueryValue = (change) => {
		dispatch({
			type: SET_QUERY_VALUE,
			payload: change
		})
	}

	const getSearchQuery = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
		}

		try {
			const res = await axios.post('/api/recipes/getsearchqueryresult', state.searchQueryValue, config);

             dispatch({
                type: GET_SEARCH_QUERY_RESULT,
                payload: res.data

            }); 

        } catch (err) {
            console.log(err)

        }
	}

	return (
		<SearchContext.Provider
			value={{
                searchQueryValue: state.searchQueryValue,
				redirect: state.redirect,
				searchResult: state.searchResult,
				getAllRecipes,
				getByRecipeType,
				getSearchQuery,
				setQueryValue
			}}
		>
			{props.children}
		</SearchContext.Provider>
	);
};

export default SearchState;
