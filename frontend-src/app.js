(function() {

    var app = angular.module("meetingScheduler", ["ngRoute"]);

    app.config(function($routeProvider) {
        $routeProvider
        .when("/main", {
            templateUrl: "main.html",
            controller: "MainController"
        })
        .when("/schedule", {
            templateUrl: "schedule.html",
            controller: "ScheduleController"
        })
        .otherwise({ redirectTo: "/main" });
    });

})();