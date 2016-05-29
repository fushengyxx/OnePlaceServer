/**
 * Created by fushengyxx on 16/5/26.
 */
var config = require('../config.js');
var tools = require('../common/tools');
var EventProxy = require('eventproxy');
var User = require('../proxy').User;
var Story = require('../proxy').Story;

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

        var data = {resultCode: 'success', story: story};
        var storyString= JSON.stringify(data);

        res.send(storyString);
    });
};

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
            story.value += 2; //评论加2
            story.save();

            var data = {resultCode: 'success', story: story};
            var storyString= JSON.stringify(data);

            res.send(storyString);
        }));
    });
};