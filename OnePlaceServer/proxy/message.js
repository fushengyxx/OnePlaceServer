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
        getMessageRelations(message, callback);
    });
};

/*
 * type
 * 1 like: xx like your story，喜欢
 * 2 comment: xx comment your story 评论
 * 3 reply: xx reply your comment in xxx story 在评论中回复
 * 4 follow: xx follow you 关注
 * 5 @: xx @ you 艾特
 */
var getMessageRelations = exports.getMessageRelations = function (message, callback){
    if(message.type == '1' || message.type == '2' || message.type == '3' || message.type == '5') {
        var ep = new EventProxy();
        ep.fail(callback);

        ep.assign('author', 'story', 'comment', function(author, story, comment){
            message.author_id = author;
        });
    }
};