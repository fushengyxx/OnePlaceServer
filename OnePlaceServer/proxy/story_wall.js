/**
 * Created by fushengyxx on 16/5/26.
 */
var EventProxy = require('eventproxy');
var models     = require('../models');
var tools = require('../common/tools');
var StoryWall      = models.StoryWall;

/**
 * 给followers中的所有用户的故事墙添加新故事
 * @param story_id
 * @param follower
 * @param dateFormat
 * @param callback
 */
exports.newStoryWall = function (story_id, follower, dateFormat, callback) {
    StoryWall.findOne({'user_id': follower.follower_id, 'story_date': dateFormat}, function(err, storywall){
        if (err) {
            return callback(err);
        }

        if (storywall == null) {
            storywall = new StoryWall();
            storywall.user_id = follower.follower_id;
            storywall.story_date = dateFormat;
            storywall.stories[0] = story_id;
            storywall.save();
        } else {
            storywall.stories.push(story_id);
            storywall.save();
        }
        return callback(null, storywall);
    });
};

exports.getStoryWallBuyUserId = function(userId, callback) {
    StoryWall.findOne({'user_id': userId}, callback);

};