var movie = require("../proxy").movie;
var ruku = require("./ruku")

var agent = require("superagent");


function getWechat(callback){
    agent.get("https://data.fitvdna.com/wechat/menu-update")
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
        // res.reply("暂停服务！相关问题请联系人工QQ：3576228289。")
    }
}

//查找电影名
function selectMongoMovie(message,name,res){
    ruku.VideoDiskFind(message,name,res,ruku.movieFind)
}


function quick_select(tp,res){
    getWechat(function(result){
        var notGo = false;
        var prompt = "没有找到关键字！\n，关键字如下。\n\n"
        var userkey = result.userKey
        for (var i in userkey){
            if(userkey[i].key == tp){
                notGo = true;
                quick_go(userkey[i].type,userkey[i],res);
                break;
            }else{
                prompt +=  ("#" + userkey[i].key + "\n")
            }
        }
        if(!notGo){
            res.reply(prompt)
        }

    })
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
            res.reply("出错啦。")
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
