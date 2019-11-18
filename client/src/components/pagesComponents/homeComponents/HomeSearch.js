import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const HomeSearch = () => {
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
					<div className="search-bar-home-container">
						<input type="search" placeholder="Rechercher parmi 55 recettes..." />
						<button>
							<i className="fas fa-search brand-color-txt" />
						</button>
					</div>
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
