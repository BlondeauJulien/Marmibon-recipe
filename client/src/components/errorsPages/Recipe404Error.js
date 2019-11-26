import React, {Fragment} from 'react';
import Error404Img from './404recipenotfoundred.jpg';

const Recipe404Error = () => {
    return (
        <Fragment>
            <h1 className="error-response-title">Erreur 404:<br/>Nous n'avons pas trouvé la recette</h1>
            <img src={Error404Img} className="" alt="Erreur 404, la recette n'a pas été trouvé" 
            style={{ margin: '30px auto', display: 'block'}}/>
        </Fragment>
    )
}

export default Recipe404Error
