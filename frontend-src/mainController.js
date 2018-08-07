(function () {

    var app = angular.module("meetingScheduler");

    var mainController = function ($scope) {
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

        // $scope.createEvent = function () {
        //     $http.post()
        // }
    };

    app.controller("MainController", mainController);

})();