/**
 * Created by fushengyxx on 16/5/14.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var ObjectId = Schema.ObjectId;

var MyStorySchema = new Schema({
    user_id: {type: ObjectId},
    story_id: {type: ObjectId},
    create_time: {type: Date, default: Date.now}
});

MyStorySchema.plugin(BaseModel);
mongoose.model('MyStory', MyStorySchema);