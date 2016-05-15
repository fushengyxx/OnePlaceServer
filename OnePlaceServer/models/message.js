/**
 * Created by fushengyxx on 16/5/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MessageSchema = new Schema({
    _id: {type: ObjectId},
    /*
     * type
     * like: xx like your story
     * comment: xx comment your story
     * reply: xx reply your comment in xxx story
     * follow: xx follow you
     */
    type: {type: String},
    user_id: {type: ObjectId},
    story_id: {type: ObjectId},
    create_time: {type: Date, default: Date.now}
});

mongoose.model('messages', MessageSchema);