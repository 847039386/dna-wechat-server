var app = angular.module('topicsFactory',[]);

app.factory('topicsServer',['$http',function($http){
    var host = "t.fitvdna.com"
    var getTopics = function(page){
        return $http({
            method: 'GET',
            url: 'https://' + host + '/list?page='+page,
            cache:false
        })
    }
    return {
        programs:function(page){
            return getTopics(page);
        }
    }
}])



