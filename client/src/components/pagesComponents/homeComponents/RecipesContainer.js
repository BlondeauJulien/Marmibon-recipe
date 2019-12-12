import React from 'react';
import RecipeItem from './RecipeItem';

const RecipesContainer = () => {
    return (
        <div className="recipes-container">
            <RecipeItem img={'img1'} name={'Tom Kha Kai'}/>
            <RecipeItem img={'img2'} name={'Pizza'}/>
            <RecipeItem img={'img3'} name={'Frites'}/>
            <RecipeItem img={'img4'} name={'Salade niçoise'}/>
            <RecipeItem img={'img5'} name={'Crêpes'}/>
            <RecipeItem img={'img6'} name={'Ramen'}/>
            <RecipeItem img={'img7'} name={'Falafel'}/>
            <RecipeItem img={'img8'} name={'Ratatouille'}/>
            <RecipeItem img={'img9'} name={'Pad Thai'}/>
        </div>
    )
}

export default RecipesContainer
