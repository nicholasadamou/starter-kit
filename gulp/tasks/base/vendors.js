'use-strict';

var gulp = require('gulp'),
	$ = require('gulp-load-plugins')({ lazy: true });

var paths = require('../../paths.js'),
	config = require('../../config.js')();

gulp.task('vendors', function() {
	var env = ((config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production');

	console.log('-> Compiling Javascript Plugins for ' + config.environment);

	if (env) {
		// Select files
		gulp.src(`${paths.to.vendors.in}/bundle.js`)
		// Concatenate includes
		.pipe($.include({
			includePaths: [
				`${config.root}/bower_components`,
				`${config.root}/node_modules`
			],
		}))
		// Save files
		.pipe(gulp.dest(`${paths.to.vendors.out}`))
	} else {
		// Select files
		gulp.src(`${paths.to.vendors.in}/bundle.js`)
		// Concatenate includes
		.pipe($.include({
			includePaths: [
				`${config.root}/bower_components`,
				`${config.root}/node_modules`
			],
		}))
		// Show file-size before compression
		.pipe($.size({ title: 'Javascript In Size' }))
		// Optimize and minify
		.pipe($.uglify())
		// Show file-size after compression
		.pipe($.size({ title: 'Javascript Out Size' }))
		// Append suffix
		.pipe($.rename({
			suffix: '.min',
		}))
		// Save files
		.pipe(gulp.dest(`${paths.to.vendors.out}`))
	}


});
