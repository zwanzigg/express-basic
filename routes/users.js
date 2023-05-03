const express = require('express')
const router = express.Router();
const UserController = require('../database/controllers/users');

router.all('/', (req, res, next) => {
    res.status(200);
    next();
});

router.get('/', async (req, res, next) => {
    try {
        const found = await UserController.getAll();
        res.send(found)
    } catch (err) {
       next(err);
    }
    res.end();
})


router.post('/sign-up', async(req, res, next) => {
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

router.post('/sign-in', async(req, res, next) => {
    if (req.body) {
        try {
            const {email, password} = req.body;
            const foundUser = await UserController.getByEmail(email);
            if (!foundUser) {
                res.status(400).send({message: 'User not found'});
            } else if (foundUser.password !== password) {
                res.status(400).send({message: 'Wrong password'});
            } else {
                res.send(foundUser);
            }

        } catch (err) {
            next(err);
        }
        res.end();
    }
})

module.exports = router;
