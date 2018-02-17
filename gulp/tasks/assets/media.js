'use-strict';

var gulp = require('gulp'),
	$ = require('gulp-load-plugins')({ lazy: true });

var paths = require('../../paths.js'),
	config = require('../../config.js')();

gulp.task('media', () => gulp
	// Select files
	.src(`${paths.to.assets.in}/media/**/*`)
	// Check for changes
	.pipe($.changed(`${paths.to.assets.out}/media`))
	// Save files
	.pipe(gulp.dest(`${paths.to.assets.out}/media`))
);
