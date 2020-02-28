const express = require('express');
const router = express.Router();
const Card = require('../models/card');
const User = require('../models/user');


router.get('/all', async (req, res) => {
    try {
        console.log("====================")
        console.log("FETCHED");
        console.log("====================")        
        let allCards = await Card.find().populate({path: "created_by"});
        res.status(200).send(allCards);
    } catch (error) {
        console.log("ERROR : ", error);
        res.sendStatus(500);
    }
});


router.get('/feed/:userID', async (req, res) => {
    // let feedCards = await Card.find();
    let feedCards = await Card.find({"created_by": {$in: req.params.userID}}).populate({path: "created_by"});
    res.send(feedCards);
});

router.get('/profile/:id', async (req, res) => {
    try {
        console.log("====================")
        console.log("CARDS");
        console.log("====================")
        let profileCards = await Card.find({"author_id" : req.params.id}).populate({path: "created_by"}).exec();
        res.status(200).send(profileCards);
    } catch (error) {
        
    }
});


router.post('/create/:userID', async (req, res) => {
    try {
        console.log("CREATED");
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



router.put('/upvote/:postID', async (req, res) => {
    console.log("====================")
    console.log("POST UPVOTED");
    console.log("====================")
    try {
        // * When the user upvotes someone, the upvoted user's post will be modified and 
        // * stored in the database.
            await Card.findByIdAndUpdate(req.params.postID,
                {$addToSet: {"upvotes": req.body._id}}, {new: true});
    } catch (error) {
        
    }
});
    
    

module.exports = router;