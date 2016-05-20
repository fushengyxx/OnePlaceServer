/**
 * Created by fushengyxx on 16/5/5.
 */
var mongoose = require('mongoose');
//；连接数据库
var db = mongoose.connect('mongodb://phoesh.ddns.net/Oneplace');

/*var Cat = mongoose.model('Cat', {
    name: String,
    friends: [String],
    age: Number,
});*/

// new 一个新对象，名叫 kitty
// 接着为 kitty 的属性们赋值
/*var kitty = new Cat({ name: 'Zildjian', friends: ['tom', 'jerry']});
kitty.age = 3;
*/
// 调用 .save 方法后，mongoose 会去你的 mongodb 中的 test 数据库里，存入一条记录。
/*kitty.save(function (err) {
    if (err) // ...
        console.log('meow');
});*/

