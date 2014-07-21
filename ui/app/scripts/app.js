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
  'rxI18n',
  'smartTable.table'
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
    })
    .factory('Message', function(i18nUtils) {
        var getMessage = function(key) {
            return i18nUtils.translate(key);
        };
        return {
            error: function(key, params) {
                var message = getMessage(key);
                alertify.error(message);
                console.log(message, params);
            },
            success: function(key) {
                var message = getMessage(key);
                alertify.success(message);
            }
        }
    })
;
