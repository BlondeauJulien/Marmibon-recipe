const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth')

const Recipe = require('../models/Recipe');


// @route   POST api/recipes
// @desc    POST a recipe
// @access  Private 

router.post('/', [auth, [
    check('name', 'Please add a name to the recipe').not().isEmpty(),
    check('serving', 'Please add the number of serving').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

    let {name, serving, price, prepTime, steps, ingredients} = req.body;
    try {
        let newRecipe = new Recipe({
            user: req.user.id,
            name,
            serving,
            prepTime,
            price,
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




module.exports = router;