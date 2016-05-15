/**
 * Created by fushengyxx on 16/5/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FollowSchema = new Schema({
    _id: {type: ObjectId},
    user_id: {type: ObjectId},     // master
    follower_id: {type: ObjectId}, // fans
    follow_time: {type: Date, default: Date.now}
});

mongoose.model('follows', FollowSchema);