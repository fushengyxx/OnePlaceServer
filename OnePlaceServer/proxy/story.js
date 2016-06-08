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
 * ids
 * @param ids
 * @param callback
 */
exports.getStoriesByIdArray = function(ids, callback){
    Story.find().where('_id').in(ids).exec(callback);
};

exports.getHotStory = function(callback){
    Story.find(null, null, {sort: '-value'}, callback);
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

       // var ep = new EventProxy();
        // ep.after('story_ready', stories.length, function(){
        //     stories = _.compact(stories); // 删除不合格的story
        //     return callback(null, stories);
        // });
        //ep.fail(callback);
    });

};

/**
 * 新建故事
 */
exports.newStory = function(body, callback){
    User.getUserById(body.user_id, function(err, user){
        if(err){
            return callback(err);
        }

        if(user == null || user == ""){
            return callback(err);
        }

        var story = new Story();
        story.title = body.title;
// var front_image = ;--------------------------------
        story.content = body.content;
        story.create_time = tools.formatDate(new Date(), false);
        story.location = body.location;
        story.user_id = body.user_id;
        story.user_name = user.name;
        story.user_image = user.image.imagePath;
        story.status = body.status;
        story.type = body.type;
        story.value = 10; // 新写的故事value设置为10
        story.save(callback);

        user.story_count += 1;
        // 参与的地点
        user.join_place_count += 1;
        user.save();
    });
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