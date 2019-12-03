const mongoose = require('mongoose');
// DB conn string
mongoose.connect('mongodb://localhost/cats', {useNewUrlParser: true, useUnifiedTopology: true});

// waht does a cat look like?
const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// mongo will make a collection called cats 
const Cat = mongoose.model('Cat', catSchema);

// keep mongod running in the background

// add a new cat to the DB
// let nobbyTheCat = new Cat({
//         name: 'Mrs Norris',
//         age: 15,
//         temperament: 'Calculating'
//     });

// save Nobby to the DB and add a callback function to check for errors
// nobbyTheCat.save(function(err, cat){
//     if(err){
//         console.log('Something has gone wrong!');
//     }
//     else{
//         console.log(`${cat} has been successfully added`);
//     }
// });  

// another way of adding a cat: new and save all at once, plus callback function to check if it's succeeded
// Cat.create({
//     name: 'Fluffwidge',
//     age: 2,
//     temperament: 'Shy'
// }, function(err, cat){
//     if(err){
//         console.log('Sorry but this cat couldn\'t be added!');
//     }
//     else{
//         console.log(`${cat.name} has been added to the DB`);
//     }
// });

// retrieve all cats from the DB
Cat.find({}, function(err, catsFound){
    if(err){
        console.log('Can\'t find that cat soz!');
        console.log(err);
    }
    else{
        console.log(`I have found ${catsFound.length} cats: ${catsFound}`);
        console.log(`The first cat is ${catsFound[0].name}`);
    }


});


