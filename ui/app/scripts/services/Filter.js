'use strict';

angular.module('rxFilter', [
        'ngResource'
    ])

    .service('Filter', function() {
        var defaultDateMinFilter = moment().subtract(1, 'month').format('DD/MM/YYYY');

        var filters = {
            dashboard: {
                criteria: {
                    reference: '',
                    businessSelected: '',
                    companySelected: '',
                    statusSelected: '',
                    dateMin: defaultDateMinFilter,
                    dateMax: ''
                },

                companiesList: [],
                companiesBuyersList: [],
                businessList: [],
                invoicesList: [],
                invoicesBuyerList: {},
                statusList: [],


                selectCompany: function(company) {
                    filters.dashboard.criteria.companySelected = company._id;
                    filters.dashboard.criteria.businessSelected = '';
                    filters.dashboard.businessList = company.business;
                },
                selectBusiness: function(business) {
                    filters.dashboard.criteria.businessSelected = business.reference;
                },
                selectCompanyFromInvoice: function(invoice) {
                    if (invoice && invoice.buyer) {
                        filters.dashboard.criteria.companySelected = invoice.buyer._id;
                        filters.dashboard.criteria.businessSelected = '';
                    }
                },
                selectBusinessFromInvoice: function(invoice) {
                    if (invoice && invoice.business && invoice.business.reference) {
                        filters.dashboard.criteria.companySelected = invoice.buyer._id;
                        filters.dashboard.criteria.businessSelected = invoice.business.reference;
                    }
                },
                resetCompaniesFilters: function() {
                    filters.dashboard.criteria.companySelected = '';
                    filters.dashboard.criteria.businessSelected = '';
                    filters.dashboard.businessList = [];
                },
                resetInvoicesFilters: function() {
                    filters.dashboard.criteria.statusSelected = '';
                    filters.dashboard.criteria.reference = '';
                },
                resetDatesFilters: function() {
                    filters.dashboard.criteria.dateMin = defaultDateMinFilter;
                    filters.dashboard.criteria.dateMax = '';
                },

                filterCompanies: function(company) {
                    return (!filters.dashboard.criteria.companySelected || filters.dashboard.criteria.companySelected == company._id) &&
                        filters.dashboard.invoicesBuyerList[company._id];
                },
                filterInvoices: function(invoice) {
                    var filter = filters.dashboard.criteria;
                    var compareDateMin = function(date, min) {
                        if (min && date) {
                            var dateCompare = moment(date).format('YYYYMMDD');
                            var minCompare = moment(min, "DD/MM/YYYY").format('YYYYMMDD');
                            if (dateCompare == 'Invalid date' || minCompare == 'Invalid date') {
                                return false;
                            }
                            return dateCompare >= minCompare;
                        }
                        return false;
                    }
                    var compareDateMax = function(date, max) {
                        if (max && date) {
                            var dateCompare = moment(date).format('YYYYMMDD');
                            var maxCompare = moment(max, "DD/MM/YYYY").format('YYYYMMDD');
                            if (dateCompare == 'Invalid date' || minCompare == 'Invalid date') {
                                return false;
                            }
                            return dateCompare <= maxCompare;
                        }
                    }
                    var filterDate = function() {
                        var compareMin = compareDateMin(invoice.date, filter.dateMin);
                        var compareMax = compareDateMax(invoice.date, filter.dateMax);
                        if (filter.dateMin) {
                            if (filter.dateMax) {
                                return compareMin && compareMax;
                            } else {
                                return compareMin;
                            }
                        } else if (filter.dateMax) {
                            return compareMax;
                        } else {
                            return true;
                        }
                    }
                    var ret =
                            (!filter.companySelected || (invoice.buyer && filter.companySelected == invoice.buyer._id)) &&
                            (!filter.statusSelected || filter.statusSelected == invoice.status) &&
                            (!filter.businessSelected || (invoice.business && filter.businessSelected == invoice.business.reference)) &&
                            (filterDate()) &&
                            (!filter.reference || invoice.reference && invoice.reference.indexOf(filter.reference) > -1)
                        ;
                    return ret;
                }
            }
        };

        return filters;
    })

    .service('OrderBy', function() {

        var orders = {
            dashboard: {
                company: null,
                companies: [
                    {label: 'A-Z', predicate: 'name', reverse: false, selected: false},
                    {label: 'Nb', predicate: 'metrics.nbInvoices', reverse: true, selected: false}
                ],
                byCompany: function(order) {
                    if (this.company) {
                        this.company.selected = false;
                        if (this.company.predicate == order.predicate) {
                            this.company.reverse = !this.company.reverse;
                        }
                    }
                    this.company = order;
                    this.company.selected = true;
                },

                invoice: null,
                invoices: [
                    {label: 'A-Z', predicate: 'reference', reverse: false, selected: false},
                    {label: 'Total', predicate: 'grossAmount', reverse: true, selected: false},
                    {label: 'Date', predicate: 'date', reverse: true, selected: false}
                ],
                byInvoice: function(order) {
                    if (this.invoice) {
                        this.invoice.selected = false;
                        if (this.invoice.predicate == order.predicate) {
                            this.invoice.reverse = !this.invoice.reverse;
                        }
                    }
                    this.invoice = order;
                    this.invoice.selected = true;
                }
            }
        };
        orders.dashboard.byCompany(orders.dashboard.companies[0]);
        orders.dashboard.byInvoice(orders.dashboard.invoices[2]);

        return orders;
    })

;