import React, { useState, useContext, useEffect } from 'react';
import SearchForm from '../pagesComponents/searchComponent/SearchForm';
import RecipeAbstractItem from '../pagesComponents/RecipeAbstractItem';
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';
import SearchContext from '../../context/search/searchContext';
import spinner from '../layout/spinner.gif';
import Pagination from '../pagesComponents/Pagination';



const Search = (props) => {
    const authContext = useContext(AuthContext);
    const recipeContext = useContext(RecipeContext);
    const searchContext =useContext(SearchContext);

    const { loadUser } = authContext;
    const { recipeInfo, redirect} = recipeContext;
    const { searchResult, getSearchQuery, searchQueryValue, setQueryValue, searchLoading, resetSearchQueryValue, resetSearchResult } = searchContext

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const [currentPosts, setCurrentPost] = useState(null);

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
    }, [redirect]);

    useEffect(() => {
        if(searchResult) {
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            setCurrentPost(searchResult.slice(indexOfFirstPost, indexOfLastPost));
        }
        console.log(searchResult)
    }, [searchResult, currentPage])

    useEffect(() => {
        setCurrentPage(1);
    }, [searchLoading])
  
    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    return (
        <div className="search-container">
            <SearchForm searchQueryValue={searchQueryValue} setQueryValue={setQueryValue} getSearchQuery={getSearchQuery}/>
            <div className="search-result-cont">
                {searchLoading && (<img src={spinner} style={{width: '125px', margin: 'auto', display: 'block'}} />)}

                {searchResult && searchResult.length > 0 && (<Pagination
                    postsPerPage={postsPerPage}
                    currentPage={currentPage}
                    totalPosts={searchResult.length}
                    paginate={paginate}
                />)}

                {currentPosts !== null && currentPosts.length > 0 && currentPosts.map(recipe => {
                    return <RecipeAbstractItem key={recipe._id} recipe={recipe}/>
                })}

                {currentPosts !== null && currentPosts.length === 0 && 
                    (<p className="recipes-not-found">Aucune recette trouvé</p>)
                }
            </div>
        </div>
    )
}

export default Search
