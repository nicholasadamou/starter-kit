'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true });

var path = require('../../paths.js');

gulp.task('favicons', function() {
    console.log('-> Updating favicons in build folder');

    return gulp.src(path.to.favicons.in)
        .pipe($.newer(path.to.favicons.in))
        .pipe(gulp.dest(path.to.favicons.out));
});