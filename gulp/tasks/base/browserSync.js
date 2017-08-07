'use-strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync');

var path = require('../../paths.js'),
    config = require('../../config.js')();

gulp.task('browserSync', function() {
    console.log('-> Starting browserSync');

    browserSync.init({
        server: {
            baseDir: path.to.dist,
        },
        proxy: {
            target: 'localhost:8080',
            ws: true
        },
        open: config.syncOptions.open || false,
        notify: config.syncOptions.notify || true
    });
});