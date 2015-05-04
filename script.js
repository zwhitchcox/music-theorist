var app = angular.module('app', ['ngRoute','ngSanitize','ngTouch']);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'views/home.html',
      controller: 'Ctrl'
    }).
    when('/grandstaff', {
      templateUrl: 'views/grand-staff.html',
      controller: 'GSCtrl'
    }).
    otherwise({
      redirectTo: '/'
    })
  }])
