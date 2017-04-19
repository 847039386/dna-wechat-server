var movie = require("../proxy").movie;

var agent = require("superagent");


function getWechat(callback){
    agent.get("http://data.fitvdna.com/wechat/menu-update")
        .end(function(err,result){
            callback(JSON.parse(result.text))
        })
}



// 搜索电影名称。
exports.movieTypeText = function(name,res,req){
    var message = req.weixin;
    if(name.substring(1,0) == "#"){
        quick_select(name.substring(1),res);
    }else{
        selectMongoMovie(message,name,res);
    }
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
        case "抢会员" :
            article_wc_1(res)
            break;
        default :
            res.reply("可以回复一下内容获取资源。\n\n1、#抢会员")
            break;
    }
}

// 键值方法。
exports.messageTypeEvent = function(res,message){
    getWechat(function(result){
        var key = message.EventKey;
        result.keys.forEach(function(k){
            if(key == k.key){
                quick_go(k.type,k,res)
            }
        })
    })
}

//用户第一次关注
exports.user_subscribe = function(res){
    getWechat(function(result){
        var subscribe = result.user[0];
        if(result.user[0]){
            quick_go(subscribe.type,subscribe,res)
        }else{
            reply("腹黑电影欢迎您。");
        }
    })

}


function quick_go(tp,value,res){
    switch (tp) {
        case "text" :
            res.reply(value.value);
            break;
        case "article" :
            res.reply(value.body);
            break;
        case "image" :
            res.reply({
                type: "image",
                content: {
                    mediaId: value.mediaId
                }
            });
            break;
        default :
            res.reply("可以回复一下内容获取资源。\n\n1、#抢会员")
            break;
    }
}

//#福利。
function href_a(path,str){
    return "<a href='"+ path +"'>"+ str +"</a>"
}
function article_wc_1(res){
    res.reply("您好，欢迎参加（4月11日-4月16日）抢爱奇艺vip会员活动。只需两步，即可拥有一个月之久的爱奇艺vip会员，让您追剧无烦恼。\n请按以下步骤操作：\n1.	分享：转发本次活动"+ href_a("http://mp.weixin.qq.com/s?__biz=MzIyNTU3NjUxNw==&mid=100003855&idx=4&sn=0f9b11e6469ced77c86d6e6194f7a8c0&chksm=687cc3255f0b4a335ed71b9ef74a67fd81f4543409f0a3489b6336f56f7adf3b3c10f1a1290c#rd","福利篇 | 爱奇艺vip会员免费送")+"至朋友圈。\n2.	留言：加腹黑电影人工微信：movielife9，腹黑君会看您的分享记录哦，勿删。\n特别提示:转发完一定要加微信movielife9好友留言。勿删勿取关否则视无效哦。祝好运！");
}



//mediaId: 'Sm9TtM1_0BoIsEidlzFJUshy9mQCx4W3NA-WSmvi7Gs'  送会员
//mediaId: 'Sm9TtM1_0BoIsEidlzFJUrUnO3ZJrv99FieUULL8nVM'    广告
