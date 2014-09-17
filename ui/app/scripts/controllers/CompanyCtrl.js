'use strict';

angular.module('rxinvoiceApp')
    .controller('CompanyCtrl', function ($scope, $routeParams, $location, $filter, Company, i18nUtils, Message) {
        var loadCompany = function(company) {
            $scope.company = company;
        };

        $scope.newMode = $routeParams.id == 'new';
        $scope.i18n = i18nUtils;
        $scope.company = null;

        $scope.business = {
            reference: '',
            name: '',
            add: function() {
                if (this.name) {
                    $scope.company.business.push({reference: this.reference, name: this.name});
                    this.reference = '';
                    this.name = '';
                }
            },
            remove: function(index) {
                $scope.company.business.splice(index, 1);
            }
        };
        $scope.vats = {
            vat: '',
            amount: '',
            add: function() {
                if (this.vat && this.amount) {
                    $scope.company.vats.push({vat: this.vat, amount: this.amount});
                    this.vat = '';
                    this.amount = '';
                }
            },
            remove: function(index) {
                $scope.company.vats.splice(index, 1);
            }
        };

        $scope.save = function() {
            var company = $scope.company;
            if ($scope.newMode) {
                Company.save(company,
                    function(data) {
                        $location.url('/company/' + data._id);
                        Message.success('message.company.create.success');
                    },
                    function() {
                        Message.error('message.company.create.error', company);
                    }
                );
            } else {
                Company.update({id:$routeParams.id}, company,
                    function(data) {
                        $scope.company = data;
                        Message.success('message.company.update.success');
                    },
                    function() {
                        Message.error('message.company.update.error', company);
                    }
                );
            }
        }

        if ($scope.newMode) {
            loadCompany({
                address : {},
                business: []
            });
        } else {
            Company.get({id:$routeParams.id},
                function(data) {
                    loadCompany(data);
                },
                function() {
                    Message.error('message.company.load.error', $routeParams.id);
                    $location.url('/');
                }
            );
        }
    });
