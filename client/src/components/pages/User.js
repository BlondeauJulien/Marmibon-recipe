import React, { useState, useContext, useEffect } from 'react';
import RecipeAbstractItem from '../pagesComponents/RecipeAbstractItem';
import spinner from '../layout/spinner.gif';
import Pagination from '../pagesComponents/Pagination';

import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';


const User = (props) => {

	const authContext = useContext(AuthContext);
    const recipeContext = useContext(RecipeContext);

	const { user, loadUser, isAuthenticated, logout, userRecipes, displayedOnProfile, handleDisplayedOnProfile } = authContext;
    const { recipeInfo, redirect, deleteRecipe, loading, setRecipeToUpdate, recipeToUpdate, pushToEditRecipe} = recipeContext;

	const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
	const [currentPosts, setCurrentPost] = useState([]);

	useEffect(() => {
		if(localStorage.getItem('token') !== null) {
			loadUser()
		}
		const handleResize = () => {
			if( document.body.clientWidth > 800) {
				document.querySelector('.user-profile-action-container').style.display = "block";
			} else {
				document.querySelector('.user-profile-action-container').style.display = "none";
			}
		}
		window.addEventListener('resize', handleResize );

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if(localStorage.getItem('token') !== null) {
            loadUser()
		}
        // eslint-disable-next-line
	}, [loading]);

	useEffect(() => {
		if(recipeToUpdate !== null && pushToEditRecipe) {
			props.history.push("edit");
		}
        // eslint-disable-next-line
	}, [recipeToUpdate])

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
        // eslint-disable-next-line
	}, [redirect])

	useEffect(() => {
		setCurrentPage(1);
	}, [displayedOnProfile]);
	
	useEffect(() => {

		if(user) {
            const indexOfLastPost = currentPage * postsPerPage;
			const indexOfFirstPost = indexOfLastPost - postsPerPage;
			if(userRecipes && displayedOnProfile === "createdRecipe") {
				setCurrentPost(userRecipes.slice(indexOfFirstPost, indexOfLastPost));
			}else if(user.savedRecipe && displayedOnProfile === "savedRecipe") {
				setCurrentPost(user.savedRecipe.slice(indexOfFirstPost, indexOfLastPost));
			} else {
				setCurrentPost([]);
			}
		}
    	// eslint-disable-next-line
    }, [displayedOnProfile, currentPage ])

/*     useEffect(() => {
        setCurrentPage(1);
    }, [searchLoading]) */

	if(user === null ) {
		return (
			<h1>Error</h1>
		)
	}

	const handleMobileUserMenu = (action) => {
		if(action === "show") {
			document.querySelector('.user-profile-action-container').style.display = "block";
		} else {
			document.querySelector('.user-profile-action-container').style.display = "none";
		}
	}

	const handleDisplayChange = (nameChange) => {
		if(nameChange === "profileInfo" && document.body.clientWidth <= 800) {
			handleMobileUserMenu('close');
		}

		handleDisplayedOnProfile(nameChange);
	}

	const paginate = pageNumber => setCurrentPage(pageNumber);

	return (
		<div className="user-container">
			<div className="user-profile-action-container">
				<div className="cross-dont-show-menu"><i onClick={() => handleMobileUserMenu('close')} className="far fa-times-circle"></i></div>
				<div>
					<div onClick={() => handleDisplayChange('profileInfo')} className="btn-info">Mes infos</div>
				</div>
				<button onClick={logout} className="btn-logout">Se déconnecter</button>
			</div>
			<div className="user-profile-container">
				<div className="arrow-show-menu" onClick={() => handleMobileUserMenu('show')}><i className="fas fa-angle-double-right"></i></div>
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

				{loading.deleteRecipeInUser ? (
					<img src={spinner} style={{width: '125px', margin: 'auto', display: 'block'}} alt="spinner loading"/>
				) : displayedOnProfile === "createdRecipe" ? (
					<div className="recipes-abstracts-container">
						{ currentPosts.length === 0 ? (
							<h3>Vous n'avez pas encore créée de recette</h3>
						) : 
						currentPosts.map(recipe => <RecipeAbstractItem key={recipe._id} recipe={recipe} user={user} isAuthenticated={isAuthenticated} setRecipeToUpdate={setRecipeToUpdate} deleteRecipe={deleteRecipe}/>)}
					</div>
				) : displayedOnProfile === "savedRecipe" ? (
					<div className="recipes-abstracts-container">
						{ currentPosts.length === 0 ? (
							<h3>Vous n'avez pas encore sauvegardé de recette</h3>
						) : 
						currentPosts.map(recipe => <RecipeAbstractItem key={recipe._id} recipe={recipe} user={user} isAuthenticated={isAuthenticated} setRecipeToUpdate={setRecipeToUpdate} deleteRecipe={deleteRecipe}/>)}
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

				{currentPosts && currentPosts.length > 1 && (<Pagination
					postsPerPage={postsPerPage}
					currentPage={currentPage}
					totalPosts={displayedOnProfile === "createdRecipe" ? userRecipes.length : user.savedRecipe.length}
					paginate={paginate}
				/>)}

			</div>
		</div>
	);
};

export default User;
