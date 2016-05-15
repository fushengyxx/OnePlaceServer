/**
 * Created by fushengyxx on 16/5/14.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var StorySchema = new Schema({
    _id: {type: ObjectId},
    title: {type: String},
    front_image: {type: String}, // image's url
    content: {type: String},
    create_time: {type: Date, default: Date.now()},
    // author
    author_id: {type: ObjectId},

    // place
    place_lon: {type: Double},
    place_lat: {type: Double},
    place_address: {type: String},

    // count
    browse_count: {type: Number, default: 0},
    like_count: {type: Number, default: 0},
    comment_count: {type: Number, default: 0},

    // comment
    comments: {
        comment_user_id: {type: ObjectId},
        comment_content: {type: String},
        comment_time: {type: Date, default: 0},
    },

    status: {type: String}, // forbid, delete, draft, normal
    type: {type: String}, // public, friend, private
    // calculate story's value
    value: {type: Double, default: 0.0},
    
    // tag------------

});

exports.story = mongoose.model('stories', StorySchema);