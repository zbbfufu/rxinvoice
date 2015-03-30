'use strict';

angular.module('rxCompany', [
        'ngResource'
    ])

    .factory('Company', function ($resource, $http, i18nUtils) {
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
                },

                getAllKind: function() {
                    return ['EDITOR', 'INHOUSE_SOLUTION_EDITOR', 'MAJOR_ACCOUNT', 'PME', 'FINAL_RECIPIENT' ];
                },
                translateKindLabel: function(status) {
                    return i18nUtils.translate('company.kind.' + status);
                }
            });
    }
);
