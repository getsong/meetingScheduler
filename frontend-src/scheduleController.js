(function () {

    var app = angular.module("meetingScheduler");

    var schedulerController = function ($scope, $routeParams) {
        $scope.participantName;
        $scope.participantPassword;
        $scope.isLoginStage = true;
        $scope.eventId = $routeParams.eventId;

        $scope.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.startTime = new Date(0, 0, 0, 8);
        $scope.endTime = new Date(0, 0, 0, 18);
        $scope.startTimeArr = [];
        for (var time = $scope.startTime; time < $scope.endTime; time = new Date(time.getTime() + 30 * 60 * 1000)) {
            $scope.startTimeArr.push(time);
        }
        $scope.endTimeArr = $scope.startTimeArr.slice(1);
        $scope.endTimeArr.push($scope.endTime);
        $scope.isMouseDown = false;
        $scope.dayIndex = 0;
        $scope.timeIndex = 0;
        $scope.busyState = [];
        for (let dayIndex in $scope.days) {
            dayState = []
            for (let timeIndex in $scope.startTimeArr) {
                dayState.push(false);
            }
            $scope.busyState.push(dayState);
        }

        $scope.mouseDown = function (dayIndex, timeIndex) {
            console.log("mousedown", dayIndex, timeIndex);
            $scope.isMouseDown = true;
            $scope.busyState[dayIndex][timeIndex] = !$scope.busyState[dayIndex][timeIndex];
        };

        $scope.mouseEnter = function (dayIndex, timeIndex) {
            console.log("mouseenter", dayIndex, timeIndex);
            if ($scope.isMouseDown) {
                $scope.busyState[dayIndex][timeIndex] = !$scope.busyState[dayIndex][timeIndex];
            }
        }

        $scope.mouseUp = function () {
            $scope.isMouseDown = false;
            console.log($scope.busyState);
        };

        $scope.login = function () {
            $scope.isLoginStage = false;
        }
    };

    app.controller("ScheduleController", schedulerController);

})();