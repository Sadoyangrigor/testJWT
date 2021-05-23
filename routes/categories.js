var express = require('express');
var router = express.Router();
var auth = require('../auth')
var querys = require('../querys/querys')

router.get('/getAll', function(req, res, next) {
    querys.findAllByFieldsPromise('categories',['id','name'])
        .then((data)=>{
            res.status(200).json({ error: false ,data : {categories : data}});
        })
        .catch((error)=>{
            res.status(200).json({ error: true ,errorMsg : 'bla bla bla'});
        })
});


router.post('/create',auth.authenticateToken, function(req, res, next) {

    let checkInfo = checkInsertValidation(req.body)
    if(!checkInfo.error){

        querys.insert2vPromise('categories',checkInfo.data)
            .then(()=>{
                res.status(200).json({ error: false });
            })
            .catch((error)=>{
                res.status(400).json({ error: true ,errorMsg : '1bla bla bla'});
            })
    }else{
        res.status(400).json({ error: true ,errorMsg : '2bla bla bla'});
    }

});


router.post('/edit',auth.authenticateToken, function(req, res, next) {

    let checkInfo = checkUpdateValidation(req.body)
    if(!checkInfo.error){

        querys.updatePromise('categories',checkInfo.data)
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


router.post('/delete',auth.authenticateToken, function(req, res, next) {

    let checkInfo = checkDeleteValidation(req.body)
    if(!checkInfo.error){

        querys.deletePromise('categories',checkInfo.data)
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




checkInsertValidation = data => {
    // here we check if inserting  datas ( name ) is valid or not.
    // we will check name length, existing of symbols,existing of numbers and letters .......

    // if(everything is ok){
    return {
        error: false,
        data : {
            name : data.name
        }
    }

    // }else{
    //      return {
    //          error: true,
    //          msg : "bla bla bla"
    //      }
    // }
}

checkUpdateValidation = data => {
    // here we check if inserting  datas ( id and name ) are valid or not.
    // we will check name length, existing of symbols,existing of numbers and letters .......

    // if(everything is ok){
    return {
        error: false,
        data : {
            where : {
                id : data.id,
            },
            values : {
                name : data.name
            }
        }
    }

    // }else{
    //      return {
    //          error: true,
    //          msg : "bla bla bla"
    //      }
    // }
}

checkDeleteValidation = data => {
    // here we check if inserting categories datas ( id  ) is valid or not.
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