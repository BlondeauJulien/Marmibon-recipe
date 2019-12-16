import React from 'react'

const RecipeItem = (props) => {
    
    const handleClick = () => {
        props.history.push(`/recipe/${props.recipeDBID}`)
    }
    
    return (
        <div className="recipeItem" onClick={handleClick}>
            <div className={`recipe-item-img-bg ${props.img}`} ></div>
            <div className="recipe-item-name-container">
                <h3>{props.name}</h3>
            </div>
        </div>
    )
}

export default RecipeItem
