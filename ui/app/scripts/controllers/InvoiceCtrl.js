'use strict';

angular.module('rxinvoiceApp')
    .controller('InvoiceCtrl', function ($scope, $routeParams, $location, $filter, Invoice, Company, i18nUtils, Message, Sessions) {

        if ($location.url().match('^/invoice_view/*')) {
            angular.element('header').hide();
            angular.element('body').addClass('print');
            $scope.viewMode = true;
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

        $scope.$watch("companies.seller", function(newValue, oldValue) {
            if ($scope.invoice && newValue) {
                $scope.companies.load(newValue, $scope.invoice.seller, false);
            }
        });
        $scope.$watch("companies.buyer", function(newValue, oldValue) {
            if ($scope.invoice && newValue) {
                $scope.companies.load(newValue, $scope.invoice.buyer, $scope.newMode);
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
                    company.showLegalNoticeForeignBuyer = selected.showLegalNoticeForeignBuyer;
                    company.address.body = selected.address.body;
                    company.address.zipCode = selected.address.zipCode;
                    company.address.city = selected.address.city;
                    company.address.country = selected.address.country;
                    this.businessList = selected.business;
                    if  (this.businessList.length == 1) {
                        this.business = this.businessList[0].reference;
                    } else {
                        if ($scope.invoice.buyer._id === company._id && !!$scope.invoice.business) {
                            this.business = $scope.invoice.business.reference;
                        } else {
                            this.business = null;
                        }
                    }
                    if (loadDefaultVat) {
                        if (_.isEmpty(selected.vats)) {
                            selected.vats = [];
                        }
                        selected.vats.push({amount: 20, vat: "Taux normal 20 %"});
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
        };

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
            invoice.totalVatAmount = invoice.netAmount - invoice.grossAmount;
            $scope.invoice = invoice;

            if (!$scope.viewMode) {
                $scope.companies.seller = invoice.seller._id;
                $scope.companies.buyer = invoice.buyer._id;
                $scope.companies.business = invoice.business ? invoice.business.reference : null;
            }
            $scope.date = $filter('date')(invoice.date, 'yyyy-MM-dd');
        };

        $scope.save = function() {
            var invoice = _.cloneDeep($scope.invoice);
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
        $scope.edit = function(id) {
            $location.url('/invoice/' + (id ? id : $routeParams.id));
        };

        Company.findAll(function(data) {
            $scope.companies.list = data;

            if ($scope.newMode) {
                var currentUser = Sessions.getCurrentUser();
                var defaultCompanyRef = currentUser ? currentUser.companyRef : null;
                var seller;

                if (!!defaultCompanyRef) {
                    seller = _.cloneDeep(
                        _.find(data, function(cmp) {
                            return cmp._id = defaultCompanyRef;
                        })
                    );
                } else {
                    seller = {
                        name : "",
                        address : {}
                    };
                }

                loadInvoice({
                    date : new Date().toLocaleDateString(),
                    status: 'DRAFT',
                    withVAT: true,
                    seller : seller,
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
                    },
                    function() {
                        $location.url('/');
                        Message.error('message.invoice.load.error', $routeParams.id);
                    }
                );
            }
        });
    });
