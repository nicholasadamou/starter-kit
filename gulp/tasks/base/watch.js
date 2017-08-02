'use-strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync');

var path = require('../../paths.js');

gulp.task('watch', ['browserSync'], function() {
    // Watch for pug changes and compile
    gulp.watch(path.to.pug.in, ['pug', browserSync.reload]);
    // Watch for style changes and compile
    gulp.watch(path.to.sass.in, ['sass']);
    // Watch for javascript changes and compile
    gulp.watch(path.to.js.in, ['js', browserSync.reload]);
    // Watch for new images and copy
    gulp.watch(path.to.images.in, ['images']);
    // Watch for new vendors and copy
    gulp.watch(path.to.vendors.in, ['vendors']);
});