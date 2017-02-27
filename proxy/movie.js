var movie = require("../models").movie;


/**
 * 根据电影名字查找电影的详细信息。得到的数据是数组。
 * @param name
 * @param callback
 */
exports.findByName = function (name,callback){
    var reg = new RegExp(name);
    movie.find({ name : reg },"name score year").exec(callback)
}









