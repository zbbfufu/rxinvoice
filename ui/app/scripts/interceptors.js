(function (app) {
    'use strict';

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push(['$q', '$injector', function ($q, $injector) {
            return {
                responseError: function (rejection) {
                    var $i18n = $injector.get('i18nUtils');
                    var $location = $injector.get('$location');

                    if (!rejection.config || (rejection.config.url.indexOf('.html') == -1)) {
                        switch (rejection.status) {
                            case 0:
                                alertify.error($i18n.translate('error.server.unavailable'));
                                break;
                            case 401:
                                if ($location.path() !== '/login') {
                                    $location.path('/login');
                                    alertify.dismissAll();
                                    alertify.error($i18n.translate('error.server.unauthorized'));
                                }
                                break;
                            case 404:
                                alertify.error($i18n.translate('error.server.not.found'));
                                break;
                            case 500:
                                alertify.error($i18n.translate('error.server.internal'));
                                break;
                            default:
                                alertify.error($i18n.translate('error.server'));
                        }
                    }
                    return $q.reject(rejection);
                }
            };
        }]);
    });
})(angular.module('rxSession'));
