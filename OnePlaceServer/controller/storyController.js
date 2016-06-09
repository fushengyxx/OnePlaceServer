/**
 * Created by fushengyxx on 16/5/26.
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
 *  根据story_id获取story详情
 */
exports.findStoryById = function(req, res, next) {
    var story_id = req.body.story_id;
    var ep = new EventProxy();
    ep.fail(next);

    Story.getStoryById(story_id, ep.done(function(story){
        var data = {resultCode: 'success', story: story};
        var storyString= JSON.stringify(data);

        res.send(storyString);
    }));
};


/*
 * 新增故事
 */
exports.create = function (req, res, next) {
    var ep = new EventProxy();
    ep.fail(next);

    Story.newStory(req.body, function (err, story) {
        if (err) {
            console.log("err");
            return next(err);
        }

        // 在"我的故事"中增加一条
        var user_id = story.user_id;
        var story_id = story._id;
        MyStory.getMyStoryByUser(user_id, function(err, mystory){
            if (err) {
                console.log("err");
                return next(err);
            }

            if (mystory == undefined || mystory == null) {
                mystory = new models.MyStory();
                mystory.user_id =user_id;
                mystory.stories[0] = story_id;
                mystory.save();
            } else {
                mystory.stories.push(story_id);
                mystory.save();
            }

        });

        // 在所有粉丝的"故事墙"上增加一条————————————————————————————————
        // 找到该作者的所有粉丝,返回粉丝数组
        Follow.findFollowers(user_id, function(err, followers) {
            if (err) {
                console.log("err");
                return next(err);
            }

            if(followers.length == 0) {
                //return;
            } else {
                var follower = null;
                var date = new Date();
                var dateFormat = tools.endOfDay(date); // 当天00:00:00
                for(var i = 0; i < followers.length; i++){
                    follower = followers[i];
                    StoryWall.newStoryWall(story_id, follower, dateFormat, function(err, storywall){
                        if (err) {
                            console.log("err");
                            return next(err);
                        }
                    });
                }
            }
        });

        var data = {resultCode: 'success', story: story};
        var storyString= JSON.stringify(data);
        res.send(storyString);
    });
};

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
                    var data = {resultCode: 'success', fullstories: fullstories};
                    var storyWallString= JSON.stringify(data);

                    res.send(storyWallString);
                });
            }
        }
    });
};

/**
 * 根据story_id获取故事全文，主要用来计算浏览量
 * @param req
 * @param res
 * @param next
 */
exports.getFullStoryBuyId = function(req, res, next) {
    var story_id = req.body.story_id;
    var ep = new EventProxy();
    ep.fail(next);

    Story.getStoryById(story_id, ep.done(function(story){
        story.browse_count += 1;
        story.value += 1;
        story.save();

        var data = {resultCode: 'success', story: story};
        var storyString= JSON.stringify(data);

        res.send(storyString);
    }));
}

/**
 * 喜欢故事，user 喜欢某个 story
 * @param req
 * @param res
 * @param next
 */
exports.likeStory = function(req, res, next) {
    var story_id = req.body.story_id;
    var user_id = req.body.user_id;
    var ep = new EventProxy();
    ep.fail(next);

    // ------------------------to do:不能重复喜欢----------------------------
    Story.getStoryById(story_id, ep.done(function(story){
        story.like_count += 1;
        story.value += 3;
        story.save();

    }));

    // 在"我喜欢的故事"中增加一条
    StoryLike.getStoryLikeByUser(user_id, function(err, storylike){
        if (err) {
            console.log("err");
            return next(err);
        }

        if (storylike == undefined || storylike == null) {
            storylike = new models.StoryLike();
            storylike.user_id =user_id;
            storylike.stories[0] = story_id;
            storylike.save();
        } else {
            storylike.stories.push(story_id);
            storylike.save();
        }
    });

    res.json({resultCode: 'success'});
}

/*
 * 添加评论
 */
exports.createComment = function (req, res, next) {
    var story_id = req.body.story_id;
    var comment = req.body.comment;
    var user_id = comment.comment_user_id;
    comment.date = new Date();

    var ep = new EventProxy();
    ep.fail(next);

    User.getUserById(user_id, function(err, user){
        if(err){
            return callback(err);
        }

        if(user == null || user == ""){
            return callback(err);
        }

        comment.comment_user_name = user.name;
        comment.comment_user_image = user.image.imagePath;

        Story.getStoryById(story_id, ep.done(function(story){
            if (story.comment_count == 0) {
                story.comments[0] = comment;
            } else {
                story.comments.push(comment);
            }

            story.comment_count += 1;
            story.value += 5; //评论加2
            story.save();

            var data = {resultCode: 'success', story: story};
            var storyString= JSON.stringify(data);

            res.send(storyString);
        }));
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

/**
 * 我喜欢的故事
 * @param req
 * @param res
 * @param next
 */
exports.findMyLikeStories = function (req, res, next) {
    var user_id = req.body.user_id;
    StoryLike.getStoryLikeByUser(user_id, function(err, storylike){
        if (err) {
            console.log("err");
            return next(err);
        }

        if (storylike == undefined || storylike == null) {
            res.json({resultCode: "还没有喜欢的故事，快去点赞好故事吧。"});
        } else {
            var stories = storylike.stories;
            if (stories == null || stories.length == 0) {
                res.json({resultCode: "还没有喜欢的故事，快去点赞好故事吧。"});
            } else {
                Story.getStoriesByIdArray(stories, function(err, fullstories){
                    var data = {resultCode: 'success', fullstories: fullstories};
                    var storyLikeString= JSON.stringify(data);

                    res.send(storyLikeString);
                });
            }
        }
    });
};