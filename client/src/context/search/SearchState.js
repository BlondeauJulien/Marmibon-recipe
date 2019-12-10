import React, { useReducer } from 'react';
import axios from 'axios';
import SearchContext from './searchContext';
import searchReducer from './searchReducer';
import {
	GET_ALL_RECIPES,
	GET_RECIPE_BY_TYPE,
	SET_QUERY_VALUE,
	GET_SEARCH_QUERY_RESULT,
	SET_SEARCH_LOADING,
	REDIRECT_SEARCH_CONT,
	RESET_REDIRECT_SEARCH_CONT,
	SET_NAV_QUERY_VALUE,
	RESET_SEARCH_QUERY_VALUE,
	RESET_NAV_SEARCH_INPUT,
	RESET_SEARCH_RESULT,
	SEARCH_FAIL
} from '../types';

const SearchState = (props) => {
	const initialState = {
		searchQueryValue: {
			name: '',
			ingredient: '',
			time: '',
			user: ''
		},
		navSearchInput: '',
		RedirectSearchCont: false,
		searchResult: null,
		searchLoading: false,
		searchErrors: null
	};

	const [ state, dispatch ] = useReducer(searchReducer, initialState);

	const getAllRecipes = async () => {
		try {
			resetSearchResult();
			setLoading();
			const res = await axios.get('/api/recipes/all');
			dispatch({
				type: GET_ALL_RECIPES,
				payload: res.data
			})
		} catch (err) {
			dispatch({
				type: SEARCH_FAIL,
				payload: err.response.data.msg
		}) 
		}
	}

	const getByRecipeType = async (type) => {
		try {
			resetSearchResult();
			setLoading();
			const res = await axios.get(`/api/recipes/getbytype/${type}`);
			dispatch({
				type: GET_RECIPE_BY_TYPE,
				payload: res.data
			})
		} catch (err) {
			dispatch({
				type: SEARCH_FAIL,
				payload: err.response.data.msg
		}) 
		}
	}

	const setQueryValue = (change) => {
		dispatch({
			type: SET_QUERY_VALUE,
			payload: change
		})
	}

	const setNavQueryValue = (change) => {
		dispatch({
			type: SET_NAV_QUERY_VALUE,
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
			resetSearchResult();
			setLoading();
			let res;
			if(
				state.searchQueryValue.name === '' 
				&& state.searchQueryValue.ingredient === ''
				&& state.searchQueryValue.time === ''
				&& state.searchQueryValue.user === ''
				) {
					res = await axios.get('/api/recipes/all');
				} else {
					res = await axios.post('/api/recipes/getsearchqueryresult', state.searchQueryValue, config);
				}
			

             dispatch({
                type: GET_SEARCH_QUERY_RESULT,
                payload: res.data

			});
			resetRedirectToSearchCont(); 

        } catch (err) {
            dispatch({
				type: SEARCH_FAIL,
				payload: err.response.data.msg
		}) 

        }
	}

	const getSearchQueryFromNav = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
		}

		try {
			resetSearchResult();
			setLoading();
			const res = await axios.post('/api/recipes/getsearchqueryresult', {
				name: state.navSearchInput,
				ingredient: '',
				time: '',
				user: ''
			}, config);

             dispatch({
                type: GET_SEARCH_QUERY_RESULT,
                payload: res.data

			});
			resetRedirectToSearchCont();
/* 			resetNavSearchInput(); */

        } catch (err) {
            dispatch({
				type: SEARCH_FAIL,
				payload: err.response.data.msg
		}) 

        }
	}

	const handleSearchFromNavBar = () => {

		setQueryValue({
			name: state.navSearchInput,
			ingredient: '',
			time: '',
			user: ''
		});

	}

	const resetSearchQueryValue = () => {
		dispatch({
			type: RESET_SEARCH_QUERY_VALUE
		})
	}

	const resetNavSearchInput = () => {
		dispatch({
			type: RESET_NAV_SEARCH_INPUT
		})
	}

	const resetSearchResult = () => dispatch({type: RESET_SEARCH_RESULT})

	const redirectToSearchCont = () => dispatch({type: REDIRECT_SEARCH_CONT})

	const resetRedirectToSearchCont = () => dispatch({type: RESET_REDIRECT_SEARCH_CONT})

	const setLoading = () => {
		dispatch({type: SET_SEARCH_LOADING})
	}

	return (
		<SearchContext.Provider
			value={{
				searchQueryValue: state.searchQueryValue,
				navSearchInput: state.navSearchInput,
				redirectSearchCont: state.redirectSearchCont,
				searchResult: state.searchResult,
				searchLoading: state.searchLoading,
				searchErrors: state.searchErrors,
				getAllRecipes,
				getByRecipeType,
				getSearchQuery,
				getSearchQueryFromNav,
				handleSearchFromNavBar,
				setQueryValue,
				setNavQueryValue,
				redirectToSearchCont,
				resetRedirectToSearchCont,
				resetSearchQueryValue,
				resetNavSearchInput,
				resetSearchResult
			}}
		>
			{props.children}
		</SearchContext.Provider>
	);
};

export default SearchState;
