import React, { useContext, useEffect } from 'react';
import SearchForm from '../pagesComponents/searchComponent/SearchForm';
import RecipeAbstractItem from '../pagesComponents/RecipeAbstractItem';
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';
import SearchContext from '../../context/search/searchContext';



const Search = (props) => {
    const authContext = useContext(AuthContext);
    const recipeContext = useContext(RecipeContext);
    const searchContext =useContext(SearchContext);

    const { loadUser } = authContext;
    const { recipeInfo, redirect} = recipeContext;
    const { searchResult, getSearchQuery, searchQueryValue, setQueryValue } = searchContext
    

    useEffect(() => {
        if(localStorage.getItem('token') !== null) {
            loadUser()
        }
		// eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(redirect.recipeCont) {
            props.history.push(`recipe/${recipeInfo._id}`)
        }
    }, [redirect])
    
    return (
        <div className="search-container">
            <SearchForm searchQueryValue={searchQueryValue} setQueryValue={setQueryValue} getSearchQuery={getSearchQuery}/>
            <div className="search-result-cont">
                {searchResult !== null && searchResult.map(recipe => {
                    return <RecipeAbstractItem key={recipe._id} recipe={recipe} />
                })}
            </div>
        </div>
    )
}

export default Search
