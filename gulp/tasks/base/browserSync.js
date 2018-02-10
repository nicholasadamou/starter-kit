'use-strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync');

var paths = require('../../paths.js'),
    config = require('../../config.js')();

gulp.task('browserSync', function() {
    console.log('-> Starting browserSync');

    browserSync.init({
        server: {
            baseDir: paths.to.dist,
            index: 'index.html'
        },
        open: config.syncOptions.open,
        notify: config.syncOptions.notify,
        tunnel: config.syncOptions.shouldTunnel,
        tunnel: config.syncOptions.tunnelName 
    });
});