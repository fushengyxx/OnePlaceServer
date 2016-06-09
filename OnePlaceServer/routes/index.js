/*
 * Module dependencies
 */

var express = require('express');
//var app = express();

var userController = require('../controller/userController');
var storyController = require('../controller/storyController');
var followController = require('../controller/followController');

var config = require('../config');

var router = express.Router();

// login
router.post('/login', userController.login);

// user
router.post('/user/reg', userController.reg);
router.post('/user/uploadAvatar', userController.uploadAvatar);
router.post('/user/changeImage', userController.changeImage);

// follow
router.post('/follow/create', followController.createFollow);

// story
router.post('/story/save', storyController.create);
router.post('/story/findOne', storyController.findStoryById);
router.post('/story/createComment', storyController.createComment);
router.post('/story/wall', storyController.getStoryWall);
router.post('/story/browse', storyController.getFullStoryBuyId);
router.post('/story/like', storyController.likeStory);
router.post('/story/hotStory', storyController.findHotStory);
router.post('/story/myStories', storyController.findMyStories);
router.post('/story/likeStories', storyController.findMyLikeStories);


module.exports = router;
