const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const User = require('../models/user')

//Return a list of all users
router.get('/', (req, res, next) => {
    User.find()
        .exec()
        .then(docs =>{
            console.log(docs);
            // if (docs.lenght >= 0) {
            res.status(200).json(docs);
            // } else {
            //     res.status(404).json({message: 'No entries found'})
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});

router.get('/authusers', (req, res, next) => {
    User.find({ authorization : true })
        .exec()
        .then(docs =>{
            console.log("authusers",docs);
            // if (docs.lenght >= 0) {
            res.status(200).json(docs);
            // } else {
            //     res.status(404).json({message: 'No entries found'})
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});
//Create a new user
router.post('/', (req, res, next) => {

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: 
            {
                title: req.body.name.title,
                first: req.body.name.first,
                last: req.body.name.last
            },
            picture: 
            {
                large: req.body.picture.large,
                medium: req.body.picture.medium,
                thumbnail: req.body.picture.thumbnail
            },
            authorization: false        
    });
    user
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'Handling POST requests to /users',
                createdUser: user
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    console.log(id)
    User.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(202).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: 'delete',error: err})
    });
})


// router.get('/:userId', (req, res, next) => {
//     const id = req.params.userId;
//     User.findById(id)
//         .exec()
//         .then(doc => {
//             console.log(doc);
//             if (doc) {
//                 res.status(200).json(doc);
//             } else {
//                 res.status(404).json({message: 'No valid entry found for provided ID'})
//             }
//         })
//         .catch(err =>{
//             console.log(err)
//             res.status(500).json({error: err})
//         });
    
// });

router.get('/search/:userSearch', (req, res, next) => {
    // var search = req.params.userSearch.split(' ');
    // var regexString = "";
    // for (var i = 0; i < search.length; i++) {
    //     regexString += search[i];
    //     if( i < search.length - 1) regexString += '|';
    //     }
    // var re = new RegExp(regexString, 'ig')
    var query = {$or:[{'name.first':{$regex: req.params.userSearch, $options: 'i'}},{'name.last':{$regex: req.params.userSearch, $options: 'i'}}]}
    console.log(query)
    User.find(query)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'})
            }
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({error: err})
        });
    
});
//Allows you to update a user to either authorized true or false
router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.update({_id: id}, { $set: { authorization: req.body.authorization}})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



module.exports = router;