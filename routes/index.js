//2nd page of our application

//here we have made another express instant but in system their exist only one instant 
//which is made earlier (in index.js file)

const express           = require('express');
const router            = express.Router();
const homeController    = require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/users',require('./users'));

//  router.use('/exa',require('./exa'));

console.log("router loaded");
module.exports = router;
