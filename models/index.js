var mongoose = require("mongoose")
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/douban_data', {
    server: { poolSize: 20 }
}, function (err) {
    if (err) {
        process.exit(1);
    }
});
exports.movie =  require("./movie").movie;
exports.VideoDisk =  require("./movie").VideoDisk;
