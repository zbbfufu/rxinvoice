'use strict';

angular.module('rxInvoiceQuickEdit')
    .controller('InvoiceQuickEditCtrl', function ($scope, $uibModalInstance, invoice, statusList) {

        $scope.statusList = statusList;
        $scope.quickEdition = {
            reference: invoice.reference,
            statusSelected: invoice.status,
            comment : invoice.comment
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.quickEdition);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
