const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
require('dotenv/config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth')

const User = require('../models/User');
const Recipe = require('../models/Recipe');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private 
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const recipes = await Recipe.find( { user: user._id});
        const savedRecipe = await Recipe.find({ saved: user._id.toString()});

        user.savedRecipe = savedRecipe;

        res.json({
            user,
            recipes
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error')
    }

})


// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public 

router.post('/', [
    check('email', `S'il vous plait, utiliser un email valide`).isEmail(),
    check('password', 'Vous devez entrer un mot de passe').exists().isLength({min: 1})
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        let errorsArrMsg = errors.array().reduce((acc, error) => {
            return [...acc, error.msg]
        }, [])
        return res.status(400).json({ msg: errorsArrMsg })
    }

    const { email, password } = req.body;

        try {
            let user = await User.findOne( { email });

            if(!user) {
                res.status(400).json({ msg: ['Pas de compte pour cette email'] })
            }
        
            let passwordMatch = await bcrypt.compare(password, user.password);
            
            if(!passwordMatch) res.status(400).json({ msg: ['Vous avez entré un mauvais mot de passe'] })

            let payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
                if(err) {
                    throw err 
                } 

                res.json({ token })
            });


        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    
})


module.exports = router;
