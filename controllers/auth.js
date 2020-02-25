const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const initializePassport = require('../passport-config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// TODO Implement JSON WEB TOKENS

initializePassport (
    passport, 
    email => User.findOne({email: email})
);

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user
        next();
    });
}

const checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

const checkNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

// TODO add authenticate token to routes that will need to be protected

router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
    const accessToken = jwt.sign(req.user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
    req.user.password = undefined;
    res.json({Token: accessToken, User: req.user});
});

router.post('/register', checkNotAuthenticated, async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    const userDbEntry = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    }
    try {
        const registeredUser = await User.create(userDbEntry);
        const accessToken = jwt.sign(registeredUser.toJSON(), process.env.ACCESS_TOKEN_SECRET);
        registeredUser.password = undefined;
        res.json({Token: accessToken, User: registeredUser});
    } catch (error) {
        console.log('ERROR : ', error);
        res.send("Email or Username already exists");
    }
});

router.delete('/logout', (req, res) => {
    req.logOut();
    req.redirect('/login');
});

module.exports = router;