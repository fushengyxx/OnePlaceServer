/**
 * Created by fushengyxx on 16/5/26.
 */
var EventProxy = require('eventproxy');
var models     = require('../models');
var StoryWall      = models.StoryWall;

/**
 * 给followers中的所有用户的故事墙添加新故事
 * @param story_id
 * @param followers
 * @param callback
 */
exports.newStoryWall = function (story_id, followers, callback) {
    for(var i = 0; i < followers.length; i++) {
        StoryWall.findOne({'user_id': followers[i].follower_id, 'story_date': }, callback);
    }
};