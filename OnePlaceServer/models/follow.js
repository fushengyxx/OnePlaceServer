/**
 * Created by fushengyxx on 16/5/15.
 */
var mongoose = require('mongoose');
var BaseModel = require('./base_model');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var FollowSchema = new Schema({
    // B关注了A
    user_id: {type: ObjectId},     // master 我, A
    follower_id: {type: ObjectId}, // fans 我的粉丝的id, B
    create_time: {type: Date, default: Date.now} // 粉丝什么时候关注的我
});

FollowSchema.plugin(BaseModel);
mongoose.model('Follow', FollowSchema);