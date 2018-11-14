'use-strict'

// Include gulp plugins
const gulp = require('gulp')

const ForwardReference = require('undertaker-forward-reference')

const requireDir = require('require-dir')

const config = require('./config.js')()

// Fixes issue with loading tasks non-alphabetically.
// see: https://github.com/gulpjs/undertaker-forward-reference
gulp.registry(new ForwardReference())

/**
 * Which task should be run?
 */
requireDir('./tasks', { recurse: true })

/**
 * Tell which kit name, version and environment we are running in.
 */
console.log(`${config.pkg.name} ${config.pkg.version} ${config.environment} build`)

/**
 * Default set of tasks.
 */
gulp.task('assets', gulp.series('data', 'docs', 'fonts', 'images', 'media', 'misc'))
gulp.task('build', gulp.series('clean:build', 'assets', 'js', 'sass', 'pug', 'clean:compiled-files'))
gulp.task('start', gulp.series('build', 'browsersync'))
gulp.task('default', gulp.series('help'))
