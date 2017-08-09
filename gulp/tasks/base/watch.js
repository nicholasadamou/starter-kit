'use-strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync');

var paths = require('../../paths.js');

gulp.task('watch', ['browserSync'], function() {
    // Watch for pug changes and compile
    gulp.watch(paths.to.pug.in, ['pug', browserSync.reload]);
    // Watch for style changes and compile
    gulp.watch(paths.to.sass.in, ['sass']);
    // Watch for javascript changes and compile
    gulp.watch(paths.to.js.in, ['js', browserSync.reload]);
    // Watch for new images and copy
    gulp.watch(paths.to.images.in, ['images']);
    // Watch for new vendors and copy
    gulp.watch(paths.to.vendors.in, ['vendors']);
});