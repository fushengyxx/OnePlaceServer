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
    Story.findOne({_id: id}, callback);
};

/**
 * ids
 * @param ids
 * @param callback
 */
exports.getStoriesByIdArray = function(ids, callback){
    Story.find().where('_id').in(ids).exec(callback);
};

exports.getHotStory = function(callback){
    Story.find(null, null, {sort: '-value'}, callback);
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

       // var ep = new EventProxy();
        // ep.after('story_ready', stories.length, function(){
        //     stories = _.compact(stories); // 删除不合格的story
        //     return callback(null, stories);
        // });
        //ep.fail(callback);
    });

};

/**
 * 新建故事
 */
exports.newStory = function(body, callback){
    User.getUserById(body.user_id, function(err, user){
        if(err){
            return callback(err);
        }

        if(user == null || user == ""){
            return callback(err);
        }

        var story = new Story();
        story.title = body.title;
        story.content = body.content;
        story.create_time = tools.formatDate(new Date(), false);
        story.location = body.location;
        story.user_id = body.user_id;
        story.user_name = user.name;
        story.user_image = user.image.imagePath;
        story.status = body.status;
        story.type = body.type;
        story.value = 10; // 新写的故事value设置为10
        // -------to do
        var images = ["http://img3.duitang.com/uploads/item/201604/24/20160424000523_xfQwL.jpeg",
            "http://imgsrc.baidu.com/forum/w%3D580/sign=824cd223e6dde711e7d243fe97efcef4/5d5e53ee3d6d55fbe5d514006e224f4a21a4ddca.jpg",
            "http://www.nitutu.com/uploads/allimg/150814/1_0Q40HGV0G.jpg",
            "http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/17/c28/25794786_1379404775838_mthumb.jpg",
            "http://uploads.xuexila.com/allimg/1507/641-150G31I335.jpg",
            "http://pic1.win4000.com/mobile/c/520b5350b802d.jpg",
            "http://i0.hdslb.com/video/c7/c7f134f01e9220dfee0b2f923e483ad0.jpg",
            "http://i2.hdslb.com/video/f2/f2e1291ee47d586dab1cef549311771b.jpg",
            "http://img0.imgtn.bdimg.com/it/u=497386873,1022542517&fm=21&gp=0.jpg",
            "http://img0.ph.126.net/vjafE5hxRQLHesSuqAnEEA==/4786481979064839750.jpg",
            "http://imgstore.cdn.sogou.com/app/a/100540002/469034.jpg"];
        var i = Math.ceil(Math.random() * 10);
        story.front_image = images[i];

        story.save(callback);

        user.story_count += 1;
        // 参与的地点
        user.join_place_count += 1;
        user.save();
    });
};

/**
 * 通过title模糊查询
 * @param title
 * @param callback
 */
exports.queryByTitle = function(title, callback){
    var qs = new RegExp(title);
    Story.where('title', qs).exec(callback);
};

/**
 * 新增评论
 */
// exports.newComment = function(story_id, comment, callback) {
//     var story = new Story();
//     story.comment = comment;
//     story.comment_count += 1;
//     story.value += 2; //评论加2
//
//     story.save(callback);
// };