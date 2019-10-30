import React, { Fragment} from 'react';
import HomeSearch from '../pagesComponents/homeComponents/HomeSearch';
import RecipesContainer from '../pagesComponents/homeComponents/RecipesContainer';

const Home = () => {
    return (
        <Fragment>
            <HomeSearch />
            <RecipesContainer />
        </Fragment>
    )
}

export default Home
