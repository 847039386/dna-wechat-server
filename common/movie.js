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

function key_activity(res){
    //res.reply({
    //    type: "image",
    //    content: {
    //        mediaId: 'Sm9TtM1_0BoIsEidlzFJUrUnO3ZJrv99FieUULL8nVM'
    //    }
    //});
    res.reply([
        {
            title: '影视评论丨这届香港金像奖最佳男女主终于给了他们！（附获奖名单）',
            description: '这是女神与高富帅之间的对话',
            picurl: 'http://mmbiz.qpic.cn/mmbiz_png/JqMNXCSzTyWLek82m35WquO4OVwVe5vExlQibYz67ZcCQUibqtzuZG7XPib1x4NzLGuNBdUbvOZuRA3sMtSqPywqg/0?wx_fmt=png',
            url: 'http://mp.weixin.qq.com/s?__biz=MzIyNTU3NjUxNw==&mid=100003830&idx=2&sn=09911d2822ee1c078c2c9a09a59acdff&chksm=687cdcdc5f0b55cad0e2388f336ec25f191be60db7b2282d5fb79396903beec634c874a3c7e3#rd'
        }
    ]);
}

function key_laosiji(res){
    res.reply("来不及解释了，快上车！直接在腹黑电影公众号下面，点击左下角的键盘图标，切换到对话模式！输入你要找的电影、电视剧的名字，点击发送！腹黑君帮你搜尽所有！");
}

function key_about(res){
    res.reply("商务合作请联系微信：movielife9");
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
            res.reply("可以回复一下内容获取资源。\n\n1、#福利")
            break;
    }
}


//#福利。
function article_wc_1(res){
    res.reply("发送抢会员弹出：\n您好，欢迎参加（4月11日-4月16日）抢爱奇艺vip会员活动。只需两步，即可拥有一个月之久的爱奇艺vip会员，让您追剧无烦恼。\n请按以下步骤操作：\n1.	分享：转发本次活动<a href='#'>标题</a>至朋友圈。\n2.	留言：加腹黑电影人工微信：movielife9，腹黑君会看您的分享记录哦，误删。\n特别提示:转发完一定要加微信movielife9好友留言。否则视无效哦。祝好运！");
}

//mediaId: 'Sm9TtM1_0BoIsEidlzFJUshy9mQCx4W3NA-WSmvi7Gs'  送会员
//mediaId: 'Sm9TtM1_0BoIsEidlzFJUrUnO3ZJrv99FieUULL8nVM'    广告
