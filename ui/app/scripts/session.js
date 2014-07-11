'use strict';

angular.module('rxSession', [
        'ngResource',
        'angular-md5'
    ])

    .config(function($httpProvider) {
        $httpProvider.responseInterceptors.push('SecurityHttpInterceptor');
    })

    .factory('SecurityHttpInterceptor', function($q, $location) {
        return function(promise) {
            return promise.then(function(response) {
                return response;
            }, function(response) {
                if (response.status == 401 || response.status == 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            });
        }
    })
    .factory('Sessions', function($resource, $http, md5) {
        var res = $resource('/api/sessions/:sessionKey', {sessionKey: 'current'});
        var currentUser = null;
        res.get(function(data) {
            currentUser = data;
        });
        return angular.extend(res, {
            getCurrentUser: function() {
                return currentUser ? currentUser.principal : null;
            },
            authenticate: function(username, password, callback, callbackError) {
                $http.post('/api/sessions', {principal: {name: username, passwordHash: md5.createHash(password)}})
                    .success(function(data, status, headers, config) {
                        currentUser = data;
                        if (callback) {
                            callback();
                        }
                    }).error(function(data, status, headers, config) {
                        currentUser = null;
                        if (callbackError) {
                            callbackError();
                        }
                    });
            },
            logout: function() {
                res.delete(function() {
                    location.reload();
                    currentUser = null;
                });
            }
        });
    })

    .controller('SessionController', function($scope, Sessions) {
        $scope.session = Sessions;
        $scope.openPasswordPopup = function() {
            alertify.log('TODO : Not implemented');
        };
    })
    .controller('LoginCtrl', function ($scope, $location, Sessions, i18nUtils) {
        $scope.authenticate = function(username, password) {
            Sessions.authenticate(
                username ? username : angular.element('#login-username').val(),
                password ? password : angular.element('#login-password').val(),
                function() {
                    $location.url('/');
                    alertify.success(i18nUtils.translate('login.authenticate.success'));
                }, function() {
                    alertify.error(i18nUtils.translate('login.authenticate.error'));
                }
            );
        }
    })
;