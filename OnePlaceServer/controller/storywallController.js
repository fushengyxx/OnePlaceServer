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
 * 获取所有关注的人的故事墙，即故事墙页面
 * @param req
 * @param res
 * @param next
 */
exports.getStoryWall = function(req, res, next) {
    var user_id = req.body.user_id;
    var story_date = req.body.story_date;
    //var date = new Date();
    //var dateFormat = tools.endOfDay(story_date); // 当天00:00:00
    var ep = new EventProxy();
    ep.fail(next);

    StoryWall.getStoryWallBuyUserId(user_id, story_date, function(err, storywall){
        if(err){
            return callback(err);
        }

        if (storywall == null) {
            res.json({resultCode : '暂时没有关注的人。'});
        } else {
            var stories = storywall.stories;
            if (stories == null || stories == "") {
                res.json({resultCode : '暂时没有故事。'});

            } else {
                Story.getStoriesByIdArray(stories, function(err, fullstories){
                    var data = {resultCode: 'success', fullstories: fullstories, wallowner_id: storywall.user_id};
                    var storyWallString= JSON.stringify(data);

                    res.send(storyWallString);
                });
            }
        }
    });
};

/**
 * 热门故事，根据故事value排序
 * @param req
 * @param res
 * @param next
 */
exports.findHotStory = function (req, res, next) {
    Story.getHotStory(function(err, stories){
        var data = {resultCode: 'success', hotstories: stories};
        var storyString= JSON.stringify(data);

        res.send(storyString);
    });
};

/**
 * 热门地点
 * @param req
 * @param res
 * @param next
 */
exports.findHotPlace = function (req, res, next) {

};

/**
 * 根据标题搜索
 * @param req
 * @param res
 * @param next
 */
exports.findByTitle = function (req, res, next) {
    var title = req.body.title;

    Story.queryByTitle(title, function(err, stories){
        if (err) {
            console.log("err");
            return next(err);
        }

        var data = {resultCode: 'success', stories: stories};
        var storyString= JSON.stringify(data);

        res.send(storyString);
    });
};
