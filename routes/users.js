const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
require('dotenv/config');
const request = require('request');
const { check, validationResult } = require('express-validator');

const User = require('../models/User')

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    check('userName', `S'il vous plait ajouter un nom d'utilisateur.`).not().isEmpty().isAlphanumeric().isLength({min: 4, max: 16}),
    check('email', `S'il vous plait ajouter un email valide.`).isEmail(),
    check('password', `Votre mot de passe doit faire au moins 6 characters`).isLength({ min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        let errorsArrMsg = errors.array().reduce((acc, error) => {
            return [...acc, error.msg]
        }, [])
        return res.status(400).json({ msg: [errorsArrMsg] })
    }

    const { userName, email, password } = req.body;

    // Captcha
    if(
        req.body.captcha === undefined ||
        req.body.captcha === '' ||
        req.body.captcha === null
    ) {return res.status(400).json({ msg: ['Captcha Error'] })}

    const secretCaptchaKey = process.env.CAPTCHA_SECRET_KEY;
    const verifyCaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretCaptchaKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    //Make request to verify captcha
    request(verifyCaptchaUrl, async (err, response,body) => {
        body = JSON.parse(body)

        // If not successful
        if(body.success !== undefined && !body.success) {
            return res.status(400).json({ msg: ['Captcha Error'] })
        }


        try {
            let user = await User.findOne({ $or: [
                {userName},
                {email}
            ]})
    
            if(user) {
                return res.status(400).json({ msg: ['Votre pseudo ou email a déjà été utilisé'] })
            }
        
            user = new User({
                userName,
                email,
                password
            })
        
            const salt = await bcrypt.genSalt(10);
        
            user.password = await bcrypt.hash(password, salt);
        
            await user.save()
    
            let payload = {
                user: {
                    id: user.id
                }
            }
    
            jwt.sign(payload, process.env.JWT_SECRET,
            (err, token) => {
                if(err) throw err;
                res.json({token});
            });
    
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    })

    

})

// @route   GET api/users
// @desc    Get single User Name
// @access  Public

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user.userName)
    } catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
    }
});

module.exports = router;