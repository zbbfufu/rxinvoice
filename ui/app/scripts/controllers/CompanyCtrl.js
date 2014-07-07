'use strict';

angular.module('rxinvoiceApp')
    .controller('CompanyCtrl', function ($scope, $routeParams, $location, $filter, Company, i18nUtils) {

        $scope.i18n = i18nUtils;

        $scope.company = null;
        Company.get({id:$routeParams.id},
            function(data) {
                $scope.company = data;
            },
            function() {
                $location.url('/');
            }
        );

        $scope.business = {
            reference: '',
            name: '',
            add: function() {
                if (this.reference && this.name) {
                    $scope.company.business.push({reference: this.reference, name: this.name});
                    this.reference = '';
                    this.name = '';
                }
            },
            remove: function(index) {
                $scope.company.business.splice(index, 1);
            }
        };

        $scope.save = function() {
            Company.update({id:$routeParams.id}, $scope.company,
                function(data) {
                    $scope.company = data;
                    alertify.success("Company saved");
                },
                function() {
                    alertify.error("Company can not saved");
                }
            );
        }
    });
