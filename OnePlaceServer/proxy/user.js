/**
 * Created by fushengyxx on 16/5/21.
 */

var models = require('../models');
var User = models.User;
var fs = require('fs');
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

exports.newUser = function (nuser, callback) {
    var user = new User();
    user.account = nuser.account;
    user.password = nuser.password;
    user.name = nuser.name;
    //user.sex = nuser.sex;
    user.save(callback);
};

exports.imgSave = function (img, callback) {
    var user = new User();
    user.account = img.account;
    user.image.imageData = fs.readFileSync(img.image.imageData);
    user.image.contentType = img.image.imageData;
    user.save(callback);
};