const express        = require('express');
const app            = express();
const cookieParser   = require('cookie-parser');
const port           = 8000;
const expressLayouts = require('express-ejs-layouts');
const db             = require('./config/mongoose');
const session        = require('express-session');
const passport       = require('passport');
const passportLocal  = require('./config/passport-local-strategy');
const MongoStore     = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}));
 
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

// setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the seession cookie in db
app.use(session({
    name : 'codial',
    //TODO change the secrey before deployment in production mode
    secret : 'blahsomething',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge :(1000 * 60 *100)
    },
    store: new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        },function(err){
            console.log(err || 'connect mongodb setup');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//Use Express Router file--------By default require('./routes') fetches index.js
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});