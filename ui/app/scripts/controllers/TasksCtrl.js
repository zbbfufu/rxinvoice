'use strict';

angular.module('rxinvoiceApp')
    .controller('TasksCtrl', function ($scope, $location, Invoice, i18nUtils) {

        $scope.i18n = i18nUtils;
        $scope.invoices = [];

        $scope.findInvoicesInProgress = false;

        var findInvoices = function(maxDate) {
            $scope.findInvoicesInProgress = true;

            Invoice.findTasks(maxDate, function(data) {
                $scope.invoices = data;

                _.each($scope.invoices, function (invoice) {
                    switch (invoice.status) {
                        case 'DRAFT':
                            invoice.isInWarning = Math.abs(moment(invoice.date).diff(moment(), 'days')) > 10;
                            break;
                        case 'WAITING_VALIDATION':
                            invoice.isInWarning = Math.abs(moment(invoice.date).diff(moment(), 'days')) > 20;
                            break;
                        case 'SENT':
                            invoice.isInWarning = Math.abs(moment(invoice.date).diff(moment(), 'days')) > 90;
                            break;
                        default:
                            console.error(invoice.status + " should not be here !");
                    }
                });

                $scope.findInvoicesInProgress = false;
            });
        };

        findInvoices(new Date());

        $scope.invoicesTableConfig = {
            isPaginationEnabled: false,
//            isGlobalSearchActivated: true,
            selectionMode: 'single'
        };

        $scope.$on('selectionChange', function (event, args) {
            $location.url("/invoice/" + args.item._id);
        });

        $scope.invoicesTableColumns = [
            {label: 'Warning', map: "isInWarning", cellTemplateUrl: "../views/templates/warning-cell.html"},
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
    });

