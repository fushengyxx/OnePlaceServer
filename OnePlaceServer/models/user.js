/**
 * Created by fushengyxx on 16/5/9.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema; // create schema
var UserSchema = new Schema({
    _id: {type: ObjectId},
    account: {type: String},//for login
    password: {type: String},
    name: {type: String}, //nickname
    sex: {type: String},
    birthday: {type:Date},
    mail: {type: String},
    phone: {type: String},
    image_url: {type: String},//personal image
    location: {type: String},
    signature: {type: String},
    weibo: {type: String},
    wechat: {type: String},
    status: {type: String}, // active, block
    type: {type: String}, // personal, group
    register_time: {type: Date, default: Date.now},
    update_time: {type: Date, default: Date.now},

    story_count: {type: Number, default: 0}, // user's story
    like_story_count: {type: Number, default: 0},
    // for people
    follower_count: {type: Number, default: 0}, // fans
    following_count: {type: Number, default: 0},
    // for place
    following_place_count: {type: Number, default: 0},
    join_place_count: {type: Number, default: 0}
}); // 定义一个新模型
exports.user = mongoose.model('users', UserSchema); //模型user与集合users关联
