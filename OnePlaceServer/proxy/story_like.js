/**
 * Created by fushengyxx on 16/5/26.
 */
var EventProxy = require('eventproxy');
var models     = require('../models');
var StoryLike      = models.StoryLike;

/**
 * 根据user_id获取该用户喜欢的所有故事
 * @param userid
 * @param callback
 */
exports.getStoryLikeByUser = function(userid, callback) {
    StoryLike.findOne({'user_id': userid}, callback);
};
