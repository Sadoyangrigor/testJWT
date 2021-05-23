var express = require('express');
var router = express.Router();
var auth = require('../auth')
var querys = require('../querys/querys')

router.get('/getAll', function(req, res, next) {
    querys.findAllOrders()
        .then((data)=>{
            res.status(200).json({ error: false ,data : {games : data}});
        })
        .catch((error)=>{
            res.status(200).json({ error: true ,errorMsg : '44bla bla bla'});
        })
});

router.post('/create',auth.authenticateToken, function(req, res, next) {
    let checkInfo = checkOrderInsertValidation(req.body)
    if(!checkInfo.error){
        querys.insert2vPromise('orders',checkInfo.data)
            .then(()=>{
                res.status(200).json({ error: false });
            })
            .catch((error)=>{
                res.status(400).json({ error: true ,errorMsg : '2bla bla bla'});
            })
    }else{
        res.status(400).json({ error: true ,errorMsg : '1bla bla bla'});
    }

});

module.exports = router;

checkOrderInsertValidation = data => {
    // here we check if inserting  datas ( user_name ,games_id   ) is valid or not.
    // we will check all datas  length, existing of symbols,existing of numbers and letters .......

    // for games_id we will check if its valid game in our DB

    // if(everything is ok){
    return {
        error: false,
        data : {
            user_name : data.username,
            games_id  : data.games_id
        }
    }

    // }else{
    //      return {
    //          error: true,
    //          msg : "bla bla bla"
    //      }
    // }
}