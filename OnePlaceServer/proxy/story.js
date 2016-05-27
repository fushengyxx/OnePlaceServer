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
exports.newAndSave = function(title, content, callback){
    var story = new Story();
    story.title = title;
// var front_image = ;--------------------------------
    story.content = content;
    story.create_time = new Date();

    console("7777777");
    //story.user_id = user_id;
    // location
    //story.location = location;

    // story.location.lot = location.lot;
    // story.location.lat = location.lat;
    // story.location.country = location.country;
    // story.location.province = location.province;
    // story.location.city = location.city;
    // story.location.dist = location.dist;
    // story.location.street = location.street;
    // count
    // story.browse_count = browse_count;
    // story.like_count = like_count;
    // story.comment_count = comment_count;
    //
    // story.status = status;
    // story.type = type;
    //
    // // calculate story's value
    // story.value = value;

    story.save(callback);
};
// exports.newAndSave = function(title, content, user_id, location, browse_count, like_count, comment_count, status, type, value, callback){
//     var story = new Story();
//     story.title = title;
// // var front_image = ;--------------------------------
//     story.content = content;
//     story.create_time = new Date();
//     story.user_id = user_id;
//     // location
//     story.location = location;
//     // story.location.lot = location.lot;
//     // story.location.lat = location.lat;
//     // story.location.country = location.country;
//     // story.location.province = location.province;
//     // story.location.city = location.city;
//     // story.location.dist = location.dist;
//     // story.location.street = location.street;
//     // count
//     story.browse_count = browse_count;
//     story.like_count = like_count;
//     story.comment_count = comment_count;
//
//     story.status = status;
//     story.type = type;
//
//     // calculate story's value
//     story.value = value;
//
//     story.save(callback);
// };