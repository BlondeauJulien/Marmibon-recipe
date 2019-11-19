import React, { useReducer } from 'react';
import axios from 'axios';
import SearchContext from './searchContext';
import searchReducer from './searchReducer';
import {
	GET_ALL_RECIPES,
	GET_RECIPE_BY_TYPE
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

	return (
		<SearchContext.Provider
			value={{
                searchQueryValue: state.searchQueryValue,
				redirect: state.redirect,
				searchResult: state.searchResult,
				getAllRecipes,
				getByRecipeType
			}}
		>
			{props.children}
		</SearchContext.Provider>
	);
};

export default SearchState;
