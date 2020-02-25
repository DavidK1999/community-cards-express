const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Card = require('../models/card');

router.get('/profile/:userID', async (req, res) => {
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

router.put('/upvote/:cardID', async (req, res) => {
    try {
        console.log("===UPVOTED===");
        const userUpvoted = await User.findByIdAndUpdate(req.body._id, 
            {$addToSet: {"upvotedPosts": req.params.cardID}}, {new:true})
        
        await Card.findByIdAndUpdate(req.params.cardID, 
           {$addToSet: {"upvotes": req.body._id}},{new:true});

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