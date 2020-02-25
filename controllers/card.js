const express = require('express');
const router = express.Router();
const Card = require('../models/card');
const User = require('../models/user');


router.get('/all', async (req, res) => {
    try {
        console.log('FETCHED');
        let allCards = await Card.find().populate({path: "created_by"});;
        // console.log(allCards);
        res.status(200).send(allCards);
    } catch (error) {
        console.log("ERROR : ", error);
        res.sendStatus(500);
    }
});

router.get('/profile/:id', async (req, res) => {
    try {
        console.log('PROFILE');
        console.log(req.params.id);
        let profileCards = await Card.find({"author_id" : req.params.id}).populate({path: "created_by"}).exec();
        res.status(200).send(profileCards);
    } catch (error) {
        
    }
});


router.post('/create/:userID', async (req, res) => {
    try {
        console.log("cREATED");
        // TODO REMOVE THE PASSWORD
        req.body.created_by = req.params.userID
        req.body.author_id = req.params.userID
        Card.create(req.body);
        let updatedUser = await User.findByIdAndUpdate(req.params.userID,
            {$inc: {"createdPosts": 1}}, {new: true});
            res.status(200).send(updatedUser);
        } catch (error) {
            console.log("ERROR :", error);
            res.sendStatus(500);
        }
    });
    
    

module.exports = router;