
var config = {
    wx:{
        token:'beimenwenhua',
        appid:'wx882441dce8072d7e',
        secret:'72d6d52d2467ae84a692c9c2de152237',
        menu:{
            "button":[
                {
                    "type":"view",
                    "name":"往期精选",
                    "url":"https://mp.weixin.qq.com/mp/profile_ext?action=home&scene=110&__biz=MzIyNTU3NjUxNw==#wechat_redirect"
                },
                {
                    "name":"找片",
                    "sub_button":[
                        {
                            "type":"view",
                            "name":"最近热门",
                            "url":"https://data.fitvdna.com/hot/movie"
                        },
                        {
                            "type":"view",
                            "name":"年度电影",
                            "url":"https://data.fitvdna.com/list/movie/all/all/7.1/10/5000/0/2016/0"
                        },
                        {
                            "type":"view",
                            "name":"年度剧集",
                            "url":"https://data.fitvdna.com/list/tv/all/all/7.1/10/5000/0/2016/0"
                        },
                        {
                            "type":"view",
                            "name":"高分电影",
                            "url":"https://data.fitvdna.com/list/movies/all/all/8.6/10/60000/0/0/0"
                        },
                        {
                            "type":"view",
                            "name":"高分剧集",
                            "url":"https://data.fitvdna.com/list/tv/all/all/8.6/10/50000/0/0/0"
                        }]
                },
                {
                    "type":"click",
                    "name":"老司机",
                    "key":"laosiji"
                }]
        }

    }
}




module.exports = config;
