'use strict';

module.exports = {
    livereload: {
        options: {
            livereload: true
        },
        files: '<%= conf.src %>/**/*'
    },
    sass: {
        files: [
            '<%= conf.src %>/**/*.scss'
        ],
        tasks: [
            'style'
        ]
    }
};