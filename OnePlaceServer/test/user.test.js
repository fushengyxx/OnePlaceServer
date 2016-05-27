/**
 * Created by fushengyxx on 16/5/25.
 */
var app = require('../app');
var Mocha = require('mocha');
var assert = require("assert");
var request = require('supertest')(app);
var should = require("should");

describe('userController/test.js', function() {
    var account = 'fusheng';
    var password = 'password';

    describe('login', function() {
        it('should not sign up an user when account is empty', function(done) {
            request.post('/login')
                .send({
                    account: '',
                    password: password
                })
                .expect(200, function(err, res) {
                    should.not.exist(err);
                    res.text.should.containEql('用户名或密码不能为空');
                    done();
                });
        });
        it('should not sign up an user when password is empty', function(done) {
            request.post('/login')
                .send({
                    account: account,
                    password: ''
                })
                .expect(200, function(err, res) {
                    should.not.exist(err);
                    res.text.should.containEql('用户名或密码不能为空');
                    done();
                });
        });
        it('should sign up an user', function(done) {
            request.post('/login')
                .send({
                    account: account,
                    password: password
                })
                .expect(200, function(err, res) {
                    should.not.exist(err);
                    res.text.should.containEql('注册成功');
                    done();
                });
        });
        it('should not sign up an user when it is exist', function(done) {
            request.post('/login')
                .send({
                    account: account,
                    password: password
                })
                .expect(200, function(err, res) {
                    should.not.exist(err);
                    res.text.should.containEql('用户已经存在');
                    done();
                });
        });
    });

    describe('sign in', function(done) {
        it('should not sign in successful when account is empty', function(done) {
            request.post('/login')
                .send({
                    account: '',
                    password: password
                })
                .end(function(err, res) {
                    should.not.exist(err);
                    res.text.should.containEql('用户名或密码不能为空');
                    done();
                });
        });
        it('should not sign in successful when account is not exist', function(done) {
            request.post('/login')
                .send({
                    // 之前的测试用例已经注册了用户名为account的用户，现在改变一下account的值，确保该用户不存在
                    account: account + '1',
                    password: password
                })
                .end(function(err, res) {
                    should.not.exist(err);
                    res.text.should.containEql('用户不存在');
                    done();
                });
        });
        it('should not sign in successful when password is wrong', function(done) {
            request.post('/login')
                .send({
                    account: account,
                    // 在用户名存在的前提下改变密码的值
                    password: password + '1'
                })
                .end(function(err, res) {
                    should.not.exist(err);
                    res.text.should.containEql('用户密码错误');
                    done();
                });
        });
        it('should sign in successful', function(done) {
            request.post('/login')
                .send({
                    account: account,
                    password: password
                })
                .end(function(err, res) {
                    should.not.exist(err);
                    res.text.should.containEql('登录成功');
                    done();
                });
        });
    })
});
