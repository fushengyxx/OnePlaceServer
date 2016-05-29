/**
 * Created by fushengyxx on 16/5/20.
 */
var config = require('../config.js');
var tools = require('../common/tools');
var EventProxy = require('eventproxy');
var User = require('../proxy').User;
//var UserModel = require('../models').User;
var utitilty = require('utility');
//var util = require('util');

exports.login = function (req, res, next) {
    var account = req.body.account;
    var password = req.body.password;
    console.log(account + ', ' + password);
    var ep = new EventProxy();
    ep.fail(next);

    if(!account || !password) {
        res.json({resultCode: '信息不完整!'});
        console.log("信息不完整!");
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

exports.reg = function(req, res, next) {
    var account = req.body.account;
    var password = req.body.password;
    var name = req.body.name;
    console.log("new user!" + account + ", " + password);
    var ep = new EventProxy();
    ep.fail(next);

    User.getUserByAccount(account, function(err, user){
        if(err) {
            console.log("err");
            return next(err);
        }

        if(user != null) {
            res.json({resultCode: '该用户名已被注册!'});
            console.log("该用户名已被注册!");
            return;
        }

        User.newUser(account, password, name, function(err, user){
            if(err) {
                console.log("err");
                return next(err);
            }
            var data = {resultCode: 'success', user: user};
            var userString= JSON.stringify(data);

            res.send(userString);
        });
    });

};

/**
 * 根据user_id获取故事列表,即故事墙上的信息
 */
exports.findStoryWall = function(req, res, next) {

};