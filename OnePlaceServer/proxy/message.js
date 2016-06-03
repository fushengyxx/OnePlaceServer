/**
 * Created by fushengyxx on 16/5/26.
 */
var EventProxy = require('eventproxy');
var models     = require('../models');
var Message      = models.Message;

/*
 * 根据用户的user_id, 获取未读消息的数量
 */
exports.getMessageCount = function(user_id, callback) {
    Message.count({
        user_id : user_id, has_read : false
    }, callback);
};

/*
 * 根据消息Id,获取消息
 */
exports.getMessageById = function (id, callback) {
    Message.findOne({_id: id}, function (err, message) {
        if(err)
            return callback(err);
    });
};