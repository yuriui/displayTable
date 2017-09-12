'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

    .controller('View1Ctrl', ['$http', '$scope', function ($http, $scope) {
        $http.get('./data.json')
            .then(function (response) {

                $scope.dataList = response.data.data;

            });
}]);