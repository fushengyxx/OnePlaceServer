/**
 * Created by fushengyxx on 16/5/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var ObjectId = Schema.ObjectId;

var StoryLikeSchema = new Schema({
    user_id: {type: ObjectId},
    story_id: {type: ObjectId}, // story's author is from the story document
    create_time: {type: Date, default: Date.now}
});

StoryLikeSchema.plugin(BaseModel);
mongoose.model('StoryLike', StoryLikeSchema);