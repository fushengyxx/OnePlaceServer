/**
 * Created by fushengyxx on 16/5/20.
 */
var config = require('../config');
var tools = require('../common/tools');
var eventproxy = require('eventproxy');
var User = require('../proxy').User;
console.log("1 yes");

exports.login = function (req, res, next) {
    // var account = req.body.account;
    // var password = req.body.password;
    console.log("2 yes");
    var account = "fusheng";
    var password = "123";
    var ep = new eventproxy();
    console.log(account);
    console.log("3 yes");

    ep.fail(next);

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

};