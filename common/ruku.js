var movie = require("../proxy").movie;
var VideoDisk = require("../proxy").VideoDisk;
var agent = require("superagent");


function getWechat(callback){
    agent.get("https://data.fitvdna.com/wechat/menu-update")
        .end(function(err,result){
            callback(JSON.parse(result.text))
        })
}



exports.movieFind = function(message,name,res){
  movie.findByName(name,function(err,data){
      if(err){
          res.reply("资源出错啦。");
      }else if(data.length == 0){
          //res.reply("未找到指定电影资源。请您添加腹黑电影人工微信号：movielife9人工客服，索要影片资源。");
          getWechat(function(result){
              res.reply(result.not[0].value);
          })

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

exports.VideoDiskFind = function(message,name,res,callback){
  VideoDisk.findByName(name,function(err,data){
      if(err){
          callback(message,name,res)
      }else if(data.length == 0){
          callback(message,name,res)
      }else{
          var isGD = data.length > 3 ? true : false;
          var movieLength = isGD ? 3 : data.length;
          var str = isGD ? "当前搜索到"+data.length+"条数据，如信息量太大请准确输入电影名称。\n\n" : "";
          for(var i=0;i<movieLength;i++){
              str += (i+1) + ":" + data[i].name + "\n" + data[i].desc + "\n"
          }
          str += isGD ? "\n<a href='https://data.fitvdna.com/disk/finds/"+message.Content+"/1'>更多</a>" : ""
          res.reply(str);
      }
  })
}
