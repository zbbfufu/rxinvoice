'use strict';

angular.module('rxInvoice', [
        'ngResource'
    ])


    .factory('Invoice', function ($resource, $http, $filter, i18nUtils) {
        var res = $resource('/api/invoices/:id', {'id': '@_id'}, {update: {method:'PUT'}, 'get':  {method:'GET', isArray:false}});
        var status = null;
        var activities = null;

        return  angular.extend(res,
            {
                findByDates: function(minDate, maxDate, callback) {
                    var params = {
                        minDate: moment(minDate).format('YYYY-MM-DD')
                    };
                    if (maxDate) {
                        params.maxDate = moment(maxDate).format('YYYY-MM-DD')
                    }
                    $resource('/api/invoices/dates/:minDate/:maxDate')
                        .query(params)
                        .$promise
                        .then(function(data) {
                            if (callback) {
                                callback(data);
                            }
                        });
                },

                findTasks: function(maxDate, callback) {
                    var params = {
                        maxDate: moment(maxDate).format('YYYY-MM-DD')
                    };

                    $resource('/api/invoices/tasks')
                        .query(params)
                        .$promise
                        .then(function(data) {
                            if (callback) {
                                callback(data);
                            }
                        });
                },

                getAllStatus: function(callback) {
                    if (!status) {
                        $http.get('/api/invoices/status')
                            .success(function(data) {
                                status = data;
                                if (callback) {
                                    callback(data);
                                }
                            });
                    } else if (callback) {
                        callback(status);
                    }
                },

                getAllActivities: function(callback) {
                    if (!activities) {
                        $http.get('/api/invoices/activities')
                            .success(function(data) {
                                activities = data;
                                if (callback) {
                                    callback(data);
                                }
                            });
                    } else if (callback) {
                        callback(activities);
                    }
                },

                getAllKind: function() {
                   return ['SUBCONTRACTING', 'FEE', 'SERVICE', 'BUY_SELL', 'TRAINING', 'HOSTING'];
                },

                translateStatusLabel: function(status) {
                    return i18nUtils.translate('invoice.status.' + status);
                },

                translateActivityLabel: function(activity) {
                    return i18nUtils.translate('invoice.activity.' + activity);
                },

                translateKindLabel: function(kind) {
                    if(!kind){
                        return null;
                    }
                    return i18nUtils.translate('invoice.kind.' + kind);
                },

                generatePdfFilename: function(invoice) {
                    var filename = "";
                    if (invoice) {
                        if (invoice.reference) {
                            filename = invoice.reference;
                        }
                        if (invoice.business && invoice.business.name) {
                            if (filename) {
                                filename += "_";
                            }
                            filename += invoice.business.name;
                        }
                        if (invoice.date) {
                            if (filename) {
                                filename += "_";
                            }
                            filename += $filter('date')(invoice.date, "MMMM yyyy");
                        }
                    }
                    if (!filename) {
                        filename = "print_invoice";
                    }
                    return filename + ".pdf";
                }
            });
    }
);
