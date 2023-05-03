const express = require('express')
const router = express.Router();
const UserController = require('../database/controllers/users');
const jwt = require('jsonwebtoken');
const authenticateJWT = require("../helpers/authenticate");

router.all('/', (req, res, next) => {
    res.status(200);
    next();
});

router.get('/', authenticateJWT, async (req, res, next) => {
    try {
        const found = await UserController.getAll();
        res.send(found)
    } catch (err) {
        next(err);
    }
    res.end();
})

router.get('/me', authenticateJWT, async (req, res, next) => {
    try {
        const email = req.user.email;
        const found = await UserController.getByEmail(email);
        res.send(found)
    } catch (err) {
        next(err);
    }
    res.end();
})


router.post('/sign-up', async (req, res, next) => {
    if (req.body) {
        try {
            const newUser = await UserController.create(req.body);
            res.send(newUser);
        } catch (err) {
            next(err);
        }
        res.end();
    }
})

router.post('/sign-in', async (req, res, next) => {
    if (req.body) {
        try {
            const {email, password} = req.body;
            const foundUser = await UserController.getByEmail(email);
            if (!foundUser) {
                res.status(400).send({message: 'User not found'});
            } else if (foundUser.password !== password) {
                res.status(400).send({message: 'Wrong password'});
            } else {
                const accessToken = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '1h'});
                res.json({
                    accessToken
                });
            }

        } catch (err) {
            next(err);
        }
        res.end();
    }
})

module.exports = router;
