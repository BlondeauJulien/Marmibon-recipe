import React, { useContext, useEffect } from 'react';
import RecipeAbstractItem from '../pagesComponents/RecipeAbstractItem';

import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';


const User = (props) => {

	const authContext = useContext(AuthContext);
    const recipeContext = useContext(RecipeContext);


	const { user, loadUser, isAuthenticated, logout, userRecipes, displayedOnProfile, handleDisplayedOnProfile } = authContext;
    const { recipeInfo, redirect} = recipeContext;


	useEffect(() => {
		if(localStorage.getItem('token') !== null) {
            loadUser()
        }

	}, []);

	useEffect(() => {
		if(!isAuthenticated) {
			props.history.push("/");
		}
		// eslint-disable-next-line
	}, [user]);

	useEffect(() => {
        if(redirect.recipeCont) {
            props.history.push(`recipe/${recipeInfo._id}`)
        }
    }, [redirect])

	if(user === null ) {
		return (
			<h1>Error</h1>
		)
	}

	const handleDisplayChange = (nameChange) => {
		handleDisplayedOnProfile(nameChange)
	}

	const handleLogout = () => {
		logout();
	}

	return (
		<div className="user-container">
			<div className="user-profile-action-container">
				<a>
					<div onClick={() => handleDisplayChange('profileInfo')} className="btn-info">Mes infos</div>
				</a>
				<button onClick={logout} className="btn-logout">Se déconnecter</button>
			</div>
			<div className="user-profile-container">
				<h1>{user.userName}</h1>
				<div className="user-content-container">
					<div className="btn-saved-or-created-recipe-cont">
						<div onClick={() => handleDisplayChange('createdRecipe')} 
						className={`btn-user-created-recipe ${displayedOnProfile === "createdRecipe" ? "btn-highlight" : "btn-no-highlight"}`}
						>Mes recettes créées</div>
						<div onClick={() => handleDisplayChange('savedRecipe')} 
						className={`btn-user-saved-recipe ${displayedOnProfile === "savedRecipe" ? "btn-highlight" : "btn-no-highlight"}`}
						>Mes recettes sauvegardées</div>
					</div>
				</div>

				{displayedOnProfile === "createdRecipe" ? (
					<div className="recipes-abstracts-container">
						{ userRecipes.length === 0 ? (
							<h3>Vous n'avez pas encore créée de recette</h3>
						) : 
						userRecipes.map(recipe => <RecipeAbstractItem key={recipe._id} recipe={recipe} />)}
					</div>
				) : displayedOnProfile === "savedRecipe" ? (
					<div className="recipes-abstracts-container">
						{ user.savedRecipe.length === 0 ? (
							<h3>Vous n'avez pas encore sauvegardé de recette</h3>
						) : 
						user.savedRecipe.map(recipe => <RecipeAbstractItem key={recipe._id} recipe={recipe} />)}
					</div>
				) : (
					<div className="user-info-cont">
						<div className="userInfo-item">
							<span>Nom d'utilisateur: {user.userName}</span>
						</div>
						<div className="userInfo-item">
							<span>Email: {user.email}</span>
						</div>
					</div>

				)}

			</div>
		</div>
	);
};

export default User;
