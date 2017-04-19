var movie = require("../common").movie


exports.renzheng = function(req,res,next){

}


exports.findByMoviesName = function(req,res){

    var message = req.weixin;
    wechat_reply_text(message,res,req);
    wechat_reply_nav_click(message,res);
    wechat_reply_subscribe(message,res);
}



//用户发送文字
function  wechat_reply_text(message,res,req){
    if(message.MsgType == "text"){
        movie.movieTypeText(message.Content,res,req)
    }
}

//用户点击菜单栏。并且菜单栏返回的key
function wechat_reply_nav_click(message,res){
    if(message.MsgType == "event" && message.Event == "CLICK"){
        movie.messageTypeEvent(res,message)
    }
}

//用户关注了之后
function wechat_reply_subscribe(message,res){
    if(message.MsgType == "event" && message.Event == "subscribe" || message.MsgType == "event" && message.Event == "unsubscribe"){
        movie.user_subscribe(res,message.Event)
    }
}


