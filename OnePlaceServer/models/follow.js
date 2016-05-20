/**
 * Created by fushengyxx on 16/5/15.
 */
var mongoose = require('mongoose');
var BaseModel = require('./base_model');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var FollowSchema = new Schema({
    _id: {type: ObjectId},
    user_id: {type: ObjectId},     // master
    follower_id: {type: ObjectId}, // fans
    create_time: {type: Date, default: Date.now}
});

FollowSchema.plugin(BaseModel());
mongoose.model('Follow', FollowSchema);