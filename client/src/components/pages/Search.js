import React from 'react';
import SearchForm from '../pagesComponents/searchComponent/SearchForm';
import RecipeAbstractItem from '../pagesComponents/RecipeAbstractItem'


const Search = () => {
    return (
        <div className="search-container">
            <SearchForm />
            <div className="search-result-cont">
            <RecipeAbstractItem />
            <RecipeAbstractItem />
            <RecipeAbstractItem />
            <RecipeAbstractItem />
            <RecipeAbstractItem />
            <RecipeAbstractItem />
            </div>
        </div>
    )
}

export default Search
