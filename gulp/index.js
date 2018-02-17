'use-strict';

// Include gulp plugins
var gulp = require('gulp'),
	requireDir = require('require-dir'),
	minimist = require('minimist');

var config = require('./config.js')();

/**
 * Which task should be run?
 */
requireDir('./tasks', { recurse: true });

/**
 * Tell which kit name, version and environment we are running in.
 */
console.log(config.pkg.name + ' ' + config.pkg.version + ' ' + config.environment + ' build');

/**
 * Default set of tasks.
 */
gulp.task('assets', ['data', 'docs', 'fonts', 'images', 'media', 'misc']);
gulp.task('build', ['clean', 'assets', 'vendors', 'js', 'sass', 'pug']);
gulp.task('start', ['clean', 'build', 'browsersync']);
gulp.task('default', ['help']);
