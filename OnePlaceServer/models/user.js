/**
 * Created by fushengyxx on 16/5/9.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema; // create schema
var BaseModel = require('./base_model');
var ObjectId = Schema.ObjectId;

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
    //location: {type: String},
    signature: {type: String},
    weibo: {type: String},
    wechat: {type: String},
    status: {type: Number}, // 1 active, 2 block
    type: {type: Number}, // 1 personal, 2 group
    create_time: {type: Date, default: Date.now},
    update_time: {type: Date, default: Date.now},

    story_count: {type: Number, default: 0}, // user's story
    like_story_count: {type: Number, default: 0}, // 喜欢的故事的数量
    // for people
    follower_count: {type: Number, default: 0}, // fans,粉丝数
    following_count: {type: Number, default: 0},// 关注的人的数量
    // for place
    following_place_count: {type: Number, default: 0}, // 关注的地点的数量
    join_place_count: {type: Number, default: 0} // 参与的地点的数量(去过什么地方)
});

UserSchema.plugin(BaseModel);
// 定义一个新模型
mongoose.model('User', UserSchema); //模型User
