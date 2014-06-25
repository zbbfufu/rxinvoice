'use strict';

angular.module('rxCompany', [
        'ngResource'
    ])

    .factory('Company', function ($resource, $http) {
        var res = $resource('/api/companies/:id', {'id': '@_id'}, {update: {method:'PUT'}, 'get':  {method:'GET', isArray:false}});

        return  angular.extend(res,
            {
                findAll: function(callback) {
                    $http.get('/api/companies')
                        .success(function(data) {
                            if (callback) {
                                callback(data);
                            }
                        });
                },
                findBuyers: function(callback) {
                    $http.get('/api/companies/buyers')
                        .success(function(data) {
                            if (callback) {
                                callback(data);
                            }
                        });
                }
            });
    }
);
