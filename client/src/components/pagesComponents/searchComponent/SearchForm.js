import React from 'react'

const SearchForm = () => {
    return (
        <div className="search-form-container">
            <h1>Rechercher une recette</h1>
            <form>
                <div className="search-input-cont">
                    <div className="search-param-cont">
                        <label>Nom de recette:</label>
                        <input type="search" />
                    </div>
                    <div className="search-param-cont">
                        <label>Ingredient:</label>
                        <input type="search" />
                    </div>
                    <div className="search-param-cont">
                        <label>Temps de preparation maximum (en minutes):</label>
                        <input type="number" min="1"/>
                    </div>
                    <div className="search-param-cont">
                        <label>Créée par:</label>
                        <input type="search" />
                    </div>
                </div>
                <button className="btn btn-search">Rechercher</button>
            </form>
        </div>
    )
}

export default SearchForm
