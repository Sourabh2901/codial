module.exports.profile = function(req,res){
    res.end('<h1>From User_controller</h1>');
}

module.exports.name  = function(req,res){
    res.end('<h1>From user Controller -> user/name route</h1>')
}