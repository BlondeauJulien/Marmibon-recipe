import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchContext from '../../../context/search/searchContext';

const HomeSearch = () => {
	const searchContext = useContext(SearchContext);

	const { 
		getSearchQuery, 
		searchQueryValue, 
		setQueryValue, 
		redirectToSearchCont
	} = searchContext;

	const onChange = e => setQueryValue({...searchQueryValue, [e.target.name]: e.target.value});

	const handleSubmitSearch = e => {
		e.preventDefault();
		redirectToSearchCont();
		getSearchQuery();

    }

	const unBlur = () => {
		document.querySelector('.home-search-bg-image').style.filter = 'none';
	};

	const blur = () => {
		document.querySelector('.home-search-bg-image').style.filter = 'blur(4px)';
	};

	return (
		<Fragment>
			<div className="home-search-bg-image" onMouseEnter={unBlur} onMouseLeave={blur} />
			<div className="home-search-container" onMouseEnter={unBlur} onMouseLeave={blur}>
				<span>Trouver votre prochaine idée de recette:</span>
				<div className="search-bar-bg">
					<form onSubmit={handleSubmitSearch} className="search-bar-home-container">
						<input type="search" name="name" onChange={onChange} value={searchQueryValue.name} placeholder="Rechercher parmi nos recettes..." />
						<button>
							<i className="fas fa-search brand-color-txt" />
						</button>
					</form>
				</div>
				<div className="search-advanced">
					<i className="fas fa-long-arrow-alt-right" />
					<Link to="/search">Recherche Avancée</Link>
				</div>
			</div>
		</Fragment>
	);
};

export default HomeSearch;
