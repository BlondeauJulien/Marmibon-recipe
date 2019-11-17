import React, { Fragment, useContext, useEffect} from 'react';
import HomeSearch from '../pagesComponents/homeComponents/HomeSearch';
import RecipesContainer from '../pagesComponents/homeComponents/RecipesContainer';
import AuthContext from '../../context/auth/authContext';

const Home = () => {

    const authContext = useContext(AuthContext);

	const { loadUser } = authContext;

	useEffect(() => {
        if(localStorage.getItem('token') !== null) {
            loadUser()
        }
		// eslint-disable-next-line
    }, [])
    
    return (
        <Fragment>
            <HomeSearch />
            <RecipesContainer />
        </Fragment>
    )
}

export default Home
