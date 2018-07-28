(function () {

    var app = angular.module("meetingScheduler");

    var mainController = function ($scope, $logger) {
        $scope.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.startTime = new Date(0, 0, 0, 8, 00);
        $scope.endTime = new Date(0, 0, 0, 5, 00);
        $scope.timeArr = []
        for (var time=$scope.startTime; time<$scope.endTime; time=new Date(time.getTime() + 30 * 60 * 1000)) {
            $scope.timeArr.push(time);
            $logger(time);
        }
        console.log($scope.timeArr);
        // $scope.time = 
    }

    app.controller("MainController", mainController);

})();