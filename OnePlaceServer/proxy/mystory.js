/**
 * Created by fushengyxx on 16/5/26.
 */
var EventProxy = require('eventproxy');
var models     = require('../models');
var MyStory      = models.MyStory;

/**
 * 根据storyID获取mystory
 *
 */
exports.getMyStoryById = function(id, callback){
    MyStory.findOne({_id: id}, callback);
};

/**
 * 根据user_id查找该用户的story
 * @param user_id
 * @param callback
 */
exports.getMyStoryByUser = function(userid, callback) {
    //MyStory.findOne({'user_id': new RegExp('^'+_user_id+'$', "i")}, callback);
    MyStory.findOne({'user_id': userid}, callback);
};
