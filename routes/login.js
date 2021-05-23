var express = require('express');
var router = express.Router();
var auth = require('../auth')


router.post('/', function(req, res, next) {

    let checkResult = checkLoginParams(req.body)

    if(!checkResult.error){

        // here will be select from db -> users table
        // 1489 => is users public id in database

        let token = auth.generateAccessToken({user_id : "1489"})

        res.status(200).json({ error: false ,token : token});
    }else{
        res.status(400).json({ error: true ,errorMsg : 'bla bla bla'});
    }


});


module.exports = router;


checkLoginParams = data => {
    // here we check if Login datas ( username and password ) are valid or not.
    // we will check username and password undefined , types, lengths, existing of symbols,existing of numbers and letters .......

    // if(everything is ok){
    return {
        error: false
    }

    // }else{
    //      return {
    //          error: true,
    //          msg : "bla bla bla"
    //      }
    // }
}