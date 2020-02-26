const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Card = require('../models/card');

router.get('/profile/:userID', async (req, res) => {
    // TODO POPULATE THE FOLLOWERS AND FOLLOWING ARRAYS
    try {
        console.log("USERPROFILE");
        // TODO REMOVE THE PASSWORD
        let userProfile = await User.findById(req.params.userID);
         res.status(200).send(userProfile);
        } catch (error) {
            console.log("ERROR :", error);
            res.sendStatus(500);
        }
});

router.put('/increment/:userID', async (req, res) => {
    try {
        console.log("INCREMENT");
        const incrementedUser = await User.findByIdAndUpdate(req.params.userID, 
            {$inc: {"createdPosts": +1}},{new:true});
        res.status(200).send(incrementedUser);
    } catch (error) {
        console.log("ERROR :",error);
        
    }
});

router.put('/upvote/:userID', async (req, res) => {

    // ! CHANGED SOME THINGS HERE. I HAD THE PARAMS CONTAIN THE CARD ID AND THE BODY THE USER I SWITCHED THESE JUST NOW
    try {
        console.log("===UPVOTED===");
        const userUpvoted = await User.findByIdAndUpdate(req.params.userID, 
            {$addToSet: {"upvotedPosts": req.body._id}}, {new:true})
        
        await Card.findByIdAndUpdate(req.body._id, 
           {$addToSet: {"upvotes": req.params.userID}},{new:true});

        await User.findByIdAndUpdate(req.body.created_by._id, 
            {$inc : {upvoteCount: 1}}, {new: true});

        // TODO make it so that the associated user gets an upvote added to their score

        res.status(200).send(userUpvoted);
    } catch (error) {
        console.log("ERROR :",error);
        
    }
});

router.put('/follow/:followID', async (req, res) => {
    try {
        console.log("FOLLOW");
        const nowFollowingUser = await User.findByIdAndUpdate(req.body._id, 
            {$addToSet: {"following": req.params.followID}}, {new:true})
        
        await User.findByIdAndUpdate(req.body._id, 
           {$addToSet: {"followers": req.body._id}},{new:true});

        res.status(200).send(nowFollowingUser);
    } catch (error) {
        console.log("ERROR :",error);
        
    }
});

module.exports = router;