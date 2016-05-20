/**
 * Created by fushengyxx on 16/5/20.
 * 给所有的Model扩展功能
 */
var tools = require('../common/tools');

module.exports = function (schema) {
    schema.methods.create_at_ago = function () {
        return tools.formatDate(this.create_time, true)
    }

    schema.methods.update_at_ago = function () {
        return tools.formatDate(this.update_time, true)
    }
};