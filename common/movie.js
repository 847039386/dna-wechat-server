var movie = require("../proxy").movie


exports.movieTypeText = function(name,res,req){
    var message = req.weixin;
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


exports.messageTypeEvent = function(res,message){
    var key = message.EventKey;
    switch (key) {
        case "laosiji" :
            key_laosiji(res);
            break;
        default :
            res.reply();
            break;
    }
}

function key_laosiji(res){
    res.reply({
        type: "image",
        content: {
            mediaId: 'Sm9TtM1_0BoIsEidlzFJUrUnO3ZJrv99FieUULL8nVM'
        }
    });
}

//mediaId: 'Sm9TtM1_0BoIsEidlzFJUshy9mQCx4W3NA-WSmvi7Gs'  送会员
//mediaId: 'Sm9TtM1_0BoIsEidlzFJUrUnO3ZJrv99FieUULL8nVM'    广告
