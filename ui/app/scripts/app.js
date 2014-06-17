'use strict';

angular.module('rxinvoiceApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.select2',
  'ui.bootstrap',
  'rxSession',
  'rxInvoice',
  'rxCompany'
])
  .config(function ($routeProvider) {
    $routeProvider
//      .when('/', {
//        templateUrl: 'views/main.html',
//        controller: 'MainCtrl'
//      })
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
