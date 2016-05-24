/**
 * Created by fushengyxx on 16/5/20.
 */
var config = require('../config.js');
var tools = require('../common/tools');
var eventproxy = require('eventproxy');
var User = require('../proxy').User;
var UserModel = require('../models').User;
var utitilty = require('utility');
//var util = require('util');
//var db = require('../database/db')

console.log("1 yes");

//exports.login = function (req, res, next) {
    // var account = req.body.account;
    // var password = req.body.password;
    console.log("2 yes");
    var account = "phoesh";
    var password = "123";
    var name = "Phoes Huang";
    var sex = "male";
    var birthday = "1992-03-02 04:27";
    var mail = "123@123.com";
    var phone = "2131616156";
    var ep = new eventproxy();
User.getUserByAccount(account, function (err, user){
    if (err) {
        return next(err);
    }
    if(!user){
        return console.log(user + " not exists");
    }
    console.log(user);
    console.log("3 yes");
})

    // User.NewUser(account, password, name, sex, birthday, mail, phone, function (err, user){
    //     if (err) {
    //         console.log("err");
    //        // return next(err);
    //     }
    //     console.log("insert");
    //
    // })

    //ep.fail(next);

    if(!account || !password) {
        res.status(422); // is null
       // return res.render('login/fail', {error: '信息不完整.'});
    }

    var getUser;
    getUser = User.getUserByAccount;

    ep.on('login_error', function (login_error) {
        res.status(403);
       // return res.render('login/fail', {error: '用户名或密码错误.'});
    });

//};
