'use strict';

module.exports = {
    options: {
        port: 9000,
        hostname: '0.0.0.0',
        livereload: 35729,
        base: [
            '<%= conf.temp %>',
            '<%= conf.src %>'
        ],
        middleware: function (connect, options) {
            if (!Array.isArray(options.base)) {
                options.base = [options.base];
            }

            var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

            options.base.forEach(function (dir) {
                middlewares.push(connect.static(dir));
            });

            return middlewares;
        }
    },
    proxies: {
        host: 'localhost',
        port: 8080,
        context: '/api'
    }
};
