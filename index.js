const express        = require('express');
const app            = express();
const cookieParser   = require('cookie-parser');
const port           = 8000;
const expressLayouts = require('express-ejs-layouts');
const db             = require('./config/mongoose');

//for reading through the post request
app.use(express.urlencoded());

//cookie-parser is for reading and writting into the cookies
app.use(cookieParser());

//Including assets folder where css,js and html files will be present
app.use(express.static('./assets'));

//we need to put this layout line before routes(line 10) becoz before loading any route it should know that these route belongs to some sort of layouts
 app.use(expressLayouts);

//extract style and layout from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

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