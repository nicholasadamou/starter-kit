'use-strict';

var gulp = require('gulp'),
	$ = require('gulp-load-plugins')({ lazy: true });

var paths = require('../../paths.js'),
	config = require('../../config.js')();

gulp.task('pug', function() {
	var env = ((config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production');

	console.log('-> Compiling Pug Templates for ' + config.environment);

	if (env) {
		// Select files
		gulp.src(`${paths.to.pug.in}/*.pug`)
		// Check which files have changed
		.pipe($.changed(paths.to.pug.in, {
			extension: '.html'
		}))
		// Compile Pug
		.pipe($.pug({
			basedir: `${__dirname}/${paths.to.pug.in}`,
			pretty: (config.environment === 'development'),
			data: {
				env: config.environment,
			},
		}))
		// Save files
		.pipe(gulp.dest(paths.to.build))
	} else {
		// Select files
		gulp.src(`${paths.to.pug.in}/*.pug`)
		// Check which files have changed
		.pipe($.changed(paths.to.pug.in, {
			extension: '.html'
		}))
		// Compile Pug
		.pipe($.pug({
			basedir: `${__dirname}/${paths.to.pug.in}`,
			pretty: (config.environment === 'development'),
			data: {
				env: config.environment
			},
		}))
		// Show file-size before compression
		.pipe($.size({ title: 'Pug Templates Before Compression' }))
		// Optomize and minify
		.pipe($.htmlmin({collapseWhitespace: true}))
		// Show file-size after compression
		.pipe($.size({ title: 'Pug Templates After Compression' }))
		// Save minified file
		.pipe(gulp.dest(paths.to.build))
	}

});
