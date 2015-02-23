'use strict';

module.exports = {
    options: {
        sassDir: '<%= conf.src %>/<%= conf.css.dir %>',
            cssDir: '<%= conf.temp %>/<%= conf.css.dir %>',
            imagesDir: '<%= conf.dist %>/images',
            javascriptsDir: '<%= conf.src %>/scripts',
            fontsDir: '<%= conf.src %>/styles/fonts',
            importPath: '<%= conf.src %>/bower_components',
            httpImagesPath: '/images',
            httpGeneratedImagesPath: '/images/generated',
            httpFontsPath: '/styles/fonts',
            relativeAssets: false,
            assetCacheBuster: false,
            raw: 'Sass::Script::Number.precision = 10\n'
    },
    dist: {
        options: {
            generatedImagesDir: '<%= conf.temp %>/images/generated'
        }
    },
    server: {
        options: {
            debugInfo: true
        }
    }
};