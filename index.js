const express = require('express');
const app     = express();
const port    = 8000;

//Use Express Router file--------By default require('./routes') fetches index.js
app.use('/',require('./routes'));

// setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});