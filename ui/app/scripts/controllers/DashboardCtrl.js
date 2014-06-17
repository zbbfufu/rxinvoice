'use strict';

angular.module('rxinvoiceApp')
    .controller('DashboardCtrl', function ($scope, $location, Company, Invoice) {

//        $scope.projects = Project.query({archived: false});
        $scope.companies = [];
        $scope.invoices = [];

        $scope.filterCompanies = [];
        $scope.filterProjects = [
            {_id:1, name: 'project 1'},
            {_id:2, name: 'project 2'}
        ];
        Company.findAll(function(data) {
            $scope.filterCompanies = data;
            $scope.companies = data;
        });
        Invoice.findAll(function(data) {
            $scope.invoices = data;
        });

        $scope.addCompany = function () {
//            var project = new Project();
//            project.name = "Projet vide";
//            project.$save(function (response) {
//                $location.url("/project/" + response._id);
//            });
            //TODO implement this method
            alert('Not implemented')
        };
        $scope.addInvoice = function () {
            //TODO implement this method
            alert('Not implemented')
        };

        $scope.orderByFunction = function (list) {
            //TODO implement this method
            return list;
        }
    });
