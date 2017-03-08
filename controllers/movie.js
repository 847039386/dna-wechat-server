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
    }else if(message.MsgType == "event" && message.Event == "subscribe"){
        //res.reply("关注了我，谢谢。")
        key_laosiji(res)
    }else{
        res.reply()
    }

}








function key_laosiji(res){
    res.reply("来不及解释了，快上车！直接在腹黑电影公众号下面，点击左下角的键盘图标，切换到对话模式！输入你要找的电影、电视剧的名字，点击发送！腹黑君帮你搜尽所有！");
}
