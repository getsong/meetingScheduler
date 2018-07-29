(function () {

    var app = angular.module("meetingScheduler");

    var mainController = function ($scope, $log) {
        $scope.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.startTime = new Date(0, 0, 0, 8);
        $scope.endTime = new Date(0, 0, 0, 17);
        $scope.startTimeArr = []
        for (var time=$scope.startTime; time<$scope.endTime; time=new Date(time.getTime() + 30 * 60 * 1000)) {
            $scope.startTimeArr.push(time);
        }
        $scope.endTimeArr = $scope.startTimeArr.slice(1);
        $scope.endTimeArr.push($scope.endTime);
    }

    app.controller("MainController", mainController);

})();