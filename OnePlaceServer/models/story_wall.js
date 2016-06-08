/**
 * Created by fushengyxx on 16/5/14.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var ObjectId = Schema.ObjectId;

var StoryWallSchema = new Schema({
    user_id: {type: ObjectId},
    stories: [{type: ObjectId}],
    //stories: [{story_id: {type: ObjectId},
    //           isLike: {type: Boolean, default: false}
    //         }],
    story_date: {type: Date}
});

StoryWallSchema.plugin(BaseModel);
mongoose.model('StoryWall', StoryWallSchema);