'use-strict';

var gulp = require('gulp'),
	$ = require('gulp-load-plugins')({ lazy: true });

var paths = require('../../paths.js'),
	config = require('../../config.js')();

gulp.task('docs', function() {
	console.log('-> Updating docs');

	// Select files
	gulp.src(`${paths.to.assets.in}/docs/**/*`)
	// Check for changes
	.pipe($.changed(`${paths.to.assets.out}/docs`))
	// Save files
	.pipe(gulp.dest(`${paths.to.assets.out}/docs`))
});
