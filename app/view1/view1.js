'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

    .controller('View1Ctrl', ['$scope', 'getListDataService', function ($scope, getListDataService) {
        getListDataService.getDataList().then(function(response){
            $scope.dataList = response.data.data;
            // console.log("$scope.dataList:"+$scope.dataList);
        });
        $scope.sortType = "name";

        $scope.changeOrder = function (sortType) {

            switch (sortType) {
                case "name":
                    if ($scope.sortType === "name") {  //prev selected "name"
                        $scope.sortType = "-name";  //reset to des
                    } else {   //prev selected "-name" or other columns
                        $scope.sortType = "name";
                    }
                    break;
                case "category":
                    if ($scope.sortType === "category") {
                        $scope.sortType = "-category";
                    } else {
                        $scope.sortType = "category";
                    }
                    break;
                case "amount":
                    if ($scope.sortType === "amount") {
                        $scope.sortType = "-amount";
                    } else {
                        $scope.sortType = "amount";
                    }
                    break;
                default:
                    $scope.sortType = "name";
            }
        }
    }])

    .service('getListDataService', ['$http', function ($http) {

        //to share listData for both controllers
        this.getDataList = function () {
            return $http.get('./data.json');
        };

    }]);