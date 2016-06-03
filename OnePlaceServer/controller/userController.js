/**
 * Created by fushengyxx on 16/5/20.
 */
var config = require('../config.js');
var tools = require('../common/tools');
var EventProxy = require('eventproxy');
var User = require('../proxy').User;
var UserModel = require('../models').User;
var utitilty = require('utility');
//var util = require('util');
var formidable = require('formidable');
var fs = require('fs');
var multer = require('multer');
var mime = require('../routes/mime');
var AVATAR_UPLOAD_FOLDER = '/avatar/';


exports.login = function (req, res, next) {
    var account = req.body.account;
    var password = req.body.password;
    console.log(account + ', ' + password);
    var ep = new EventProxy();
    ep.fail(next);

    if(!account || !password) {
        res.json({resultCode: '信息不完整!'});
        console.log("信息不完整!");
        return;
    }

    User.getUserByAccount(account, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(user + " 用户不存在!");
            res.json({resultCode: '用户不存在!'});
            return;
        }

        var password_db = user.password;
        // ep.on('login_error', function (login_error) {
        //     res.json({resultCode: '用户名或密码错误!'});
        //     return;
        // });
        // tools.bcompare(password, password_db, ep.done(function(bool){
        //     if(!bool) {
        //         return ep.emit('login_error');
        //     }
        // }));

        if (password != password_db){
            console.log("用户名或密码错误!");
            res.json({resultCode: '用户名或密码错误!'});
            return;
        }

        console.log(user);
        var data = {resultCode: 'success', user: user};
        var userString= JSON.stringify(data);

        res.send(userString);
    });

};

exports.reg = function(req, res, next) {
    var account = req.body.account;
    var password = req.body.password;
    var name = req.body.name;
    console.log("new user!" + account + ", " + password);
    var ep = new EventProxy();
    ep.fail(next);

    User.getUserByAccount(account, function(err, user){
        if(err) {
            console.log("err");
            return next(err);
        }

        if(user != null) {
            res.json({resultCode: '该用户名已被注册!'});
            console.log("该用户名已被注册!");
            
        }
        else {
            User.newUser(req.body, function (err, user) {
                if (err) {
                    console.log("err");
                    return next(err);
                }
                var data = {resultCode: 'success', user: user};
                var userString = JSON.stringify(data);

                res.send(userString);
            });
        }
    });

};

exports.uploadAvatar = function (req, res, next) {
    console.log('req : ' + req.body);
    console.log('req : ' + req.files);
    // 创建上传表单
    var form = new formidable.IncomingForm();
    // 设置编辑
    form.encoding = 'utf-8';
    // 设置上传目录
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;
    // 保留后缀
    form.keepExtensions = true;
    // 文件大小
    form.maxFieldsSize = 5 * 1024 * 1024; // 5M
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log('form parse err');
            return;
        }
        // 后缀名
        var extName = '';
        console.log(files.image.imageData);
        console.log(files.image.contentType);
        // 支持所有类型
        var avatarName = req.body.account;
        var newPath = form.uploadDir + avatarName;
        console.log(newPath);
        // 重命名
        fs.renameSync(files.image.imagePath, newPath);
        /*
         *  Mongo
         */
        var img = new UserModel();
        img.account = req.body.account;
        img.image.imageData = req.files.image.imageData;
        img.image.contentType = req.body.image.contentType;
        img.image.imagePath = newPath;
            User.uploadImg(img, function (err, upimage){
                if(err) {
                    console.log("uploadImg Mongo err");
                    return next(err);
                }
                if(!upimage){
                    console.log("upload img is null");
                }
            });

        console.log('upload end');
        res.json({resultCode: 'upload success!'});

        /*
         switch (files.fulAvatar.type) {
         case 'image/pjpeg':
         extName = 'jpg';
         break;
         case 'image/jpeg':
         extName = 'jpg';
         break;
         case 'image/png':
         extName = 'png';
         break;
         case 'image/x-png':
         extName = 'png';
         break;
         case 'application/x-msdownload':
         extName = 'dll';
         break;
         case 'image/bmp':
         extName = 'bmp';
         break;
         }
         console.log( extName.length);
         if(extName.length == 0){
         res.locals.error = '只支持png和jpg格式图片';
         console.log('length = 0');
         return;
         }
         else
         {
         var avatarName = Math.random() + '.' + extName;
         var newPath = form.uploadDir + avatarName;

         console.log(newPath);
         // 重命名
         fs.renameSync(files.fulAvatar.path, newPath);
         console.log('weizhang in end');

         }
         */
    });
    
    

};

/**
 * 根据user_id获取故事列表,即故事墙上的信息
 */
exports.findStoryWall = function(req, res, next) {

};