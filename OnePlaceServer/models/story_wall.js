/**
 * Created by fushengyxx on 16/5/14.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var ObjectId = Schema.ObjectId;

var StoryWallSchema = new Schema({
    story_id: {type: ObjectId}, // 方便查找定位,更新数据
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
        lot: {type: Number},
        lat: {type: Number},
        country: {type: String},
        province: {type: String},
        city: {type: String},
        dist: {type: String}
    },

    // count
    browse_count: {type: Number, default: 0},
    like_count: {type: Number, default: 0},
    comment_count: {type: Number, default: 0},

    // comment
    comments: {
        comment_user_id: {type: ObjectId},
        comment_user_name: {type: String},
        comment_user_image: {type: String},
        comment_content: {type: String},
        comment_time: {type: Date, default: Date.now}
    },

    status: {type: Number}, // forbid, delete, draft, normal
    type: {type: Number}, // public, friend, private
    // calculate story's value
    value: {type: Number, default: 0.0},
    
    // tag------------
});

StoryWallSchema.plugin(BaseModel);
mongoose.model('StoryWall', StoryWallSchema);