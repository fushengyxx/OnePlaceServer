/**
 * Created by fushengyxx on 16/5/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var ObjectId = Schema.ObjectId;

var MessageSchema = new Schema({
    /*
     * type
     * 1 like: xx like your story
     * 2 comment: xx comment your story
     * 3 reply: xx reply your comment in xxx story
     * 4 follow: xx follow you
     */
    type: {type: Number},
    user_id: {type: ObjectId},
    author_id: {type : ObjectId},
    story_id: {type: ObjectId},
    has_read: {type: Boolean, default: false},
    create_time: {type: Date, default: Date.now}
});

MessageSchema.plugin(BaseModel);
mongoose.model('Message', MessageSchema);