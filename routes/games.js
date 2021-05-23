var express = require('express');
var router = express.Router();
var auth = require('../auth')
var querys = require('../querys/querys')

router.get('/getAll', function(req, res, next) {
    querys.findAllGames()
        .then((data)=>{
            res.status(200).json({ error: false ,data : {games : data}});
        })
        .catch((error)=>{
            res.status(200).json({ error: true ,errorMsg : '44bla bla bla'});
        })
});



router.post('/create',auth.authenticateToken, function(req, res, next) {
    let checkInfo = checkGamesInsertValidation(req.body)
    if(!checkInfo.error){
        console.log('checkInfo.data',checkInfo.data)
        querys.insert2vPromise('games',checkInfo.data)
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



router.post('/edit',auth.authenticateToken, function(req, res, next) {
    let checkInfo = checkGamesUpdateValidation(req.body)
    if(!checkInfo.error){

        querys.updatePromise('games',checkInfo.data)
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

router.post('/delete',auth.authenticateToken, function(req, res, next) {

    // console.log('..............................',req.user)

    let checkInfo = checkGamesDeleteValidation(req.body)
    if(!checkInfo.error){

        querys.deletePromise('games',checkInfo.data)
            .then(()=>{
                res.status(200).json({ error: false });
            })
            .catch((error)=>{
                res.status(400).json({ error: true ,errorMsg : 'bla bla bla'});
            })
    }else{
        res.status(400).json({ error: true ,errorMsg : 'bla bla bla'});
    }

});

module.exports = router;

checkGamesInsertValidation = data => {
    // here we check if inserting  datas ( cat_id ,name , description , creator_company , legal_age  ) is valid or not.
    // we will check all datas  length, existing of symbols,existing of numbers and letters .......

    // for cat_id we will check if its valid categorie in our DB

    // if(everything is ok){
    return {
        error: false,
        data : {
            cat_id : data.cat_id,
            name : data.name,
            description : data.description,
            creator_company : data.creator_company,
            price : data.price,
            legal_age : data.legal_age
        }
    }

    // }else{
    //      return {
    //          error: true,
    //          msg : "bla bla bla"
    //      }
    // }
}

checkGamesUpdateValidation = data => {

    let result = {}

    if(typeof data.cat_id !== "undefined")
        result.cat_id = data.cat_id

    if(typeof data.name !== "undefined")
        result.name = data.name

    if(typeof data.description !== "undefined")
        result.description = data.description

    if(typeof data.price !== "undefined")
        result.price = data.price

    if(typeof data.creator_company !== "undefined")
        result.creator_company = data.creator_company

    if(typeof data.legal_age !== "undefined")
        result.legal_age = data.legal_age

    // here we check if updating  datas ( cat_id ,name , description , creator_company , legal_age  ) is valid or not.
    // we will check all datas  length, existing of symbols,existing of numbers and letters .......

    // for cat_id we will check if its valid categorie in our DB

    // if(everything is ok){


    return {
        error: false,
        data : {
            where : {
                id : data.id
            },
            values : result
        }
    }

    // }else{
    //      return {
    //          error: true,
    //          msg : "bla bla bla"
    //      }
    // }
}


checkGamesDeleteValidation = data => {
    // here we check if deleting games datas ( id  ) is valid or not.
    // we will check name length, existing of symbols,existing of numbers and letters .......

    // if(everything is ok){
    return {
        error: false,
        data : {
            id : data.id,
        }
    }

    // }else{
    //      return {
    //          error: true,
    //          msg : "bla bla bla"
    //      }
    // }
}