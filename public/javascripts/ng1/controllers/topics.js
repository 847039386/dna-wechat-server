var app = angular.module('topicsController',["topicsFactory"]);

app.controller('topicsController',["$scope","topicsServer","$state","$rootScope",function($scope,topics_server,$state,$rootScope){
    var currentPage = 0; // 控制页数。
    var pageCount = 0; //总页数
    $scope.loadingTopics = false;  //显示加载中。
    $scope.loadTopics = true;  //加载完毕。
    $scope.notTopicsData = false;  // 数据是否完全显示
    $scope.topics = [];
    function getTopics(page){
        $scope.loadingTopics = true;
        topics_server.programs(page).then(function(req){
            $scope.loadingTopics = false;
            try {
                if(req.data.item.length > 0){
                    if(page == 0){
                        pageCount = Math.ceil(req.data.total_count / 5);
                    }
                    req.data.item.forEach(function(topic){
                        var update_time = topic.content.update_time;
                        topic.content.news_item.forEach(function(ite){
                            ite.thumb_url = "http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=" + ite.thumb_url;
                            ite.update_time = update_time;
                            $scope.topics.push(ite)
                        })
                    })
                    if(currentPage == pageCount - 1){
                        $scope.notTopicsData = true;
                    }else if(currentPage < pageCount){
                        currentPage ++;
                    }else{
                        $scope.notTopicsData = true;
                    }
                }else{
                    $scope.notTopicsData = true;
                }
            }catch(e){
                getTopics(page)
            }
        })
    }

    getTopics(currentPage)
    $scope.topage = function(){
        getTopics(currentPage)
    }
    $scope.toTopic = function(topic){
        $rootScope.topic_data = topic;
        $state.go("topic")
    }

}])



