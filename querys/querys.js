const db = require('./connection');

let findAllByFieldsPromise = function(table,filds){
    return new Promise(function (resolve, reject) {
        let prepareSql = 'SELECT ' +  filds.join(' , ') + ' FROM '+table+'';
        db.query(prepareSql, function (error, result, fields) {
            if (error){
                // let errorData = {
                //     code:error.code,
                //     errno:error.errno,
                //     sqlMessage:error.sqlMessage,
                //     devData:{
                //         queryFunction:"findAllByFieldsPromise",
                //         table:table,
                //         fields:fields,
                //         date:new Date()
                //     }
                // }
                //here we can insert to our log table or write into log file

                reject(new Error("Sql error findAllByFieldsPromise"))
            }else{
                resolve(result)
            }
        })
    })
}


function insert2vPromise(table,post){
    return new Promise(function (resolve, reject) {
        let prepareSql = 'INSERT INTO '+table+' SET ?';
        db.query(prepareSql, post, function (error, results, fields) {
            if (error){
                var errorData = {
                    code:error.code,
                    errno:error.errno,
                    sqlMessage:error.sqlMessage,
                    devData:{
                        queryFunction:"insert2vPromise",
                        table:table,
                        params:post,
                        date:new Date()
                    }
                }

                //here we can insert to our log table or write into log file

                reject(new Error("Sql error insert2vPromise"))
            }else{
                resolve(results)
            }
        });
    })
}


function updatePromise(table,post){
    return new Promise(function (resolve, reject) {
        let val = [];
        for(let key in post.values){
            val.push("`"+key +"`="+db.escape(post.values[key]));
        }
        var whereVal = [];
        for(let key in post.where){
            whereVal.push("`"+key+"`" +"="+db.escape(post.where[key]));
        }
        let prepareSql = "UPDATE "+ table + " SET "+val.toString()+" WHERE "+whereVal.join(' AND ')+"";
        db.query(prepareSql, post, function (error, results, fields) {
            if (error){
                // var errorData = {
                //     code: error.code,
                //     errno: error.errno,
                //     sqlMessage: error.sqlMessage,
                //     devData: {
                //         queryFunction: "updatePromise",
                //         table: table,
                //         params: post,
                //         date: new Date()
                //     }
                // }
                //here we can insert to our log table or write into log file

                reject(new Error("Sql error updatePromise"));
            }else{
                resolve(results)
            }
        });
    })
}

var deletePromise = function(table,post){
    return new Promise(function (resolve, reject) {
        let val = [];
        for (let key in post) {
            if (post[key] !== "NULL") {
                val.push("`" + key + "`=" + db.escape(post[key]));
            } else {
                val.push("`" + key + "` IS NULL");
            }
        }
        let prepareSql = 'DELETE FROM ' + table + ' WHERE ' + val.join(' AND ') + '';
        db.query(prepareSql, post, function (error, result, fields) {
            if (error) {
                // var errorData = {
                //     code: error.code,
                //     errno: error.errno,
                //     sqlMessage: error.sqlMessage,
                //     devData: {
                //         queryFunction: "deletesPromise",
                //         table: table,
                //         params: post,
                //         date: new Date()
                //     }
                // }
                //here we can insert to our log table or write into log file

                reject(new Error("Sql error deletePromise"));
            } else {
                resolve(result)
            }
        });
    })
}


var findAllGames = function(countryId,langId){
    return new Promise(function (resolve, reject) {
        var prepareSql = 'SELECT ' +
            ' games.id, games.cat_id ,games.name,games.description ,games.creator_company,games.legal_age,games.create_data,games.price,' +
            ' categories.name as catName' +
            ' FROM games ' +
            ' JOIN categories ON categories.id = games.cat_id ';
        db.query(prepareSql, function (error, result, fields) {
            if (error) {
                // var errorData = {
                //     code: error.code,
                //     errno: error.errno,
                //     sqlMessage: error.sqlMessage,
                //     devData: {
                //         queryFunction: "findAllStates",
                //         date: new Date()
                //     }
                // }
                //here we can insert to our log table or write into log file

                reject(new Error("Sql error findAllGames"));
            } else {
                resolve(result)
            }
        });
    })
}


var findAllOrders = function(countryId,langId){
    return new Promise(function (resolve, reject) {
        var prepareSql = 'SELECT ' +
            ' orders.user_name ,orders.create_data,' +
            ' games.name as gameName' +
            ' FROM orders ' +
            ' JOIN games ON orders.games_id = games.id';
        db.query(prepareSql, function (error, result, fields) {
            if (error) {
                // var errorData = {
                //     code: error.code,
                //     errno: error.errno,
                //     sqlMessage: error.sqlMessage,
                //     devData: {
                //         queryFunction: "findAllStates",
                //         date: new Date()
                //     }
                // }
                //here we can insert to our log table or write into log file

                reject(new Error("Sql error findAllOrders"));
            } else {
                resolve(result)
            }
        });
    })
}


module.exports.findAllByFieldsPromise = findAllByFieldsPromise;
module.exports.insert2vPromise = insert2vPromise;
module.exports.updatePromise = updatePromise;
module.exports.deletePromise = deletePromise;
module.exports.findAllGames = findAllGames;
module.exports.findAllOrders = findAllOrders;
