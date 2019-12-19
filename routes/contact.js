const express = require('express');
const router = express.Router();
require('dotenv/config');
const request = require('request');
const { check, validationResult } = require('express-validator');
const nodemailer = require("nodemailer");

// @route   POST api/contact
// @desc    Send email
// @access  Public
router.post('/', [
    check('senderName', `S'il vous plait ajouter un nom.`).isLength({min: 4, max: 30}).trim(),
    check('senderEmail', `S'il vous plait ajouter un email valide.`).isEmail(),
    check('senderMessage', `S'il vous plait ajouter une message entre 10 et 2000 characters`).isLength({min: 10, max: 2000}).trim()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        let errorsArrMsg = errors.array().reduce((acc, error) => {
            return [...acc, error.msg]
        }, [])
        return res.status(400).json('fail')
    }

    const { senderName, senderEmail, senderMessage } = req.body;
    //console.log(req.body)
    // Captcha
    if(
        req.body.captcha === undefined ||
        req.body.captcha === '' ||
        req.body.captcha === null
    ) {return res.status(400).json('fail')}

    const secretCaptchaKey = process.env.CAPTCHA_SECRET_KEY;
    const verifyCaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretCaptchaKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    //Make request to verify captcha
    request(verifyCaptchaUrl, async (err, response,body) => {
        body = JSON.parse(body)

        // If not successful
        if(body.success !== undefined && !body.success) {
            return res.status(400).json('fail')
        }


           try {
            let transporter = nodemailer.createTransport({
                host: process.env.HOST_SMTP,
                port: process.env.PORT_SMTP,
                secure: false,
                requireTLS: true,
                auth: {
                  user: process.env.E,
                  pass: process.env.M
                },

              });

            let mailOptions = {
                from: `"Marmibon" <${process.env.E} `,
                to: process.env.MONE,
                subject: `Marmibon ${senderEmail} ${senderName}`,
                text: senderMessage
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.json(`fail`);
                }

            });
           res.json('success')
    
        } catch (err) {
            console.error(err.message);
            res.status(500).json(`fail`)
        }
    })


})

module.exports = router;