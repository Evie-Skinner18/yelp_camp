const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

// root route
app.get('/', (req, res)=> {
    res.render('landing');
});

// allow user to READ all camp grounds. This is an array for now but will be rows in a MongoDB later
app.get('/campgrounds', (req, res)=> {
    let campgrounds = [
        {name: 'Salmon Creek', image: ''},
        {name: 'Rodborough Fort', image: ''},
        {name: 'WOMAD Festival', image: ''}
    ];


});


//start the node server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Yelp Camp has started!');
});