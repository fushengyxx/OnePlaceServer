/**
 * Created by fushengyxx on 16/6/9.
 */
var config = require('../config.js');
var tools = require('../common/tools');
var EventProxy = require('eventproxy');
var models = require('../models');
var User = require('../proxy').User;
var Story = require('../proxy').Story;
var MyStory = require('../proxy').MyStory;
var StoryWall = require('../proxy').StoryWall;
var Follow = require('../proxy').Follow;
var StoryLike = require('../proxy').StoryLike;

/**
 * 我的故事
 * @param req
 * @param res
 * @param next
 */
exports.findMyStories = function (req, res, next) {
    var user_id = req.body.user_id;
    MyStory.getMyStoryByUser(user_id, function(err, mystory){
        if (err) {
            console.log("err");
            return next(err);
        }

        if (mystory == undefined || mystory == null) {
            res.json({resultCode: "还没有故事，快去写故事吧。"});
        } else {
            var stories = mystory.stories;
            if (stories == null || stories.length == 0) {
                res.json({resultCode: "还没有故事，快去写故事吧。"});
            } else {
                Story.getStoriesByIdArray(stories, function(err, fullstories){
                    var data = {resultCode: 'success', fullstories: fullstories};
                    var myStoryString= JSON.stringify(data);

                    res.send(myStoryString);
                });
            }
        }
    });
};
