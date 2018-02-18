'use-strict';

var gulp = require('gulp'),
	$ = require('gulp-load-plugins')({ lazy: true });

var paths = require('../../paths.js'),
	config = require('../../config.js')();

gulp.task('misc', function() {
	var env = ((config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production');

	console.log('-> Updating misc. files');

	// Select files
	gulp.src([
		`${paths.to.assets.in}/misc/**/*`
	], {
		dot: true,
	})
	// Check for changes
	.pipe($.changed(paths.to.build))
	// Save files
	.pipe(gulp.dest(paths.to.build))
});
