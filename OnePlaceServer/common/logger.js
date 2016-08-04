/**
 * Created by Phoes on 2016/5/23.
 */
var config = require('../config.js');

var env = process.env.NODE_ENV || "development";


var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: 'logs/test.log', category: 'test' }
    ]
});

var logger = log4js.getLogger('test');
logger.setLevel(config.debug && env !== 'test' ? 'DEBUG' : 'ERROR');

module.exports = logger;
