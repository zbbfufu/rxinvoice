'use strict';

angular.module('rxinvoiceApp')
    .controller('InvoiceCtrl', function ($scope, $routeParams, $location, $filter, Invoice, Company, i18nUtils, Message) {

        if ($location.url().match('^/invoice_view/*')) {
            angular.element('header').hide();
        }

        $scope.newMode = $routeParams.id == 'new';
        $scope.i18n = i18nUtils;

        $scope.invoice = null;

        $scope.status = [];
        Invoice.getAllStatus(function(data) {
            angular.forEach(data, function(value, key) {
                this.push({_id:value, name:Invoice.translateStatusLabel(value)});
            }, $scope.status);
        });

        $scope.$watch("lines.newLine.quantity", function(newValue, oldValue) {
            $scope.lines.updateGrossAmount($scope.lines.newLine);
        });
        $scope.$watch("lines.newLine.unitCost", function(newValue, oldValue) {
            $scope.lines.updateGrossAmount($scope.lines.newLine);
        });
        $scope.lines = {
            newLine: {
                description: '',
                quantity: '',
                unitCost: '',
                grossAmount: '',
                vat: null
            },
            updateGrossAmount: function(line) {
                if (line.quantity && line.unitCost) {
                    line.grossAmount = line.quantity * line.unitCost;
                } else {
                    line.grossAmount = '';
                }
            },
            add: function() {
                var line = this.newLine;
                if (line.description) {
                    $scope.invoice.lines.push(angular.copy(line));
                    line.description = '';
                    line.quantity = '';
                    line.unitCost = '';
                    line.grossAmount = '';
                }
                angular.element('#newLineDescription').trigger('focus');
            },
            remove: function(index) {
                $scope.invoice.lines.splice(index, 1);
            }
        };

        $scope.vats = {
            newVat: {
                amount: '',
                vat: ''
            },

            add: function() {
                var vat = this.newVat;
                if (vat.amount && vat.vat) {
                    $scope.invoice.vats.push(angular.copy(vat));
                    vat.amount = '';
                    vat.vat = '';
                }
            },
            remove: function(index) {
                $scope.invoice.vats.splice(index, 1);
            }
        };

        Company.findAll(function(data) {
            $scope.companies.list = data;
        });
        $scope.$watch("companies.seller", function(newValue, oldValue) {
            if ($scope.invoice && newValue) {
                $scope.companies.load(newValue, $scope.invoice.seller, true);
            }
        });
        $scope.$watch("companies.buyer", function(newValue, oldValue) {
            if ($scope.invoice && newValue) {
                $scope.companies.load(newValue, $scope.invoice.buyer, false);
            }
        });
        $scope.companies = {
            list: [],
            businessList: [],
            seller: null,
            buyer: null,
            business: null,
            load: function(selectedId, company, loadDefaultVat) {
                var selected = $scope.companies.findCompanyById(selectedId);
                if (selected && company) {
                    company._id = selected._id;
                    company.name = selected.name;
                    company.legalNotice = selected.legalNotice;
                    company.address.body = selected.address.body;
                    company.address.zipCode = selected.address.zipCode;
                    company.address.city = selected.address.city;
                    company.address.country = selected.address.country;
                    this.businessList = selected.business;
                    if  (this.businessList.length == 1) {
                        this.business = this.businessList[0].reference;
                    } else {
                        this.business = null;
                    }
                    if (loadDefaultVat) {
                        $scope.invoice.vats = angular.copy(selected.vats);
                    }
                }
            },
            findCompanyById: function(id) {
                for (var index = 0, length = this.list.length; index < length; index++) {
                    var company = this.list[index];
                    if (company._id == id) {
                        return company;
                    }
                }
                return null;
            },
            findBusinessByRef: function(reference) {
                for (var index = 0, length = this.businessList.length; index < length; index++) {
                    var business = this.businessList[index];
                    if (business.reference == reference) {
                        return business;
                    }
                }
                return null;
            }
        }

        var findVatByAmount = function(amount) {
            var invoice = $scope.invoice;
            for (var index = 0, length = invoice.vats.length; index < length; index++) {
                var vat = invoice.vats[index];
                if (vat.amount == amount) {
                    return vat;
                };
            }
            return null;
        };
        var loadInvoice = function(invoice) {
            for (var index = 0, length = invoice.lines.length; index < length; index++) {
                var line = invoice.lines[index];
                if (angular.isObject(line.vat)) {
                    line.vat = line.vat.amount;
                }

            }
            $scope.invoice = invoice;
            $scope.companies.seller = invoice.seller._id;
            $scope.companies.buyer = invoice.buyer._id;
            $scope.companies.business = invoice.business ? invoice.business.reference : null;
            $scope.date = $filter('date')(invoice.date, 'dd-MM-yyyy');
        };

        $scope.save = function() {
            var invoice = $scope.invoice;
            invoice.business = $scope.companies.findBusinessByRef($scope.companies.business);
            invoice.date = new Date($scope.date);
            for (var index = 0, length = invoice.lines.length; index < length; index++) {
                var line = invoice.lines[index];
                if (!angular.isObject(line.vat)) {
                    $scope.lines.updateGrossAmount(line);
                    line.vat = findVatByAmount(line.vat);
                }
            }
            if ($scope.newMode) {
                Invoice.save(invoice,
                    function(data) {
                        $scope.edit(data._id);
                        Message.success('message.invoice.create.success');
                    },
                    function() {
                        Message.error('message.invoice.create.error', invoice);
                    }
                );
            } else {
                Invoice.update({id:$routeParams.id}, invoice,
                    function(data) {
                        $scope.edit(data._id);
                        Message.success('message.invoice.update.success');
                    },
                    function() {
                        Message.error('message.invoice.update.error', invoice);
                    }
                );
            }
        };

        $scope.view = function(id) {
            window.open('/#/invoice_view/' + (id ? id : $routeParams.id));
        };
        $scope.edit = function() {
            $location.url('/invoice/' + $routeParams.id);
        };


        if ($scope.newMode) {
            loadInvoice({
                date : new Date().toLocaleDateString(),
                status: 'DRAFT',
                withVAT: true,
                seller : {
                    name : "",
                    address : {}
                },
                buyer : {
                    name : "",
                    address : {}
                },
                vats : [],
                business : {},
                lines : []
            });
        } else {
            Invoice.get({id:$routeParams.id},
                function(data) {
                    loadInvoice(data);
                    Message.success('message.invoice.load.success');
                },
                function() {
                    $location.url('/');
                    Message.error('message.invoice.load.error', $routeParams.id);
                }
            );
        }
    });
