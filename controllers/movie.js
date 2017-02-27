var movie = require("../common").movie

exports.renzheng = function(req,res,next){

}

exports.findByMoviesName = function(req,res){
    var message = req.weixin;
    if(message.MsgType == "text"){
        //用户输入信息时
        movie.movieTypeText(message.Content,res,req)
    }else if(message.MsgType == "event" && message.Event == "CLICK"){
        //用户点击菜单栏。并且菜单栏返回的key
        movie.messageTypeEvent(res,message)
    }else{
        res.reply()
    }

}




