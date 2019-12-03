const mongoose = require('mongoose');
const Post = require('../modelsExercises/post');
const User = require('../modelsExercises/user');

mongoose.connect('mongodb://localhost:27017/demoDb2', {useNewUrlParser: true, useUnifiedTopology: true});


// User.create({
//     email: 'dibby@aol.com',
//     name: 'Dibby',
// });

// make post independently of user and then find a user to associate it to
// Post.create({
//     title: 'How to Play the Drums',
//     content: 'BISH BASH BOSH tiktiktik'
// // callback for Post.create()
// }, (err, newPost)=> {
// // callback for User.findOne()
//     User.findOne({email: 'dibby@aol.com'}, (err, foundUser)=> {
//         if(err){
//             console.log(err);
//         }
//         else{
//             foundUser.posts.push(newPost);
// // callback for foundUser.save()
//             foundUser.save((err, data)=>{
//                 if(err){
//                     console.log(err);
//                 }
//                 else {
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });

// we want to see the whole post not just an ID
// find and populate all posts for that user by executing a SQL query via mongoose
User.findOne({email: 'dibby@aol.com'}).populate('posts').exec((err, foundUser)=> {
    if(err){
        console.log(err);
    }
    else{
        console.log(foundUser);
    }
});




