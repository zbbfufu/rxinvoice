'use strict';

angular.module('rxInvoiceQuickEdit', ['rxInvoice', 'ui.bootstrap'])
    .factory('InvoiceQuickEdit', function (Invoice, $uibModal, Message) {
        var statusList = [];
        Invoice.getAllStatus(function(data) {
            statusList = [];
            angular.forEach(data, function(value, key) {
                this.push({_id:value, name:Invoice.translateStatusLabel(value)});
            }, statusList);
        });

        var open = function (invoice) {
            var modalInstance = $uibModal.open({
                templateUrl: '../views/templates/invoice-quick-edit.html',
                controller: 'InvoiceQuickEditCtrl',
                resolve: {
                    invoice: function() {
                        return invoice;
                    },
                    statusList: function () {
                        return statusList;
                    }
                }
            });

            modalInstance.result.then(
                function (quickEdition) { //OK
                    invoice.status = quickEdition.statusSelected;
                    invoice.comment = quickEdition.comment;
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

        return {
            open: open
        };
    });
