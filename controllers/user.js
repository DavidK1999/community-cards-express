const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Card = require('../models/card');

router.get('/profile/:userID', async (req, res) => {
    // TODO POPULATE THE FOLLOWERS AND FOLLOWING ARRAYS
    try {
        console.log("====================")
        console.log("USERPROFILE");
        console.log("====================")
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
    try {
        // * When the user upvotes someone, the upvoted user's data will be modified and 
        // * stored in the database.
             const updatedUser = await User.findByIdAndUpdate(req.params.userID,
                {$inc: {"upvotedPosts": 1}}, {new: true});
            
            res.send(updatedUser);
    } catch (error) {
        
    }
});


router.put('/follow/:userID', async (req, res) => {
    console.log("====================")
    console.log("FOLLOW");
    console.log("====================")
    try {
        // * When the user follows someone, the data needs to be updated and send back to the front end
        // * The user using the application will be stored and queried through the params.
        const updatedUser = await User.findByIdAndUpdate(req.params.userID, 
            // * The id of the user that will be followed will be stored into the 'following' array.
            {$addToSet: {"following": req.body._id}}, {new: true}); 
        res.send(updatedUser);
    } catch (error) {
        
    }
});

// * FOLLOWED BY ANOTHER USER

router.put('/followedBy/:userID', async (req, res) => {
    console.log("====================")
    console.log("FOLLOWED");
    console.log("====================")
    try {
        // * When the user follows someone, consequently, a user is followed. This data
        // * will be modified in the database and updated when retrieved
        const followedUser = await User.findByIdAndUpdate(req.params.userID, 
            {$addToSet: {"followers": req.body._id}}, {new: true});

        res.send(followedUser);
    } catch (error) {
        
    }
});


module.exports = router;