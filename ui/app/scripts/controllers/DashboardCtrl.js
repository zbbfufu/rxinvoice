'use strict';

angular.module('rxinvoiceApp')
    .controller('DashboardCtrl', function ($scope, $location, $filter, $modal, Company, Invoice, i18nUtils, Message, Filter, OrderBy) {

        $scope.i18n = i18nUtils;
        $scope.companies = [];
        $scope.invoices = [];
        $scope.translateStatusLabel = Invoice.translateStatusLabel;

        var displayMode = "list";

        $scope.isListDisplayMode = function() {
            return displayMode === "list";
        };

        $scope.isTableDisplayMode = function() {
            return displayMode === "table";
        };


        $scope.toggleDisplayMode = function() {
            if (displayMode === "list") {
                displayMode = "table";
            } else if (displayMode === "table") {
                displayMode = "list";
            }
        };

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
        $scope.filter = Filter.dashboard;
        $scope.orderBy = OrderBy.dashboard;

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

        $scope.editCompany = function() {
            if ($scope.filter.companySelected) {
                $location.url('/company/' + $scope.filter.companySelected);
            }
        };

        $scope.addInvoice = function () {
            $location.url('/invoice/new');
        };

        $scope.nbCompanies = function () {
            var companies = $filter('filter')($scope.companies, $scope.filter.filterCompanies);
            return companies.length;
        };

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
        };

        $scope.nbInvoices = function () {
            var invoices = $filter('filter')($scope.invoices, $scope.filter.filterInvoices);
            return invoices.length;
        };

        $scope.totalInvoices = function () {
            var total = 0;
            var invoices = $filter('filter')($scope.invoices, $scope.filter.filterInvoices);
            for (var i = 0, l = invoices.length; i < l; i++) {
                total += invoices[i].grossAmount;
            }
            return total;
        };


        $scope.getCompanies = function() {
            return $scope.company;
        };

        $scope.invoicesTableConfig = {
            isPaginationEnabled: false,
//            isGlobalSearchActivated: true,
            selectionMode: 'single'
        };

        $scope.$on('selectionChange', function (event, args) {
            $location.url("/invoice/" + args.item._id)
        });

        $scope.invoicesTableColumns = [
            {label: $scope.i18n.translate('invoice.buyer'), map: "buyer.name", headerClass:"cell-header invoice-buyer", cellClass: "cell-content invoice-buyer"},
            {label: $scope.i18n.translate('invoice.business'), map: "business.name", headerClass:"cell-header invoice-business", cellClass: "cell-content invoice-business"},
            {label: $scope.i18n.translate('invoice.object'), map: "object", headerClass:"cell-header invoice-object", cellClass: "cell-content invoice-object"},
            {label: $scope.i18n.translate('invoice.reference.short'), map:"reference", headerClass:"cell-header invoice-reference", cellClass: "cell-content invoice-reference"},
            {label: $scope.i18n.translate('invoice.date'), map: "date", formatFunction: 'date', formatParameter : 'dd/MM/yyyy', headerClass:"cell-header invoice-date", cellClass: "cell-content invoice-date"},
            {label: $scope.i18n.translate('invoice.status'), map:"status", formatFunction: $scope.translateStatusLabel, headerClass:"cell-header invoice-status", cellClass: "cell-content invoice-status"},
            {label: $scope.i18n.translate('invoice.lines.grossAmount'), map:"grossAmount",  formatFunction: 'currency', formatParameter: '€', headerClass:"cell-header invoice-grossAmount", cellClass:"cell-content cell-number invoice-grossAmount"}

        ];

        $scope.deleteInvoice = function(invoice) {
            Message.dialog.confirm("message.invoice.delete.confirm", function (answer) {
                if (answer) {
                    Invoice.remove({id: invoice._id}, invoice).$promise
                        .then(function() {
                            Message.success('message.invoice.delete.success');
                        })
                        .catch(function() {
                            Message.error('message.invoice.delete.error');
                        });
                }
            });
        }




        $scope.open = function (invoice) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    invoice: function() {
                        return invoice;
                    },
                    statusList: function () {
                        return $scope.filter.statusList;
                    }
                }
            });

            modalInstance.result.then(
                function (quickEdition) { //OK
                    invoice.status = quickEdition.statusSelected;
                    Invoice.update({id:invoice._id}, invoice,
                        function(data) {
                            Message.success('message.invoice.update.success');
                        },
                        function() {
                            Message.error('message.invoice.update.error', invoice);
                        }
                    );
                },
                function () {} //CANCEL
            );
        };
    })

    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, invoice, statusList) {

        $scope.statusList = statusList;
        $scope.quickEdition = {
            reference: invoice.reference,
            statusSelected: invoice.status
        }

        $scope.ok = function () {
            $modalInstance.close($scope.quickEdition);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
;
