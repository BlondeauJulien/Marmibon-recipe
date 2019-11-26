import React, { useContext, useEffect } from 'react';
import SearchForm from '../pagesComponents/searchComponent/SearchForm';
import RecipeAbstractItem from '../pagesComponents/RecipeAbstractItem';
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';
import SearchContext from '../../context/search/searchContext';
import spinner from '../layout/spinner.gif';



const Search = (props) => {
    const authContext = useContext(AuthContext);
    const recipeContext = useContext(RecipeContext);
    const searchContext =useContext(SearchContext);

    const { loadUser, user, isAuthenticated } = authContext;
    const { recipeInfo, redirect} = recipeContext;
    const { searchResult, getSearchQuery, searchQueryValue, setQueryValue, searchLoading, resetSearchQueryValue, resetSearchResult } = searchContext
    

    useEffect(() => {
        if(localStorage.getItem('token') !== null) {
            loadUser()
        }
		// eslint-disable-next-line
    }, []);

    useEffect(() => {
        resetSearchQueryValue();
            resetSearchResult();
    }, [props.history]);

    useEffect(() => {
        if(redirect.recipeCont) {
            props.history.push(`recipe/${recipeInfo._id}`)
        }
    }, [redirect])
    
    return (
        <div className="search-container">
            <SearchForm searchQueryValue={searchQueryValue} setQueryValue={setQueryValue} getSearchQuery={getSearchQuery}/>
            <div className="search-result-cont">
                {searchLoading && (<img src={spinner} style={{width: '125px', margin: 'auto', display: 'block'}} />)}

                {searchResult !== null && searchResult.length > 0 && searchResult.map(recipe => {
                    return <RecipeAbstractItem key={recipe._id} recipe={recipe}/>
                })}

                {searchResult !== null && searchResult.length === 0 && 
                    (<p className="recipes-not-found">Aucune recette trouvé</p>)
                }
            </div>
        </div>
    )
}

export default Search
