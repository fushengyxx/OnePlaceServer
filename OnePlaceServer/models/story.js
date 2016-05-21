/**
 * Created by fushengyxx on 16/5/14.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var ObjectId = Schema.ObjectId;

var StorySchema = new Schema({
    _id: {type: ObjectId},
    title: {type: String},
    front_image: {type: String}, // image's url
    content: {type: String},
    create_time: {type: Date, default: Date.now()},
    // author
    user_id: {type: ObjectId},

    // location
    location: {
        lot: {type: Number},
        lat: {type: Number},
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
    comments: {
        comment_user_id: {type: ObjectId},
        comment_content: {type: String},
        comment_time: {type: Date, default: Date.now}
    },

    status: {type: Number}, // forbid, delete, draft, normal
    type: {type: Number}, // public, friend, private
    // calculate story's value
    value: {type: Number, default: 0.0},

    // tag------------
});

StorySchema.plugin(BaseModel);
mongoose.model('Story', StorySchema);