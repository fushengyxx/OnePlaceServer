/**
 * Created by fushengyxx on 16/5/14.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var ObjectId = Schema.ObjectId;

var StorySchema = new Schema({
    title: {type: String},
    front_image: {type: String}, // image's url
    content: {type: String},
    create_time: {type: Date, default: Date.now()},
    // author
    user_id: {type: ObjectId},
    user_name: {type: String},
    user_image: {type: String},

    // location
    location: {
        lot: {type: Number}, // 经度
        lat: {type: Number}, // 维度
        country: {type: String},  // 国家
        province: {type: String}, // 省份
        city: {type: String},     // 城市
        dist: {type: String},     // 地区
        street: {type: String}    // 街道
    },

    // count
    browse_count: {type: Number, default: 0},
    like_count: {type: Number, default: 0},
    comment_count: {type: Number, default: 0},

    // comment
    comments: [{
        comment_user_id: {type: ObjectId},
        comment_user_name: {type: String},
        comment_user_image: {type: String},
        comment_content: {type: String},
        comment_time: {type: Date}
    }],

    status: {type: Number}, // 1 normal, 2 draft, 3 delete, 4 forbid
    type: {type: Number}, // 1 public, 2 friend, 3 private
    // calculate story's value
    value: {type: Number, default: 0.0},

    // tag------------
});

StorySchema.plugin(BaseModel);
mongoose.model('Story', StorySchema);