'use-strict';

// Include gulp plugins
var gulp = require('gulp'),
    requireDir = require('require-dir');

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
gulp.task('build', ['js', 'pug', 'sass', 'images', 'docs']);
gulp.task('start', ['build', 'watch']);
gulp.task('default', ['help']);