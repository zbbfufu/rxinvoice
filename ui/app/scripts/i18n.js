'use strict';

angular.module('rxI18n', [])
    .value('labels', {
        'fr': {
            'book.price': 'Prix',
            'book.pages': 'Pages',
            'book.publisher': 'Editeur',
            'book.author': 'Auteur',
            'book.rating': 'Note',
            'book.isbn10': 'ISBN-10',
            'book.isbn13': 'ISBN-13',
            'book.description': 'Description'
        },
        'en': {
            'book.price': 'Price',
            'book.pages': 'Pages',
            'book.publisher': 'Publisher',
            'book.author': 'Author',
            'book.rating': 'Rating',
            'book.isbn10': 'ISBN-10',
            'book.isbn13': 'ISBN-13',
            'book.description': 'Description'
        }
    })

    .directive('translate', function(i18nUtils) {
        return {
            restrict: 'A',
            compile: function(element, attr) {
                element.html(i18nUtils.translate(attr.translate));
            }
        };
    })

    .factory('i18nUtils', function(labels) {
        var factory =  {
            translate: function(key) {
                var label = window.labels[key];
                return label ? label : key;
            }
        };
        return factory;
    })
;