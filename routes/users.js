const express = require('express')
const router = express.Router();
const UserController = require('../database/controllers/users');
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
            const accessToken = await UserController.signUp(req.body);
            res.json({accessToken});
        } catch (err) {
            next(err);
        }
        res.end();
    }
})

router.post('/sign-in', async (req, res, next) => {
    if (req.body) {
        try {
            const accessToken = await UserController.signIn(req.body);
            res.json({accessToken});

        } catch (err) {
            next(err);
        }
    }
})

module.exports = router;
