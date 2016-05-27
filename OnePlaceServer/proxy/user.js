/**
 * Created by fushengyxx on 16/5/21.
 */

var models = require('../models');
var User = models.User;

/*
 * login
 * find user by account
 */
 exports.getUserByAccount = function (_account, callback) {
     User.findOne({'account': new RegExp('^'+_account+'$', "i")}, callback);
 };

/**
 * 根据id查找用户
 *
 */
exports.getUserById = function(id, callback) {
    if (!id) {
        return callback();
    }
    User.findOne({_id: id}, callback);
};

/*
 * find user by keywords.
 */
exports.getUserByKey = function (key, opt, callback) {
    User.find(key, '', opt, callback);
};

// exports.NewUser = function (account, password, name, sex, birthday, mail, phone, callback) {
//     var user = new User();
//     user.account = account;
//     user.password = password;
//     user.name = name;
//     user.sex = sex;
//     user.birthday = birthday;
//     user.mail = mail;
//     user.phone = phone;
//
//     user.save(callback);
// };