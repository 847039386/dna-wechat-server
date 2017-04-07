var movie = require("../proxy").movie



// 搜索电影名称。
exports.movieTypeText = function(name,res,req){
    var message = req.weixin;
    if(name.substring(1,0) == "#"){
        quick_select(name.substring(1),res);
    }else{
        selectMongoMovie(message,name,res);
    }
}

// 键值方法。
exports.messageTypeEvent = function(res,message){
    var key = message.EventKey;
    switch (key) {
        case "laosiji" :            //老司机
            key_laosiji(res);
            break;
        case "about" :              //关于我们
            key_about(res)
            break;
        case "activity" :
            key_activity(res);
            break;
        default :
            res.reply("错误的键值：" + key);
            break;
    }
}

//用户第一次关注
exports.user_subscribe = function(res){
    res.reply("来不及解释了，快上车！直接在腹黑电影公众号下面，点击左下角的键盘图标，切换到对话模式！输入你要找的电影、电视剧的名字，点击发送！腹黑君帮你搜尽所有！");
}

//查找电影名
function selectMongoMovie(message,name,res){
    movie.findByName(name,function(err,data){
        if(err){
            res.reply("资源出错啦。");
        }else if(data.length == 0){
            res.reply("未找到指定电影资源。请您添加腹黑电影人工微信号：movielife9，我们将邀请您加入腹黑电影资源微信群。");
        }else{
            var isGD = data.length > 5 ? true : false;
            var movieLength = isGD ? 5 : data.length;
            var str = isGD ? "当前搜索到"+data.length+"条数据，如信息量太大请准确输入电影名称。\n\n" : "";
            for(var i=0;i<movieLength;i++){
                str += (i+1) + ":( " + data[i].year + " ) <a href='https://data.fitvdna.com/detail/"+ data[i]._id+"'>" + data[i].name + "</a>\n"
            }
            str += isGD ? "\n<a href='https://data.fitvdna.com/find/"+message.Content+"/0'>更多</a>" : ""
            res.reply(str);
        }
    })
}

function quick_select(tp,res){
    switch (tp) {
        case "你好" :
            res.reply("你也好！");
            break;
        default :
            res.reply("可以回复一下内容获取资源。\n\n1、#你好")
            break;
    }
}

function key_activity(res){
    res.reply({
        type: "image",
        content: {
            mediaId: 'Sm9TtM1_0BoIsEidlzFJUrUnO3ZJrv99FieUULL8nVM'
        }
    });
}

function key_laosiji(res){
    res.reply("来不及解释了，快上车！直接在腹黑电影公众号下面，点击左下角的键盘图标，切换到对话模式！输入你要找的电影、电视剧的名字，点击发送！腹黑君帮你搜尽所有！");
}

function key_about(res){
    res.reply("商务合作请联系微信：movielife9");
}

//mediaId: 'Sm9TtM1_0BoIsEidlzFJUshy9mQCx4W3NA-WSmvi7Gs'  送会员
//mediaId: 'Sm9TtM1_0BoIsEidlzFJUrUnO3ZJrv99FieUULL8nVM'    广告
