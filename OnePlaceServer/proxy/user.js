/**
 * Created by fushengyxx on 16/5/21.
 */

var models = require('../models');
var User = models.User;
var uuid = require('node-uuid');

/*
 * login
 * find user by account
 */
exports.getUserByAccount = function (account, callback) {
    User.findOne({'account': new RefExp('^' + account + '$', "i")}, callback);
};