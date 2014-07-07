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
  'rxCompany',
  'rxI18n'
])
.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/dashboard.html'
        })
        .when('/login', {
            templateUrl: 'views/login.html'
        })
        .when('/company/:id', {
            templateUrl: 'views/company.html'
        })
        .when('/invoice/:id', {
            templateUrl: 'views/invoice.html'
        })
        .when('/invoice_view/:id', {
            templateUrl: 'views/invoice_view.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
