'use strict';

angular.module('rxInvoice', [
        'ngResource'
    ])


    .factory('Invoice', function ($resource, $http) {
        var res = $resource('/api/invoices/:id', {'id': '@_id'}, {update: {method:'PUT'}, 'get':  {method:'GET', isArray:false}});

        return  angular.extend(res,
            {
                findAll: function(callback){
                    $http.get('/api/invoices')
                        .success(function(data) {
                            if (callback) {
                                callback(data);
                            }
                        });
                }
            });
    }
);
