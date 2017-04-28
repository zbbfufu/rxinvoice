'use strict';

angular.module('rxinvoiceApp')
    .controller('DashboardCtrl', function ($scope, $location, $filter, $uibModal, Company, Invoice, i18nUtils, Message, Filter, OrderBy, InvoiceQuickEdit) {

        $scope.dates = {
            fromDate: {
                opened: false,
                open: function() {
                    $scope.dates.fromDate.opened = true
                }
            },
            toDate: {
                opened: false,
                open: function() {
                    $scope.dates.toDate.opened = true
                }
            },
            options: {
                formatYear: 'yy',
                startingDay: 1
            },
            format: 'yyyy-MM-dd',
            disabled: function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            }
        };


        var updateDashboard = function() {
            $scope.filter.invoicesBuyerList = {};
            $scope.invoices.splice(0, $scope.invoices.length);

            angular.forEach( $filter('filter')($scope.filter.invoicesList, $scope.filter.filterInvoices), function(value, key) {
                this.push(value);
                $scope.filter.invoicesBuyerList[value.buyer._id] = true;
            }, $scope.invoices);

            $scope.companies.splice(0, $scope.companies.length);
            angular.forEach( $filter('filter')($scope.filter.companiesBuyersList, $scope.filter.filterCompanies), function(value, key) {
                this.push(value);
            }, $scope.companies);
        };

        $scope.i18n = i18nUtils;
        $scope.companies = [];
        $scope.invoices = [];
        $scope.translateStatusLabel = Invoice.translateStatusLabel;
        $scope.generatePdfFilename = Invoice.generatePdfFilename;

        $scope.formatTVAValue = function(vatsAmount){
            var amount = 0;
            for (var i = 0; i < vatsAmount.length; i++) {
                amount += vatsAmount[i].amount;
            }
            return $filter('currency')(amount);
        }

        $scope.displayMode = "list";

        $scope.isListDisplayMode = function() {
            return $scope.displayMode === "list";
        };

        $scope.isTableDisplayMode = function() {
            return $scope.displayMode === "table";
        };

        var fiscalMonth = 3;
        $scope.setCurrentFiscalYear = function() {
            if (moment().isBefore(moment().month(fiscalMonth).date(1))) {
                $scope.filter.criteria.dateMin = moment().month(fiscalMonth).date(1).subtract(1, 'year').toDate();
                $scope.filter.criteria.dateMax = moment().month(fiscalMonth).date(1).toDate();
            } else {
                $scope.filter.criteria.dateMin = moment().month(fiscalMonth).date(1).toDate();
                $scope.filter.criteria.dateMax = moment().month(fiscalMonth).date(1).add(1, 'year').toDate();
            }
        };

        $scope.setCurrentMonth = function() {
            $scope.filter.criteria.dateMin = moment().startOf('month').toDate();
            $scope.filter.criteria.dateMax = moment().add(1, 'month').startOf('month').toDate();
        };


        $scope.toggleDisplayMode = function() {
            if ($scope.displayMode === "list") {
                $scope.displayMode = "table";
            } else if ($scope.displayMode === "table") {
                $scope.displayMode = "list";
            }
        };

        $scope.$watch("filter.criteria.companySelected", function(newValue, oldValue) {
            if (newValue) {
                var companies = $scope.filter.companiesList;
                for (var i = 0, l = companies.length; i < l; i++) {
                    var company = companies[i];
                    if (company._id == newValue) {
                        $scope.filter.businessList = company.business;
                        $scope.filter.businessList.unshift({name: "Toutes", reference: "ALL"});
                        break;
                    }
                }
            }
        });
        $scope.$watch("filter.criteria", function(newValue, oldValue) {
            updateDashboard();
        }, true);

        $scope.filter = Filter.dashboard;
        $scope.orderBy = OrderBy.dashboard;

        Company.findAll(function(data) {
            $scope.filter.companiesList = data;
        });
        Company.findBuyers(function(data) {
            $scope.filter.companiesBuyersList = data;
            updateDashboard();
        });
        Invoice.getAllStatus(function(data) {
            $scope.filter.statusList = [];
            angular.forEach(data, function(value, key) {
                this.push({_id:value, name:$scope.translateStatusLabel(value)});
            }, $scope.filter.statusList);
        });
        $scope.findInvoicesInProgress = false;
        $scope.findInvoices = function() {
            $scope.filter.invoicesList = [];
            $scope.invoices.splice(0, $scope.invoices.length);
            $scope.companies.splice(0, $scope.companies.length);
            $scope.findInvoicesInProgress = true;
            Invoice.findByDates(Filter.dashboard.criteria.dateMin, Filter.dashboard.criteria.dateMax, function(data) {
                $scope.filter.invoicesList = data;
                updateDashboard();
                $scope.findInvoicesInProgress = false;
            });
        };
        $scope.findInvoices();

        $scope.filter.kindList = [];
        angular.forEach(Invoice.getAllKind(), function (value, key) {
            this.push({_id: value, name: Invoice.translateKindLabel(value)});
        }, $scope.filter.kindList);

        $scope.addCompany = function () {
            $location.url('/company/new');
        };

        $scope.editCompany = function() {
            if ($scope.filter.criteria.companySelected) {
                $location.url('/company/' + $scope.filter.criteria.companySelected);
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
            {label: $scope.i18n.translate('invoice.reference.short'), map: "reference", headerClass:"cell-header invoice-reference", cellClass: "cell-content invoice-reference"},
            {label: $scope.i18n.translate('invoice.kind'), map: "kind", formatFunction: Invoice.translateKindLabel, headerClass:"cell-header invoice-reference", cellClass: "cell-content invoice-reference"},
            {label: $scope.i18n.translate('invoice.buyer'), map: "buyer.name", headerClass:"cell-header invoice-buyer", cellClass: "cell-content invoice-buyer"},
            {label: $scope.i18n.translate('invoice.business'), map: "business.name", headerClass:"cell-header invoice-business", cellClass: "cell-content invoice-business"},
            {label: $scope.i18n.translate('invoice.object'), map: "object", headerClass:"cell-header invoice-object", cellClass: "cell-content invoice-object"},
            {label: $scope.i18n.translate('invoice.date'), map: "date", formatFunction: 'date', formatParameter : 'dd/MM/yyyy', headerClass:"cell-header invoice-date", cellClass: "cell-content invoice-date"},
            {label: $scope.i18n.translate('invoice.status'), map:"status", formatFunction: Invoice.translateStatusLabel, headerClass:"cell-header invoice-status", cellClass: "cell-content invoice-status"},
            {label: $scope.i18n.translate('invoice.lines.grossAmount'), map:"grossAmount",  formatFunction: 'currency', formatParameter: '€', headerClass:"cell-header invoice-grossAmount", cellClass:"cell-content cell-number invoice-grossAmount"},
            {label: $scope.i18n.translate('invoice.lines.netAmount'), map:"netAmount",  formatFunction: 'currency', formatParameter: '€', headerClass:"cell-header invoice-netAmount", cellClass:"cell-content cell-number invoice-netAmount"},
            {label: $scope.i18n.translate('invoice.lines.vat'), map:"vatsAmount",  formatFunction: $scope.formatTVAValue, formatParameter: '€', headerClass:"cell-header invoice-netAmount", cellClass:"cell-content cell-number invoice-netAmount"}

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
        };

        $scope.exportData = function () {
            var formatAmount = function(amount) {
                return amount.toLocaleString('fr-FR').replace(/\s/g, '');
            };

            var completeData = '';
            angular.forEach( $scope.invoicesTableColumns, function(item){
                completeData += item.label + ';';
            });
            completeData += '\r\n';
            var row;
            angular.forEach($scope.invoices, function(item){
                var invoiceKind = Invoice.translateKindLabel(item.kind);
                var vatsAmount = 0;
                for (var i = 0; i < item.vatsAmount.length; i++) {
                    vatsAmount += item.vatsAmount[i].amount;
                }
                row = '';
                row += (item.reference ? item.reference : '') + ';';
                row += (invoiceKind ? invoiceKind : '') + ';';
                row += item.buyer.name + ';';
                row += (item.business ? item.business.name : '') + ';';
                row += (angular.isDefined(item.object) && item.object !== null && item.object !== '') ? item.object.replace(/(\r\n|\n|\r)/gm," ").replace(';', ' ') + ';' : " ;" ;
                row += $filter('date')(item.date, 'dd/MM/yyyy') + ';';
                row += Invoice.translateStatusLabel(item.status) + ';';
                row += formatAmount(item.grossAmount, '') + ';';
                row += formatAmount(item.netAmount) + ';';
                row += formatAmount(vatsAmount);
                completeData += row + '\r\n';
            });

            //$scope.toJSON = angular.toJson($scope.invoices);
            var blob = new Blob([completeData], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "Report.xls");
        };

        $scope.open = InvoiceQuickEdit.open;
    });
