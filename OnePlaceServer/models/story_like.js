/**
 * Created by fushengyxx on 16/5/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var ObjectId = Schema.ObjectId;

var StoryLikeSchema = new Schema({
    user_id: {type: ObjectId},
    stories: [{type: ObjectId}] // user喜欢的所有故事
});

StoryLikeSchema.plugin(BaseModel);
mongoose.model('StoryLike', StoryLikeSchema);