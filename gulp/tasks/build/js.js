'use-strict';

var gulp = require('gulp'),
	$ = require('gulp-load-plugins')({ lazy: true });

var paths = require('../../paths.js'),
	config = require('../../config.js')();

gulp.task('js', function() {
	var env = ((config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production');

	console.log('-> Compiling Javascript for ' + config.environment);

	if (env) {
		// Select files
		gulp.src(`${paths.to.js.in}/*.js`)
		// Prevent pipe breaking caused by errors from gulp plugins
		.pipe($.plumber())
		// Concatenate includes
		.pipe($.include())
		// Catch errors
		.pipe($.errorHandle())
		// Save unminified file
		.pipe(gulp.dest(`${paths.to.js.out}`))
	} else {
		// Select files
		gulp.src(`${paths.to.js.in}/*.js`)
		// Prevent pipe breaking caused by errors from gulp plugins
		.pipe($.plumber())
		// Concatenate includes
		.pipe($.include())
		// Catch errors
		.pipe($.errorHandle())
		// Show file-size before compression
		.pipe($.size({ title: 'Javascript In Size' }))
		// Optimize and minify
		.pipe($.terser())
		// Show file-size after compression
		.pipe($.size({ title: 'Javascript Out Size' }))
		// Append suffix
		.pipe($.rename({
			suffix: '.min',
		}))
		// Save minified file
		.pipe(gulp.dest(`${paths.to.js.out}`))
	}

});
