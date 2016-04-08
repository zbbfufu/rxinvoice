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
        $scope.translateKindLabel = Invoice.translateKindLabel;

        $scope.status = [];
        $scope.kinds = [];
        Invoice.getAllStatus(function(data) {
            angular.forEach(data, function(value, key) {
                this.push({_id:value, name:Invoice.translateStatusLabel(value)});
            }, $scope.status);
        });

            angular.forEach(Invoice.getAllKind(), function(value) {
                this.push({_id:value, name:Invoice.translateKindLabel(value)});
            }, $scope.kinds);

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
                    company.fullName = selected.fullName;
                    company.detail = selected.detail;
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
            $scope.date = moment(invoice.date).toDate();

            $scope.activities.load(invoice);
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
            $scope.activities.save(invoice);
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
                Invoice.update({id:invoice._id}, invoice,
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

        $scope.view = function() {
            window.open('/api/print?' +
                'pageUri=/invoice_view/' + $scope.invoice._id +
                '&filename=' + Invoice.generatePdfFilename($scope.invoice));
        };
        $scope.edit = function(id) {
            $location.url('/invoice/' + (id ? id : $routeParams.id));
        };
        $scope.copy = function(id) {
            var copy = {
                reference: '',
                date : new Date().toLocaleDateString(),
                status: 'DRAFT',
                withVAT: angular.copy($scope.invoice.withVAT),
                object: angular.copy($scope.invoice.object),
                comment: angular.copy($scope.invoice.comment),
                seller :  angular.copy($scope.invoice.seller),
                buyer : angular.copy($scope.invoice.buyer),
                vats : angular.copy($scope.invoice.vats),
                business : angular.copy($scope.invoice.business),
                lines : angular.copy($scope.invoice.lines)
            }
            $scope.newMode = true;
            loadInvoice(copy);
        };

        var getUserCompany = function() {
            var currentUser = Sessions.getCurrentUser();
            var defaultCompanyRef = currentUser ? currentUser.companyRef : null;
            var seller;

            if (!!defaultCompanyRef) {
                seller = _.cloneDeep(
                    _.find($scope.companies.list, function(cmp) {
                        return cmp._id == defaultCompanyRef;
                    })
                );
            } else {
                seller = {
                    name : "",
                    address : {}
                };
            }
            return seller;
        }

        Company.findAll(function(data) {
            $scope.companies.list = data;

            if ($scope.newMode) {


                loadInvoice({
                    date : moment().toDate(),
                    status: 'DRAFT',
                    withVAT: true,
                    seller : getUserCompany(),
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

        $scope.activities = {
            mode: 'NONE',
            data: [],
            new: {
                activityId: null,
                value: 100
            },

            load: function(invoice) {
                if (invoice.activities) {
                    if (invoice.activities.length > 1) {
                        $scope.activities.modeMulti();
                    } else if (invoice.activities.length == 1) {
                        $scope.activities.modeSingle();
                        $scope.activities.new.activityId = invoice.activities[0].activity;
                    } else {
                        $scope.activities.modeSingle();
                    }
                } else {
                    $scope.activities.modeSingle();
                }
            },
            save: function(invoice) {
                if ($scope.activities.mode == 'SINGLE') {
                    invoice.activities = [{activity: $scope.activities.new.activityId, value:100}]
                }
            },
            modeMulti: function() {
                $scope.activities.mode = 'MULTI';
                $scope.activities.new.value = 100 - $scope.activities.total();
            },
            modeSingle: function() {
                $scope.activities.mode = 'SINGLE';
                $scope.activities.new.value = 100;
            },
            translate: function(activityId) {
                return Invoice.translateActivityLabel(activityId);
            },
            total: function() {
                var total = 0;
                angular.forEach($scope.invoice.activities, function(value, key) {
                    total += value.value;
                });
                return total;
            },
            findById: function(id) {
                var activity = null;
                for (var index = 0; index < $scope.activities.data.length; index++) {
                    activity = $scope.activities.data[index];
                    if (activity._id == id) {
                        return activity;
                    }
                }
                return null;
            },
            add: function() {
                var activity = $scope.activities.new.activityId;
                var value = Number($scope.activities.new.value);
                if (!activity || !value) {
                    return;
                }
                var total = $scope.activities.total();
                console.log((total + value));
                console.log(100 < (total + value));
                if (100 < (total + value)) {
                    return;
                }
                if (!$scope.invoice.activities) {
                    $scope.invoice.activities = [];
                }
                $scope.invoice.activities.push({activity: activity, value: value});
                $scope.activities.new = {
                    activityId: null,
                    value: 100 - $scope.activities.total()
                };
            },
            remove: function(index) {
                $scope.invoice.activities.splice(index, 1);
                $scope.activities.new.value = 100 - $scope.activities.total();
            }
        };
        Invoice.getAllActivities(function(data) {
            angular.forEach(data, function(value, key) {
                this.push({_id:value, name:Invoice.translateActivityLabel(value)});
            }, $scope.activities.data);
        });
    });
