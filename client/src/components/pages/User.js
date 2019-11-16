import React, { useContext, useEffect } from 'react';
import RecipeAbstractItem from '../pagesComponents/RecipeAbstractItem';

import AuthContext from '../../context/auth/authContext';

const User = () => {

	const authContext = useContext(AuthContext);

	const { user, loadUser, userRecipes } = authContext;

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	if(user === null ) {
		return (
			<h1>Error</h1>
		)
	}
	return (
		<div className="user-container">
			<div className="user-profile-action-container">
				<a>
					<div className="btn-info">Mes infos</div>
				</a>
				<button className="btn-logout">Se déconnecter</button>
			</div>
			<div className="user-profile-container">
				<h1>{user.userName}</h1>
				<div className="user-content-container">
					<div className="btn-saved-or-created-recipe-cont">
						<div className="btn-user-saved-recipe">Mes recettes créées</div>
						<div className="btn-user-created-recipe">Mes recettes sauvegardées</div>
					</div>
				</div>
                <div className="recipes-abstracts-container">
 					{ userRecipes.length === 0 ? (
						<h3>Vous n'avez pas encore créée de recette</h3>
					) : 
					userRecipes.map(recipe => <RecipeAbstractItem key={recipe._id} recipe={recipe} />)}


                </div>
			</div>
		</div>
	);
};

export default User;
