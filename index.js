const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')
var methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(methodOverride('X-Method-Override')); 

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

// Configuring the database
const dbConfig = require('./config/database.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

require('./route/route')(app);

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("connexion avec succes");    
}).catch(err => {
    console.log('erreur de connexion', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to simplon test unitaire."});
});

app.listen(8080, () => {
    console.log("Server demarer 8080");
});


module.export = app;