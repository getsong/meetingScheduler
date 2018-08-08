(function () {

    var app = angular.module("meetingScheduler");

    var mainController = function ($scope, $http) {
        $scope.eventName;
        $scope.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.selectedDays = []
        $scope.isMouseDown = false;
        for (var i = 0; i < 7; i++) {
            $scope.selectedDays.push(false);
        }

        $scope.mouseDown = function (index) {
            $scope.isMouseDown = true;
            $scope.selectedDays[index] = !$scope.selectedDays[index];
        };

        $scope.mouseEnter = function (index) {
            if ($scope.isMouseDown) {
                $scope.selectedDays[index] = !$scope.selectedDays[index];
            }
        };

        $scope.mouseUp = function () {
            $scope.isMouseDown = false;
            console.log($scope.selectedDays);
        };

        $scope.createEvent = function () {
            var data = $scope.selectedDays.slice();
            data.unshift($scope.eventName);
            formattedData = []
            formattedData.push(data)
            $http.post("http://localhost:8001/event", formattedData);
        }
    };

    app.controller("MainController", mainController);

})();