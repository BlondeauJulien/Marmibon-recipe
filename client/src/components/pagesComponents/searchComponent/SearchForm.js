import React from 'react'

const SearchForm = ({searchQueryValue, setQueryValue, getSearchQuery}) => {
    const onChange = e => setQueryValue({...searchQueryValue, [e.target.name]: e.target.value});

    const handleClickSearch = e => {
        e.preventDefault();
        getSearchQuery();
    }
    return (
        <div className="search-form-container">
            <h1>Rechercher une recette</h1>
            <form>
                <div className="search-input-cont">
                    <div className="search-param-cont">
                        <label>Nom de recette:</label>
                        <input  value={searchQueryValue.name} 
                        onChange={onChange} name="name" type="search" />
                    </div>
                    <div className="search-param-cont">
                        <label>Ingredient:</label>
                        <input value={searchQueryValue.ingredient} onChange={onChange} name="ingredient" type="search" />
                    </div>
                    <div className="search-param-cont">
                        <label>Temps de preparation maximum (en minutes):</label>
                        <input value={searchQueryValue.time} onChange={onChange} name="time" type="number" min="1"/>
                    </div>
                    <div className="search-param-cont">
                        <label>Créée par:</label>
                        <input value={searchQueryValue.user} onChange={onChange} name="user" type="search" />
                    </div>
                </div>
                <button onClick={handleClickSearch} className="btn btn-search">Rechercher</button>
            </form>
        </div>
    )
}

export default SearchForm
