/**
 * Created by fushengyxx on 16/5/26.
 */
var EventProxy = require('eventproxy');
var models     = require('../models');
var Story      = models.Story;
var User       = require('./user');
var tools      = require('../common/tools');
var _          = require('lodash');

/**
 * 根据storyID获取story
 *
 */
exports.getStoryById = function(id, callback){
    Story.findOne({_id: id}, callback);
};

/**
 * 根据查询条件,获取故事列表
 *
 */
exports.getStoryByQuery = function(query, opt, callback){
    query.deleted = false;
    Story.find(query, {}, opt, function(err, stories){
        if(err) {
            return callback(err);
        }
        if (stories.length == 0){
            return callback(null, []);
        }

        var ep = new EventProxy();
        // ep.after('story_ready', stories.length, function(){
        //     stories = _.compact(stories); // 删除不合格的story
        //     return callback(null, stories);
        // });
        ep.fail(callback);

    });

};

/**
 * 新建故事
 */
exports.newStory = function(title, content, user_id, location, status, type, callback){
    var story = new Story();
    story.title = title;
// var front_image = ;--------------------------------
    story.content = content;
    story.create_time = new Date();
    story.location = location;
    story.user_id = user_id;
    story.value = 10; // 新写的故事value设置为10

    story.save(callback);
};

/**
 * 新增评论
 */
// exports.newComment = function(story_id, comment, callback) {
//     var story = new Story();
//     story.comment = comment;
//     story.comment_count += 1;
//     story.value += 2; //评论加2
//
//     story.save(callback);
// };