/**
 * Created by fushengyxx on 16/5/14.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var ObjectId = Schema.ObjectId;

var MyStorySchema = new Schema({
    user_id: {type: ObjectId},
    stories: [{type: ObjectId}] // user的所有故事
});

MyStorySchema.plugin(BaseModel);
mongoose.model('MyStory', MyStorySchema);