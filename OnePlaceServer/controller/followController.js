/**
 * Created by fushengyxx on 16/5/28.
 */
var config = require('../config.js');
var tools = require('../common/tools');
var EventProxy = require('eventproxy');
var Follow = require('../proxy').Follow;
var User = require('../proxy').User;

/*
 * 关注,用户A follow 用户 B
 */
exports.createFollow = function(req, res, next) {
    var user_id = req.body.user_id;
    var follower_id = req.body.follower_id;

    var ep = new EventProxy();
    ep.fail(next);

    // 检查master和follower是否已存在
    User.getUserById(user_id, ep.done(function (user) {
        if (user == null || user == "")
            return;

        User.getUserById(follower_id, ep.done(function (follower) {
            if (follower == null || follower == "")
                return;

            Follow.newFollow(user_id, follower_id, function (err, follow) {
                if (err) {
                    console.log("err");
                    return next(err);
                }

                user.follower_count += 1;
                user.save();
                follower.following_count += 1;
                follower.save();
                
                res.json({resultCode: 'success'});
            });
        }));
    }));

};
