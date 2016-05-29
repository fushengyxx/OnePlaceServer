/**
 * Created by fushengyxx on 16/5/26.
 */
var EventProxy = require('eventproxy');
var models     = require('../models');
var Follow      = models.Follow;

/*
 * follower 关注 user
 * user被关注
 */
exports.newFollow = function(user_id, follower_id, callback) {
    var follow = new Follow();
    follow.user_id = user_id;
    follow.follower_id = follower_id;
    follow.create_time = new Date();

    follow.save(callback);
};