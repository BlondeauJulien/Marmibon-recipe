import React, { Fragment, useContext, useEffect} from 'react';
import HomeSearch from '../pagesComponents/homeComponents/HomeSearch';
import RecipesContainer from '../pagesComponents/homeComponents/RecipesContainer';
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';

const Home = (props) => {

    const authContext = useContext(AuthContext);
    const recipeContext = useContext(RecipeContext);

    const { loadUser } = authContext;
    const { recipeInfo, redirect} = recipeContext;

	useEffect(() => {
        if(localStorage.getItem('token') !== null) {
            loadUser()
        }
		// eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(redirect.recipeCont) {
            props.history.push(`recipe/${recipeInfo._id}`)
        }
    }, [redirect]);
    
    return (
        <Fragment>
            <HomeSearch />
            <RecipesContainer />
        </Fragment>
    )
}

export default Home
