import React from 'react';
import RecipeItem from './RecipeItem';

const RecipesContainer = (props) => {
    return (
        <div className="recipes-container">
            <RecipeItem {...props} img={'img1'} name={'Tom Kha Kai'} recipeDBID={'5df678ca3f9acd207c356df4'}/>
            <RecipeItem {...props} img={'img8'} name={'Ratatouille'} recipeDBID={'5df69cfa87980b373c0c1045'}/>
            <RecipeItem {...props} img={'img2'} name={'Pizza'} recipeDBID={'5df6741e990ea02bcc9fa8a0'}/>
            <RecipeItem {...props} img={'img4'} name={'Salade niçoise'} recipeDBID={'5df69cbd87980b373c0c1041'}/>
            <RecipeItem {...props} img={'img5'} name={'Crêpes'} recipeDBID={'5df69cd087980b373c0c1042'}/>
            <RecipeItem {...props} img={'img6'} name={'Ramen'} recipeDBID={'5df69cdc87980b373c0c1043'}/>
            <RecipeItem {...props} img={'img7'} name={'Falafel'} recipeDBID={'5df69cec87980b373c0c1044'}/>
            <RecipeItem {...props} img={'img9'} name={'Pad Thai'} recipeDBID={'5df69d0b87980b373c0c1046'}/>
            <RecipeItem {...props} img={'img3'} name={'Frites'} recipeDBID={'5df69cad87980b373c0c1040'}/>
        </div>
    )
}

export default RecipesContainer
