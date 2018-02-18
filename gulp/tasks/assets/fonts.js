'use-strict';

var gulp = require('gulp'),
	$ = require('gulp-load-plugins')({ lazy: true });

var paths = require('../../paths.js'),
	config = require('../../config.js')();

gulp.task('fonts', function() {
	console.log('-> Updating fonts');

	// Select files
	gulp.src(`${paths.to.assets.in}/fonts/**/*`)
	// Check for changes
	.pipe($.changed(`${paths.to.assets.out}/fonts`))
	// Save files
	.pipe(gulp.dest(`${paths.to.assets.out}/fonts`))
});
