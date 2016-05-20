/**
 * Created by fushengyxx on 16/5/20.
 *
 * require('./models') 相当于 require('./models/index')
 * index 相当于一个模型的 facade, 初始化了应用 model 层
 *      1.connect mongodb
 *      2.require 各个 model 模块
 *      3.exports 所有的 model
 */

var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, {
    server: {poolSoze: 20}
}, function (err) {
    if(err) {
        process.exit(1);
    }
});

// models
require('./user');
require('./follow');
require('./message');
require('./mystory');
require('./story');
require('./story_like');
require('./story_wall');

exports.User = mongoose.model('User');
exports.Follow = mongoose.model('Follow');
exports.Message = mongoose.model('Message');
exports.MyStory = mongoose.model('MyStory');
exports.Story = mongoose.model('Story');
exports.StoryLike = mongoose.model('StoryLike');
exports.StoryWall = mongoose.model('StoryWall');

