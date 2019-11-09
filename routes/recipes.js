const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth')

const Recipe = require('../models/Recipe');


// @route   POST api/recipes
// @desc    POST a recipe
// @access  Private 

router.post('/', [auth, [
    check('recipeName', 'Please add a name to the recipe').not().isEmpty(),
    check('serving', 'Please add the number of serving').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
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
		res.status(500).send('Server Error');
    }
})

// @route   GET api/recipes
// @desc    GET all recipes
// @access  Public 

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.json(recipes)
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
		console.error(err.message);
		res.status(500).send('Server error');
    }

});

// @route   PUT api/recipes/recipeID
// @desc    Update a recipe
// @access  Private 

router.put('/:id', auth, async (req, res) => {
    let {name, serving, price, prepTime, steps, ingredients} = req.body;

    const recipeFields = {};

    if(name) recipeFields.name = name;
    if(serving) recipeFields.serving = serving;
    if(price) recipeFields.price = price;
    if(prepTime) recipeFields.prepTime = prepTime;
    if(steps) recipeFields.steps = steps;
    if(ingredients) recipeFields.ingredients = ingredients;

    try {
        let recipe = await Recipe.findById(req.params.id);

        if(!recipe) return res.status(404).json({ msg: 'Recipe not found'});

        if(recipe.user.toString() !== req.user.id ) return res.status(404).json({ msg: 'Not authorized to modify this recipe'});

        recipe = await Recipe.findByIdAndUpdate(req.params.id, {$set: recipeFields }, { new: true });

        res.json(recipe);

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

        res.json({ msg: 'Contact Removed' })


    } catch (err) {
        console.error(err.message);
		res.status(500).send('Server Error');
    }
})


module.exports = router;