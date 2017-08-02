'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true });

var path = require('../../paths.js');

gulp.task('favicon', function() {
    console.log('-> Updating favicon in build folder');

    return gulp.src(path.to.favicon.in)
        .pipe($.newer(path.to.dist))
        .pipe(gulp.dest(path.to.dist));
});