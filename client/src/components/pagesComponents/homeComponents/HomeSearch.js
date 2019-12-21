import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchContext from '../../../context/search/searchContext';
import LanguageContext from '../../../context/language/languageContext';

const HomeSearch = () => {
	const searchContext = useContext(SearchContext);
	const languageContext = useContext(LanguageContext);

	const { 
		getSearchQuery, 
		searchQueryValue, 
		setQueryValue, 
		redirectToSearchCont
	} = searchContext;
	const { languageDisplayed, language, switchLanguage } = languageContext;

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
				<span>{ language[languageDisplayed].homeSearch.header }</span>
				<div className="search-wrapper">
				<div className="search-bar-bg">
					<form onSubmit={handleSubmitSearch} className="search-bar-home-container">
						<input type="search" name="name" onChange={onChange} value={searchQueryValue.name} placeholder={ language[languageDisplayed].homeSearch.searchPlaceholder } />
						<button>
							<i className="fas fa-search brand-color-txt" />
						</button>
					</form>
				</div>
				<div className="search-advanced">
					<i className="fas fa-long-arrow-alt-right" />
					<Link to="/search">{ language[languageDisplayed].homeSearch.advancedSearch }</Link>
				</div>
				</div>
			</div>
		</Fragment>
	);
};

export default HomeSearch;
