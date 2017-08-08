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
            index: 'index.html'
        },
        open: config.syncOptions.open,
        notify: config.syncOptions.notify
    });
});