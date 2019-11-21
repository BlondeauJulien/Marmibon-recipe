import React, { Fragment, useContext, useEffect} from 'react';
import HomeSearch from '../pagesComponents/homeComponents/HomeSearch';
import RecipesContainer from '../pagesComponents/homeComponents/RecipesContainer';
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';
import SearchContext from '../../context/search/searchContext';

const Home = (props) => {
    const authContext = useContext(AuthContext);
    const recipeContext = useContext(RecipeContext);
    const searchContext = useContext(SearchContext);

    const { loadUser } = authContext;
    const { recipeInfo, redirect} = recipeContext;
    const { 
        redirectSearchCont,
        resetSearchQueryValue
	} = searchContext;

	useEffect(() => {
        if(localStorage.getItem('token') !== null) {
            loadUser()
        }
		// eslint-disable-next-line
    }, [])

    useEffect(() => {
        resetSearchQueryValue();
    }, [props.history]);

    useEffect(() => {
        if(redirect.recipeCont) {
            props.history.push(`recipe/${recipeInfo._id}`)
        }
    }, [redirect]);

    useEffect(() => {
		if(redirectSearchCont) {
			props.history.push(`search`)
        }
	}, [redirectSearchCont])
    
    return (
        <Fragment>
            <HomeSearch />
            <RecipesContainer />
        </Fragment>
    )
}

export default Home
