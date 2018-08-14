(function () {

    var app = angular.module("meetingScheduler");

    var schedulerController = function ($scope, $routeParams, $http) {
        $scope.participantName;
        $scope.participantPassword;
        $scope.isLoginStage = true;
        $scope.eventId = $routeParams.eventId;

        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $http.get("http://localhost:8001/event/" + $scope.eventId)
            .then(function (response) {
                $scope.days = []
                let data = response.data[0];
                for (let day of days) {
                    if (data[day]["data"][0] == 1) {
                        $scope.days.push(day);
                    }
                }
                console.log($scope.days)
            });

        $scope.startTime = new Date(0, 0, 0, 8);
        $scope.endTime = new Date(0, 0, 0, 18);
        $scope.startTimeArr = [];
        for (var time = $scope.startTime; time < $scope.endTime; time = new Date(time.getTime() + 30 * 60 * 1000)) {
            $scope.startTimeArr.push(time);
        }
        $scope.endTimeArr = $scope.startTimeArr.slice(1);
        $scope.endTimeArr.push($scope.endTime);
        $scope.isMouseDown = false;
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
            var data = [
                [$scope.participantName, $scope.participantPassword, $scope.eventId]
            ];
            $http.post("http://localhost:8001/participant", data)
                .then(function (response) {
                    $scope.participantId = response.data;
                    console.log(response.data);
                });
            $scope.isLoginStage = false;
        }
    };

    app.controller("ScheduleController", schedulerController);

})();