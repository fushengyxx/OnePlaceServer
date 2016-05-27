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

exports.login = function (req, res, next) {
    var account = req.body.account;
    var password = req.body.password;
    console.log(account + ', ' + password);
    var ep = new eventproxy();
    ep.fail(next);

    if(!account || !password) {
        res.json({resultCode: '信息不完整!'});
        console.log("信息不完整");
        return;
    }

    User.getUserByAccount(account, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(user + " 用户不存在!");
            res.json({resultCode: '用户不存在!'});
            return;
        }

        var password_db = user.password;
        // ep.on('login_error', function (login_error) {
        //     res.json({resultCode: '用户名或密码错误!'});
        //     return;
        // });
        // tools.bcompare(password, password_db, ep.done(function(bool){
        //     if(!bool) {
        //         return ep.emit('login_error');
        //     }
        // }));

        if (password != password_db){
            console.log("用户名或密码错误!");
            res.json({resultCode: '用户名或密码错误!'});
            return;
        }

        console.log(user);
        var data = {resultCode: 'success', user: user};
        var userString= JSON.stringify(data);

        res.send(userString);
    });

};
/*
 * Register New user account
 */
exports.reg = function (req, res, next) {
    var account = req.body.account;
    User.getUserByAccount(account, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(user + " 用户不存在!");
            // res.json({resultCode: '用户不存在!'});
           var Nuser = {
               account : req.body.account,
               password : req.body.password,
               name : req.body.name,
               sex : req.body.sex,
            birthday : req.body.birthday,
            mail : req.body.mail,
            phone : req.body.phone
           };
            console.log(Nuser.account+' '+Nuser.name);
            var newUser = new UserModel(Nuser);
            newUser.save(function (err, data){
                if(err){
                    console.log('error');
                }
                else {
                    //res.json(data);
                }
            });

            //var Newuser = new UserModel(user);

            // User.NewUser(account, password, name, sex, birthday, mail, phone, function (err, data) {
            //     if (err) {
            //         console.log("err");
            //         //res.json(err);
            //         return;
            //     }
            //     console.log("insert");
            //
            // });

            User.getUserByAccount(account, function (err, user) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    console.log(user + " 註冊失敗!");

                    return res.json({resultCode: '註冊失敗!'});
                }
                else return res.json({resultCode: '註冊成功!'});
            });
        }
        else {
            var data = {resultCode: '用戶存在, 無法註冊', user: user};
            var userString= JSON.stringify(data);
            console.log("用戶存在, 無法註冊");
            res.send(userString);
        }

    });

};

