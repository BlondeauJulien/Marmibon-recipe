import React from 'react'

const RecipeItem = ({ img, name }) => {


    return (
        <div className="recipeItem">
            <div className={`recipe-item-img-bg ${img}`} ></div>
            <div className="recipe-item-name-container">
                <h3>{name}</h3>
            </div>
        </div>
    )
}

export default RecipeItem
