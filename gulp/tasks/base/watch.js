'use-strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync');

var path = require('../../paths.js');

gulp.task('watch', ['browserSync'], function() {
    // Watch for pug changes and compile
    gulp.watch(path.to.pug.src, ['pug', browserSync.reload]);
    // Watch for style changes and compile
    gulp.watch(path.to.sass.src, ['sass']);
    // Watch for javascript changes and compile
    gulp.watch(path.to.js, ['js', browserSync.reload]);
    // Watch for new images and copy
    gulp.watch(path.to.images, ['images']);
    // Watch for new vendors and copy
    gulp.watch(path.to.vendors, ['vendors']);
});