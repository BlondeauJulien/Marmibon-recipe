const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth')

const Recipe = require('../models/Recipe');
const User = require('../models/User');


// @route   POST api/recipes
// @desc    POST a recipe
// @access  Private 

router.post('/', [auth, [
    check('recipeName', 'Please add a name to the recipe').isLength({min: 4, max: 30}).trim().escape(),
    check('serving', 'Please add the number of serving').isInt({min: 1, max: 10}),
    check('prepTimeHours', `S'il vous plait remplisser le champ heure (0 si moins de 60 minutes). Merci.`).isInt({min: 0, max: 24}),
    check('prepTimeMins', `S'il vous plait remplisser le champ minute (0 si besoin). Merci.`).isInt({min: 0, max: 59}),
    check('price', 'Merci de choisir un prix valide').custom(str => str === "lowPrice" || str === "midPrice" || str === "highPrice"),
    check('recipeType', 'Merci de choisir entre entrée, plat ou dessert').custom(str => str === "starter" || str === "mainCourse" || str === "dessert"),
    check('ingredients', 'Vous devez ajouter au moins 1 ingredient').custom(arr => arr.length > 0 ),
    check('ingredients.*.ingredientName', `Un ingrédient ne peut pas contenir plus de 20 characters`).isLength({min: 2, max: 21}).trim().escape(),
    check('steps', 'Vous devez ajouter au moins une étape').custom(arr => arr.length > 0 ),
    check('steps.*.stepContent', "Un étape doit contenir entre 10 et 400 characters").isLength({min: 10, max: 400}).trim().escape(),

]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        let errorsArrMsg = errors.array().reduce((acc, error) => {
            return [...acc, error.msg]
        }, [])
        return res.status(400).json({ msg: errorsArrMsg })
    }

    let {recipeName, prepTimeHours, prepTimeMins, serving, price, recipeType, steps, ingredients} = req.body;
    try {
        let newRecipe = new Recipe({
            user: req.user.id,
            recipeName,
            prepTimeHours,
            prepTimeMins,
            serving,
            price,
            recipeType,
            steps,
            ingredients 
        });

        const recipe = await newRecipe.save();

        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ msg: ['Une erreur est survenu pendant la sauvegarde, veuillez réessayer'] })
		res.status(500).send('Server Error');
    }
})

// @route   GET /api/recipes/getsearchqueryresult
// @desc    Get recipes array matching the search query
// @access  public 

router.post('/getsearchqueryresult', async(req, res) => {
    try {
        let recipes = await Recipe.find({});
        let users;
        if(req.body.user.trim() !== '') {
            users = await User.find({}).select('-password');
        }
        
        let result;

        if(req.body.name.trim() !== '') {
            let nameFiltered = recipes.filter(recipe => {
                if(recipe.recipeName.toLowerCase().includes(req.body.name.toLowerCase()) ) {
                    return recipe
                }
            });
            result = [...nameFiltered];
        }

        if(req.body.time.trim() !== '') {
            let prevResult;
            if(Array.isArray(result)) {
                prevResult = [...result]
            } else {
                prevResult = [...recipes]
            }

            let timeFiltered = prevResult.filter(recipe => {
                let recipeTimeInMin = Number(recipe.prepTimeHours * 60) + Number(recipe.prepTimeMins);
                if(recipeTimeInMin <= req.body.time) {
                    return recipe
                }
            });
            result = [...timeFiltered];
        }

        if(req.body.ingredient.trim() !== '') {
            let prevResult;
            if(Array.isArray(result)) {
                prevResult = [...result]
            } else {
                prevResult = [...recipes]
            }

            let ingredientsFiltered = prevResult.filter(recipe => {
                let foundMatch = false;
                for(let i = 0; i<recipe.ingredients.length; i++) {
                    if(recipe.ingredients[i].ingredientName.toLowerCase().includes(req.body.ingredient.toLowerCase()) ) {
                        foundMatch = true;
                        break;
                    }
                }
                if(foundMatch) return recipe;
            });
            result = [...ingredientsFiltered];
        }

        if(req.body.user.trim() !== '') {
            let prevResult;
            if(Array.isArray(result)) {
                prevResult = [...result]
            } else {
                prevResult = [...recipes]
            }
            let usersFound = users.filter(user => user.userName.toLowerCase() === req.body.user.toLowerCase());

            let userFiltered = prevResult.filter(recipe => {
                for(let i = 0; i < usersFound.length; i++) {
                    console.log(usersFound[i]._id)
                    
                    if(usersFound[i]._id.toString() === recipe.user.toString()) {
                        return recipe;
                    }
                }
            });
            result = [...userFiltered];
        }

        if(result === undefined) {
            result = [];
        }

        res.json(result)

    } catch (err) {
        res.status(400).json({ msg: ['Une erreur est survenu pendant la recherche, veuillez réessayer'] })
		res.status(500).send('Server Error');
    }
})

// @route   GET api/recipes
// @desc    GET all recipes
// @access  Public 

router.get('/all', async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.json(recipes)
    } catch (err) {
        res.status(400).json({ msg: ['Une erreur est survenu pendant la recherche, veuillez réessayer'] })
		res.status(500).send('Server Error');
    }

});



// @route   GET /api/recipes/getrandom
// @desc    Get single recipe randomly
// @access  public 

router.get('/getrandom', async (req, res) => {
    try {
        let recipes = await Recipe.find({});
        let randomNum = Math.floor(Math.random() * recipes.length);
        res.json(recipes[randomNum])
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

})

// @route   GET /api/recipes/getbytype
// @desc    Get all recipes for a certain type
// @access  public 
router.get('/getbytype/:type', async (req, res) => {
    try {
        let recipes = await Recipe.find({recipeType: req.params.type});
        res.json(recipes);

    } catch (err) {
        res.status(400).json({ msg: ['Une erreur est survenu pendant la recherche, veuillez réessayer'] })
		res.status(500).send('Server Error');
    }
})

// @route   GET api/recipes
// @desc    GET single recipe
// @access  Public 

router.get('/:recipeId', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId);
        res.json(recipe)
    } catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
    }

});

// @route   GET api/recipes
// @desc    GET all recipes from logged user
// @access  Public 

router.get('/user/:id',  async (req, res) => {
    try {
        const recipes = await Recipe.find( { user: req.params.id});
        res.json(recipes)
    } catch (err) {
        res.status(400).json({ msg: ['Une erreur est survenu pendant la recherche, veuillez réessayer'] })
		res.status(500).send('Server Error');
    }

});

// @route   PUT api/recipes/edit/:id
// @desc    Update a recipe
// @access  Private 

router.put('/edit/:id', [auth, [
    check('recipeName', 'Please add a name to the recipe').isLength({min: 4, max: 30}).trim().escape(),
    check('serving', 'Please add the number of serving').isInt({min: 1, max: 10}),
    check('prepTimeHours', `S'il vous plait remplisser le champ heure (0 si moins de 60 minutes). Merci.`).isInt({min: 0, max: 24}),
    check('prepTimeMins', `S'il vous plait remplisser le champ minute (0 si besoin). Merci.`).isInt({min: 0, max: 59}),
    check('price', 'Merci de choisir un prix valide').custom(str => str === "lowPrice" || str === "midPrice" || str === "highPrice"),
    check('recipeType', 'Merci de choisir entre entrée, plat ou dessert').custom(str => str === "starter" || str === "mainCourse" || str === "dessert"),
    check('ingredients', 'Vous devez ajouter au moins 1 ingredient').custom(arr => arr.length > 0 ),
    check('ingredients.*.ingredientName', `Un ingrédient ne peut pas contenir plus de 20 characters`).isLength({min: 2, max: 21}).trim().escape(),
    check('steps', 'Vous devez ajouter au moins une étape').custom(arr => arr.length > 0 ),
    check('steps.*.stepContent', "Un étape doit contenir entre 10 et 400 characters").isLength({min: 10, max: 400}).trim().escape(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        let errorsArrMsg = errors.array().reduce((acc, error) => {
            return [...acc, error.msg]
        }, [])
        return res.status(400).json({ msg: errorsArrMsg })
    }
    
    try {
        let recipe = await Recipe.findById(req.params.id);

        if(!recipe) return res.status(404).json({ msg: [`Nous n'avons pas trouver la recette à éditer: réessayer`]});

        if(recipe.user.toString() !== req.user.id ) return res.status(404).json({ msg: [`Vous n'êtes pas authorisé à éditer cette recette`]});

        recipe = await Recipe.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})

        res.json(recipe);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ msg: ['Une erreur est survenu pendant la sauvegarde, veuillez réessayer'] })
		res.status(500).send('Server error');
    }
})

// @route   PUT api/recipes/recipeID/addreview
// @desc    Add a review to a recipe
// @access  Private 

router.put('/:id/addreview', auth, async (req, res) => {

        let review = {...req.body};
        review.authorId = req.user.id;

    try {
        let recipe = await Recipe.findById(req.params.id);
        let user = await User.findById(req.user.id);
        let firstReview = true;

        if(!recipe) return res.status(404).json({ msg: 'Recipe not found'});

        recipe.reviews.forEach(review => {
            if(req.user.id === review.authorId) {
                firstReview = false;
                res.json({
                    msg: "Vous avez déjà ajouté un avis par le passé",
                    userHasReviewed: true
                })
            }
        });

        if(firstReview) {

            review.authorReviewName = user.userName;

            await Recipe.findByIdAndUpdate(req.params.id, {$push: { reviews: review }})

            res.json({
                msg: "Votre avis a été ajouté",
                userHasReviewed: true
            })
        }
    } catch (err) {
        console.error(err.message);
		res.status(500).send('Server error');
    }
})


// @route   PUT /api/recipes/recipeId/saverecipe
// @desc    Add a review to a recipe
// @access  Private 

router.put('/:id/saverecipe', auth, async (req, res) => {

    try {
        let recipe = await Recipe.findById(req.params.id);
        let user = await User.findById(req.user.id);

        if(!recipe) return res.status(404).json({ msg: 'Contact not found'});
        if(!user) return res.status(404).json({ msg: 'User not found'});

        user.savedRecipe.forEach(recipe => {
            if(req.params.id === recipe._id) {
                console.log('already saved')
                res.json({
                    msg: "Vous avez déjà sauvegardé la recette"
                }) 
            }
        });

        //save user id in recipe DATA
        let savedArr = [...recipe.saved, req.user.id]

        recipe.saved = savedArr;

        await Recipe.findByIdAndUpdate(req.params.id, {$set: recipe}, {new: true})
        
        // save recipe id in user data
        let savedRecipeArr = [...user.savedRecipe, recipe]

        user.savedRecipe = savedRecipeArr;

        await User.findByIdAndUpdate(req.user.id, {$set: user}, {new: true});

        res.json({
            recipe: recipe
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   PUT /api/recipes/recipeId/deletesaverecipe
// @desc    Add a review to a recipe
// @access  Private 
router.put('/:id/deletesaverecipe', auth, async (req, res) => {

    try {
        let recipe = await Recipe.findById(req.params.id);
        let user = await User.findById(req.user.id);

        if(!recipe) return res.status(404).json({ msg: 'Contact not found'});
        if(!user) return res.status(404).json({ msg: 'User not found'});

        //delete user id in recipe DATA
        let savedArr = [...recipe.saved].filter(u => u !== req.user.id)

        recipe.saved = savedArr;

        await Recipe.findByIdAndUpdate(req.params.id, {$set: recipe}, {new: true})
        
        // delete recipe  in user data
        let savedRecipeArr = [...user.savedRecipe].filter(r => r._id != req.params.id)

        user.savedRecipe = savedRecipeArr;

        await User.findByIdAndUpdate(req.user.id, {$set: user}, {new: true});

        res.json({
            recipe: recipe
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   DELETE api/recipes/recipeID
// @desc    Delete a recipe
// @access  Private 

router.delete('/:id', auth, async (req, res) => {
    try {
        let recipe = await Recipe.findById(req.params.id);

        if(!recipe) return res.status(404).json({ msg: 'Recipe not found'});

        if(recipe.user.toString() !== req.user.id ) return res.status(404).json({ msg: 'Not authorized to delete this recipe'});

        await Recipe.findByIdAndRemove(req.params.id)

        res.json({ msg: 'La recette a bien été supprimer' })


    } catch (err) {
        console.error(err.message);
		res.status(500).send('Server Error');
    }
})

module.exports = router;