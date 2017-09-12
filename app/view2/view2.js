'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', 'getListDataService', function ($scope, getListDataService) {

        getListDataService.getDataList().then(function (response) {
            var listData = response.data.data;

            var dic = {
                "C1": {},
                "C2": {},
                "C3": {}
            };   //

            var names = [];
            for (var i = 0; i < listData.length; i++) {
                if (listData[i].category === "C1") {
                    dic.C1[listData[i].name] = listData[i].amount;
                } else if (listData[i].category === "C2") {
                    dic.C2[listData[i].name] = listData[i].amount;
                } else if (listData[i].category === "C3") {
                    dic.C3[listData[i].name] = listData[i].amount;
                }
                // restructure the listData to use given 'category' values('C1','C2','C3') as keys
            }

            var seconodDic = {};
            for (var j = 0; j < listData.length; j++) {
                if (seconodDic[listData[j].name] == undefined) {
                    names.push(listData[j].name);
                    seconodDic[listData[j].name] = 1;
                }
            }

            names.sort();         //get all names as array and sort
            // console.log(names)

            var final = [];
            for (var i = 0; i < names.length; i++) {   //loop all names
                var tempfinal = []
                if (dic.C1[names[i]] != undefined) {   //find respect amount on category===C1
                    var _obj = dic.C1[names[i]];
                    tempfinal.push(_obj);  //use "name" value as key, array as value, push {"C1":200} to array
                } else {
                    var _obj = '-';
                    tempfinal.push(_obj);
                }
                if (dic.C2[names[i]] != undefined) {
                    var _obj = dic.C2[names[i]];
                    tempfinal.push(_obj);
                } else {
                    var _obj = '-';
                    tempfinal.push(_obj);
                }
                if (dic.C3[names[i]] != undefined) {
                    var _obj = dic.C3[names[i]];
                    tempfinal.push(_obj);
                } else {
                    var _obj = '-';
                    tempfinal.push(_obj);
                }
                // console.log("tempfinal:" + JSON.stringify(tempfinal));
                // var tempObj = {};
                // tempObj[names[i]] = JSON.stringify(tempfinal);
                final.push(tempfinal)
            }
            // console.log(final);
            $scope.orderedListData = angular.copy(final);
            $scope.names = angular.copy(names);
        });

    }]);