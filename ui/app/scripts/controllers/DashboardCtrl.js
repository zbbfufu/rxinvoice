'use strict';

angular.module('rxinvoiceApp')
    .controller('DashboardCtrl', function ($scope, $location, $filter, Company, Invoice, i18nUtils) {

        $scope.companies = [];
        $scope.invoices = [];
        $scope.translateStatusLabel = Invoice.translateStatusLabel;

        $scope.$watch("filter.companySelected", function(newValue, oldValue) {
            if (newValue) {
                var companies = $scope.filter.companiesList;
                for (var i = 0, l = companies.length; i < l; i++) {
                    var company = companies[i];
                    if (company._id == newValue) {
                        $scope.filter.businessList = company.business;
                        break;
                    }
                }
            }
        });
        $scope.filter = {
            searchText: '',
            businessSelected: '',
            companySelected: '',
            statusSelected: null,

            companiesList: [],
            businessList: [],
            statusList: [],


            selectCompany: function(company) {
                $scope.filter.companySelected = company._id;
                $scope.filter.businessSelected = '';
                $scope.filter.businessList = company.business;
            },
            selectBusiness: function(business) {
                $scope.filter.businessSelected = business.reference;
            },
            selectBusinessFromInvoice: function(invoice) {
                if (invoice && invoice.business && invoice.business.reference) {
                    $scope.filter.companySelected = invoice.buyer._id;
                    $scope.filter.businessSelected = invoice.business.reference;
                }
            },
            clearCompany: function() {
                $scope.filter.companySelected = '';
                $scope.filter.businessSelected = '';
                $scope.filter.businessList = [];
            },
            clearStatus: function() {
                $scope.filter.statusSelected = '';
            },

            filterCompanies: function(value) {
                return !$scope.filter.companySelected || $scope.filter.companySelected == value._id;
            },
            filterInvoices: function(value) {
                var ret =
                    (!$scope.filter.companySelected || (value.buyer && $scope.filter.companySelected == value.buyer._id)) &&
                    (!$scope.filter.statusSelected || $scope.filter.statusSelected == value.status) &&
                    (!$scope.filter.businessSelected || (value.business && $scope.filter.businessSelected == value.business.reference));
                return ret;
            }
        };

        Company.findAll(function(data) {
            $scope.filter.companiesList = data;
        });
        Company.findBuyers(function(data) {
            $scope.companies = data;
        })
        Invoice.findAll(function(data) {
            $scope.invoices = data;
        });
        Invoice.getAllStatus(function(data) {
            angular.forEach(data, function(value, key) {
                this.push({_id:value, name:$scope.translateStatusLabel(value)});
            }, $scope.filter.statusList);
        });

        $scope.addCompany = function () {
            $location.url('/company/new');
        };
        $scope.addInvoice = function () {
            $location.url('/invoice/new');
        };

        $scope.orderByFunction = function (list) {
            //TODO implement this method
            return list;
        }

        $scope.nbCompanies = function () {
            var companies = $filter('filter')($scope.companies, $scope.filter.filterCompanies);
            return companies.length;
        }
        $scope.nbBusiness = function () {
            var total = 0;
            var companies = $filter('filter')($scope.companies, $scope.filter.filterCompanies);
            for (var i = 0, l = companies.length; i < l; i++) {
                var company = companies[i];
                if (company.business) {
                    total += company.business.length;
                }
            }
            return total;
        }

        $scope.nbInvoices = function () {
            var invoices = $filter('filter')($scope.invoices, $scope.filter.filterInvoices);
            return invoices.length;
        }
        $scope.totalInvoices = function () {
            var total = 0;
            var invoices = $filter('filter')($scope.invoices, $scope.filter.filterInvoices);
            for (var i = 0, l = invoices.length; i < l; i++) {
                total += invoices[i].grossAmount;
            }
            return total;
        }


        $scope.getCompanies = function() {
            return $scope.company;
        }
    });
