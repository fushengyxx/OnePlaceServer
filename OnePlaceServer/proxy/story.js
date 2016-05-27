/**
 * Created by fushengyxx on 16/5/26.
 */
var EventProxy = require('eventproxy');
var models     = require('../models');
var Story      = models.Story;
var User       = require('./user');
var tools      = require('../common/tools');
var _          = require('lodash');

/**
 * 根据storyID获取story
 *
 */
exports.getStoryById = function(id, callback){

};

/**
 * 根据查询条件,获取故事列表
 *
 */
exports.getStoryByQuery = function(query, opt, callback){
    query.deleted = false;
    Story.find(query, {}, opt, function(err, stories){
        if(err) {
            return callback(err);
        }
        if (stories.length == 0){
            return callback(null, []);
        }

        var ep = new EventProxy();
        // ep.after('story_ready', stories.length, function(){
        //     stories = _.compact(stories); // 删除不合格的story
        //     return callback(null, stories);
        // });
        ep.fail(callback);

    });

};

exports.NewStory = function (account, password, name, sex, birthday, mail, phone, callback) {
    var user = new User();
    user.account = account;
    user.password = password;
    user.name = name;
    user.sex = sex;
    user.birthday = birthday;
    user.mail = mail;
    user.phone = phone;

    user.save(callback);
};
