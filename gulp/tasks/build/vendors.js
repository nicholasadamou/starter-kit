'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true });

var paths = require('../../paths.js');

gulp.task('vendors', function() {
	console.log('-> Updating vendors');

	return gulp.src(paths.to.vendors.in)
    	.pipe($.newer(paths.to.vendors.out))
    	.pipe(gulp.dest(paths.to.vendors.out));
});