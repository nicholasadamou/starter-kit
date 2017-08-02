'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true });

var path = require('../../paths.js');

gulp.task('vendors', function() {
	return gulp.src(path.to.vendors.in)
    	.pipe($.newer(path.to.vendors.out))
    	.pipe(gulp.dest(path.to.vendors.out));
});