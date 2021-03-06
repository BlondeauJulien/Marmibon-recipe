import React, { useState, useContext, useEffect } from 'react';
import SearchForm from '../pagesComponents/searchComponent/SearchForm';
import RecipeAbstractItem from '../pagesComponents/RecipeAbstractItem';
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';
import SearchContext from '../../context/search/searchContext';
import LanguageContext from '../../context/language/languageContext';
import spinner from '../layout/spinner.gif';
import Pagination from '../pagesComponents/Pagination';



const Search = (props) => {
    const authContext = useContext(AuthContext);
    const recipeContext = useContext(RecipeContext);
    const searchContext =useContext(SearchContext);
    const languageContext = useContext(LanguageContext);

    const { loadUser } = authContext;
    const { recipeInfo, redirect} = recipeContext;
    const { searchResult, getSearchQuery, searchQueryValue, setQueryValue, searchLoading, resetSearchQueryValue, resetSearchResult, searchErrors } = searchContext
    const { languageDisplayed, switchLanguage } = languageContext;

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const [currentPosts, setCurrentPost] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if(localStorage.getItem('token') !== null) {
            loadUser()
        }
        document.querySelector('.header-nav').style.display = "block"

        return () => {
            if (document.querySelector('.header-nav').style.removeProperty) {
                document.querySelector('.header-nav').style.removeProperty('display');
            } else {
                document.querySelector('.header-nav').style.removeAttribute('display');
            }
        }
		// eslint-disable-next-line
    }, []);

    useEffect(() => {
        resetSearchQueryValue();
        resetSearchResult();
        // eslint-disable-next-line
    }, [props.history]);

    useEffect(() => {
        if(redirect.recipeCont) {
            props.history.push(`recipe/${recipeInfo._id}`)
        }
        // eslint-disable-next-line
    }, [redirect]);

    useEffect(() => {
        let mainCont = document.querySelector('#search-nav');
        mainCont.scrollIntoView()
        if(searchResult) {
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            setCurrentPost(searchResult.slice(indexOfFirstPost, indexOfLastPost));
        }
        // eslint-disable-next-line
    }, [searchResult, currentPage])

    useEffect(() => {
        setCurrentPage(1);
    }, [searchLoading])
  
    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
    };
    
    return (
        <div className="search-container">
            <SearchForm searchQueryValue={searchQueryValue} setQueryValue={setQueryValue} getSearchQuery={getSearchQuery}/>

            <div className="search-result-cont">
                {searchLoading && (<img src={spinner} style={{width: '125px', margin: 'auto', display: 'block'}} alt="spinner loading"/>)}

                {searchErrors && searchErrors.map( (e,i) => (<p className="error-msg err-recipe-form" key={'error-' + i}>{e}</p>))}



                {searchResult && currentPosts !== null && currentPosts.length > 0 && currentPosts.map(recipe => {
                    return <RecipeAbstractItem key={recipe._id} recipe={recipe}/>
                })}

                {searchResult && currentPosts !== null && currentPosts.length === 0 && 
                    (<p className="recipes-not-found">{languageDisplayed === "fr" ? "Aucune recette trouvé" : "No recipe found"}</p>)
                }
            </div>

            {searchResult && searchResult.length > postsPerPage && (<Pagination
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                totalPosts={searchResult.length}
                paginate={paginate}
            />)}
        </div>
    )
}

export default Search
