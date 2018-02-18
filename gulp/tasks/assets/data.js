'use-strict';

var gulp = require('gulp'),
	$ = require('gulp-load-plugins')({ lazy: true });

var paths = require('../../paths.js'),
	config = require('../../config.js')();

gulp.task('data', function() {
	console.log('-> Updating data files');

	// Select files
	gulp.src(`${paths.to.assets.in}/data/**/*`)
	// Check for changes
	.pipe($.changed(`${paths.to.assets.out}/data`))
	// Save files
	.pipe(gulp.dest(`${paths.to.assets.out}/data`))
});
