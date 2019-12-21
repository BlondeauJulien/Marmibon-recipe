import React, { useReducer } from 'react';
import LanguageContext from './languageContext';
import languageReducer from './languageReducer';
import {
    SWITCH_LANGUAGE
} from '../types';

const LanguageState = (props) => {
	const initialState = {
        languageDisplayed: "fr",
        language: {
            fr: {
                header: {
                    searchplaceholder: "Je recherche une recette:",
                    myProfile: "Mon Profil",
                    login: 'Connexion',
                    seeAll: 'Voir Tout',
                    starters: "Entrées",
                    mainCourses: 'Plats',
                    desserts: 'Desserts',
                    random: 'Recette au hasard',
                    createRecipe: 'Créer un recette'
                },

                footer: {
                    headerRecipes: "Recettes",
                    seeAll: 'Voir Tout',
                    starters: "Entrées",
                    mainCourses: 'Plats',
                    desserts: 'Desserts',
                    random: 'Recette au hasard',
                    about: 'A propos',
                    txtfooter1: `Ce site a été créé dans un but d'apprentissage et est inspiré pour le design de marmiton.org. `,
                    txtfooter2: `Il n'a aucun but commercial.`
                },

                homeSearch: {
                    header: 'Trouver votre prochaine idée de recette:',
                    searchPlaceholder: 'Rechercher parmi nos recettes...',
                    advancedSearch: "Recherche Avancée"
                },

                contact: {
                    name: "Nom:",
                    email: "Votre email:",
                    send: 'Envoyer',
                    error: `Une erreur s'est produit, veuillez réessayer s'il vous plait.`,
                    success: 'Votre message a bien été envoyé, merci.'
                },

                login: {
                    header: 'Connectez-vous avec vos identifiants Marmibon:',
                    email: 'Votre email',
                    password: 'Votre mot de passe',
                    login: 'Se connecter',
                    switchTxt: 'Ou créer votre compte:',
                    switchBtnTxt: 'Clicker ici pour créer un compte'
                },

                register: {
                    header: 'Créer votre compte Marmibon:',
                    username: 'Votre pseudo',
                    email: 'Votre email',
                    password: 'Votre mot de passe',
                    passwordConfirm: 'Confirmer votre mot de passe',
                    register: 'Créer mon compte',
                    switchTxt: 'Déjà inscrit?',
                    switchBtnTxt: 'Clicker ici pour vous connecter'
                },

                searchForm: {
                    header: 'Rechercher une recette',
                    name: 'Nom de recette:',
                    time: 'Temps de preparation maximum (en minutes):',
                    createdBy: 'Créée par:',
                    searchBtn: 'Rechercher'
                },

                review: {
                    needloginAlert: 'Vous devez être connecter pour donner votre avis',
                    addReviewAlert: `Ajouter une note et un commentaire s'il vous plait`,
                },

                user: {
                    noCreatedMsg : `Vous n'avez pas encore créée de recette`,
                    noSavedMsg : `Vous n'avez pas encore sauvegardé de recette`
                }


            },

            eng: {
                header: {
                    searchplaceholder: "I'm searching for a recipe:",
                    login: 'Log in',
                    myProfile: "My Profile",
                    seeAll: 'See All',
                    starters: "Starters",
                    mainCourses: 'Main courses',
                    desserts: 'Desserts',
                    random: 'Get a random recipe',
                    createRecipe: 'Create a recipe'
                },

                footer: {
                    headerRecipes: "Recipes",
                    seeAll: 'See All',
                    starters: "Starters",
                    mainCourses: 'Main courses',
                    desserts: 'Desserts',
                    random: 'Get a random recipe',
                    about: 'About',
                    txtfooter1: `This website was created as practice and is inspired from marmiton.org for the design.`,
                    txtfooter2: `It does not have any commercial use.`
                },

                homeSearch: {
                    header: 'Find your next recipe idea:',
                    searchPlaceholder: 'Search amongst our recipes...',
                    advancedSearch: "Advanced Search"
                },

                contact: {
                    name: "Name:",
                    email: "Your email:",
                    send: 'Send',
                    error: 'An error has occured, please try again.',
                    success: 'Your message has been successfully submitted, thank you.'
                },

                login: {
                    header: 'Log in with your marmibon credentials:',
                    email: 'Your email',
                    password: 'Your password',
                    login: 'Log in',
                    switchTxt: 'Or create an account:',
                    switchBtnTxt: 'Click here to create an account'
                },

                register: {
                    header: 'Create your Marmibon account:',
                    username: 'Your username',
                    email: 'Your email',
                    password: 'Your password',
                    passwordConfirm: 'Confirm your password',
                    register: 'Create my account',
                    switchTxt: 'Already a member?',
                    switchBtnTxt: 'Click here to log in to your account'
                },

                searchForm: {
                    header: 'Search a recipe',
                    name: 'Recipe name:',
                    time: 'Max preparation time (in minutes):',
                    createdBy: 'Created by:',
                    searchBtn: 'Search'
                },

                review: {
                    needloginAlert: 'You need to log in to review a recipe',
                    addReviewAlert: 'Please add a stars rating and a review',
                },

                user: {
                    noCreatedMsg : `You did not create any recipe yet`,
                    noSavedMsg : `You did not save any recipe yet`
                    
                }
            }
        }
	};

    const [ state, dispatch ] = useReducer(languageReducer, initialState);
    
    const switchLanguage = (lang) => dispatch({
        type: SWITCH_LANGUAGE,
        payload: lang
    })

	return (
		<LanguageContext.Provider
			value={{
                languageDisplayed: state.languageDisplayed,
                language: state.language,
                switchLanguage
			}}
		>
			{props.children}
		</LanguageContext.Provider>
	);
};

export default LanguageState;
