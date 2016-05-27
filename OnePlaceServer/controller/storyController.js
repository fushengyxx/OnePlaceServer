/**
 * Created by fushengyxx on 16/5/26.
 */
var config = require('../config.js');
var tools = require('../common/tools');
var EventProxy = require('eventproxy');
var User = require('../proxy').User;
var Story = require('../proxy').Story;

exports.put = function (req, res, next) {
    var title = req.body.title;
// var front_image = ;--------------------------------
    var content = req.body.content;
    console.log('11111111111111');
    var create_time = new Date();
   // var user_id = req.body.user_id;
    Story.newAndSave(title, content, function (err, story) {
        if (err) {
            return next(err);
        }

        var ep = new EventProxy();
        console.log('2222222222');
        ep.all('story_saved', function () {
            var data = {resultCode: 'success', story: story};
            var storyString = JSON.stringify(data);
            res.send(storyString);
        });
        console.log('33333333');
        ep.fail(next);

        // User.getUserById(user_id, proxy.done(function (user){
        //     user.story_count += 1;
        //     user.save();
        //     ep.emit('story_saved');
        // }));

    });

    // var location = null;
    // location.lot = req.body.lot;
    // location.lat = req.body.lat;
    // location.country = req.body.country;
    // location.province = req.body.province;
    // location.city = req.body.city;
    // location.dist = req.body.dist;
    // location.street = req.body.street;
    // // count
    // var browse_count = req.body.browse_count;
    // var like_count = req.body.like_count;
    // var comment_count = req.body.comment_count;
    //
    // var status = req.body.status;
    // var type = req.body.type;
    //
    // // calculate story's value
    // var value = req.body.value;

    // Story.newAndSave(title, content, user_id, location, browse_count, like_count, comment_count, status, type, value, function (err, story) {
    //     if (err) {
    //         return next(err);
    //     }
    //
    //     var ep = new EventProxy();
    //
    //     ep.all('story_saved', function () {
    //         var data = {resultCode: 'success', story: story};
    //         var storyString = JSON.stringify(data);
    //         res.send(storyString);
    //     });
    //
    //     ep.fail(next);
    //
    //     User.getUserById(user_id, proxy.done(function (user){
    //         user.story_count += 1;
    //         user.save();
    //         ep.emit('story_saved');
    //     }));
    //
    // });
};
