'use-strict';

var gulp = require('gulp'),
	$ = require('gulp-load-plugins')({ lazy: true }),
	pngquant = require('imagemin-pngquant');

var paths = require('../../paths.js'),
	config = require('../../config.js')();

gulp.task('images', function() {
	// Select files
	gulp.src(`${paths.to.assets.in}/images/**/*`)
	// Optomize images
	.pipe($.imagemin({
		progressive: true,
		interlaced: true,
		svgoPlugins: [{ removeViewBox: false }],
		use: [pngquant()]
	}))
	// Check for changes
	.pipe($.changed(`${paths.to.assets.in}/images`))
	// Save files
	.pipe(gulp.dest(`${paths.to.assets.out}/images`))
});
