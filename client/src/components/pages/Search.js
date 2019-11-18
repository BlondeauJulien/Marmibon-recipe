import React, { useContext, useEffect } from 'react';
import SearchForm from '../pagesComponents/searchComponent/SearchForm';
import RecipeAbstractItem from '../pagesComponents/RecipeAbstractItem';
import AuthContext from '../../context/auth/authContext';


const Search = () => {
    const authContext = useContext(AuthContext);

	const { loadUser } = authContext;

    useEffect(() => {
        if(localStorage.getItem('token') !== null) {
            loadUser()
        }
		// eslint-disable-next-line
    }, []);
    
    return (
        <div className="search-container">
            <SearchForm />
            <div className="search-result-cont">
{/*             <RecipeAbstractItem />
            <RecipeAbstractItem />
            <RecipeAbstractItem />
            <RecipeAbstractItem />
            <RecipeAbstractItem />
            <RecipeAbstractItem /> */}
            </div>
        </div>
    )
}

export default Search
