var app = angular.module('app', ['ngRoute','ngSanitize','ngTouch']);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'views/home.html',
      controller: 'Ctrl'
    }).
    when('/note-names', {
      templateUrl: 'views/note-names.html',
      controller: 'NNCtrl'
    }).
    when('/scales', {
      templateUrl: 'views/scales.html',
      controller: 'ScalesCtrl'
    }).
    when('/scale-formulas', {
      templateUrl: 'views/scale-formulas.html',
      controller: 'SFCtrl'
    }).
    otherwise({
      redirectTo: '/'
    })
  }])
