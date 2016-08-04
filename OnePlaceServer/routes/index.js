/*
 * Module dependencies
 */

var express = require('express');
//var app = express();

var userController = require('../controller/userController');
var storyController = require('../controller/storyController');
var followController = require('../controller/followController');
var storywallController = require('../controller/storywallController');
var mystoryController = require('../controller/mystoryController');
var storylikeController = require('../controller/storylikeController');

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
router.post('/story/browse', storyController.getFullStoryBuyId);
router.post('/story/like', storyController.likeStory);

// story_wall
router.post('/story/wall', storywallController.getStoryWall);
router.post('/story/hotStory', storywallController.findHotStory);
router.post('/story/findByTitle', storywallController.findByTitle);

// story_like
router.post('/story/likeStories', storylikeController.findMyLikeStories);

// my_story
router.post('/story/myStories', mystoryController.findMyStories);




module.exports = router;
