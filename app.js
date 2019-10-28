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
        {name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=649&q=80'},
        {name: 'Rodborough Fort', image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'},
        {name: 'WOMAD Festival', image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80'}
    ];

    res.render('campgrounds', {campgrounds: campgrounds});
});


//start the node server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Yelp Camp has started!');
});