'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true });

var path = require('../../paths.js');

gulp.task('docs', function() {
	console.log('-> Updating docs');

	return gulp.src(path.to.docs.in)
    	.pipe($.newer(path.to.docs.out))
    	.pipe(gulp.dest(path.to.docs.out));
});