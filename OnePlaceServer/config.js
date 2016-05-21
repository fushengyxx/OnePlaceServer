/**
 * Created by fushengyxx on 16/5/20.
 * config
 */
var path = require('path');

var config = {
    name: 'OnePlace', // app名字
    description: 'OnePlace: 每个地方,都有故事',

    // mongdb配置
    db: 'mongodb://phoesh.ddns.net/Oneplace',

    // 程序运行端口
    port: 3000,

    // story列表显示数量
    story_list_count: 20,

    // 每个用户一天可以发的故事数
    create_story_per_day: 1000,

};

module.exports = config;