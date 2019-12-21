import React, { useContext } from 'react';
import LanguageContext from '../../../context/language/languageContext';

const SearchForm = ({searchQueryValue, setQueryValue, getSearchQuery}) => {
    const languageContext = useContext(LanguageContext);
    const { languageDisplayed, language, switchLanguage } = languageContext;

    const onChange = e => setQueryValue({...searchQueryValue, [e.target.name]: e.target.value});

    const handleSubmitSearch = e => {
        e.preventDefault();
        getSearchQuery();
    }
    return (
        <div className="search-form-container">
            <h1>{language[languageDisplayed].searchForm.header}</h1>
            <form onSubmit={handleSubmitSearch}>
                <div className="search-input-cont">
                    <div className="search-param-cont">
                        <label>{language[languageDisplayed].searchForm.name}</label>
                        <input  value={searchQueryValue.name} 
                        onChange={onChange} name="name" type="search" />
                    </div>
                    <div className="search-param-cont">
                        <label>Ingredient:</label>
                        <input value={searchQueryValue.ingredient} onChange={onChange} name="ingredient" type="search" />
                    </div>
                    <div className="search-param-cont">
                        <label>{language[languageDisplayed].searchForm.time}</label>
                        <input value={searchQueryValue.time} onChange={onChange} name="time" type="number" min="1"/>
                    </div>
                    <div className="search-param-cont">
                        <label>{language[languageDisplayed].searchForm.createdBy}</label>
                        <input value={searchQueryValue.user} onChange={onChange} name="user" type="search" />
                    </div>
                </div>
                <button className="btn btn-search">{language[languageDisplayed].searchForm.searchBtn}</button>
            </form>
        </div>
    )
}

export default SearchForm
