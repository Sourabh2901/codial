const User = require('../models/user');

module.exports.profile = function(req,res){
    res.render('user_profile',{
       title : "user profile" 
    });
}

//rendering the Login/signin page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    res.render('user_sign_in',{
        title : "Codieal | sign In"
    });
}

//rendering the signup/register page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    res.render('user_sign_up',{
        title : "Codeial | sign Up"
    });
}

//get the signup data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user while sign in up');
                    return;
                }
                // console.log("hello");
                return res.redirect('/users/sign-in');
            });
        }else{
            console.log("same email Id");
            return res.redirect('back');
        }
    });
}

//create the session
module.exports.createSession = function(req,res){
    res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}