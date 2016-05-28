/**
 * Created by fushengyxx on 16/5/26.
 */
var config = require('../config.js');
var tools = require('../common/tools');
var EventProxy = require('eventproxy');
var User = require('../proxy').User;
var Story = require('../proxy').Story;

/*
 * 新增故事
 */
exports.create = function (req, res, next) {
    var title = req.body.title;
// var front_image = ;--------------------------------
    var content = req.body.content;
    var user_id = req.body.user_id;
    var location = req.body.location;
    var status = req.body.status;
    var type = req.body.type;
    var user_id = req.body.user_id;
    var ep = new EventProxy();
    ep.fail(next);

    Story.newStory(title, content, user_id, location, status, type, function (err, story) {
        if (err) {
            console.log("err");
            return next(err);
        }

        var data = {resultCode: 'success', story: story};
        var storyString= JSON.stringify(data);

        res.send(storyString);

        User.getUserById(user_id, ep.done(function (user){
            user.story_count += 1;
            user.save();
            ep.emit('story_saved');
        }));

    });
};

/*
 * 添加评论
 */
exports.createComment = function (req, res, next) {
    var story_id = req.body.story_id;
    var comment = req.body.comment;
    comment.date = new Date();

    var ep = new EventProxy();
    ep.fail(next);

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
};