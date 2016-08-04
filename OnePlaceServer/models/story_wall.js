/**
 * Created by fushengyxx on 16/5/14.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var ObjectId = Schema.ObjectId;

var StoryWallSchema = new Schema({
    user_id: {type: ObjectId},
    stories: [{type: ObjectId}],//user在date这天能看到的所有故事
    story_date: {type: Date}
    //stories: [{story_id: {type: ObjectId},
    //           isLike: {type: Boolean, default: false}
    //         }],
});

StoryWallSchema.plugin(BaseModel);
mongoose.model('StoryWall', StoryWallSchema);