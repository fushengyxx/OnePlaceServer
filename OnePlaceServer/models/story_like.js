/**
 * Created by fushengyxx on 16/5/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var StoryLikeSchema = new Schema({
    _id: {type: ObjectId},
    user_id: {type: ObjectId},
    story_id: {type: ObjectId},
    create_time: {type: Date, default: Date.now}
});

exports.storylike = mongoose.model('storyLikes', StoryLikeSchema);