var app = angular.module('wechat',["topicsController","ui.router","topicController","ui.swiper"]);

app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('topics',{
        url: '/',
        templateUrl:"javascripts/ng1/view/topics.html",
        controller:"topicsController"
    }).state('topic',{
        url:'/topic',
        params:{topic:null},
        templateUrl:'javascripts/ng1/view/topic.html',
        controller:"topicController"
    })

})




