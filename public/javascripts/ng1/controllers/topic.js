var app = angular.module('topicController',[]);

app.controller("topicController",['$scope',"$rootScope","$sce",function($scope,$rootScope,$sce){
    $scope.topic = $rootScope.topic_data
    var reg = /<img.*?>/g
    var images = $scope.topic.content.match(reg)
    images.forEach(function(image){
        var imageAttr = updateImageAttr(image);
        replaceImage(image,imageAttr)
    })

    var date = new Date($scope.topic.update_time)
   console.log(date.toLocaleString(),$scope.topic.update_time)
    $scope.content = $sce.trustAsHtml($scope.topic.content)


    function updateImageAttr(str)
    {
        var reg = /^<img.*data.src=\"(.*?)\".*?>$/
        var g_str = str.match(reg);
        var g_url = g_str[1];
        var gz_str = "<img src='http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl="+ g_url +"' > "
        str = str.replace(reg,gz_str);
        return str;
    }
    function replaceImage(str1,str2){
        $scope.topic.content = $scope.topic.content.replace(str1,str2)
    }

}])

