(function () {

    var app = angular.module("meetingScheduler");

    var mainController = function ($scope) {
        $scope.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    };

    app.controller("MainController", mainController);

})();