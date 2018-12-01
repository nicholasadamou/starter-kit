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

if (config.environment === 'production') {
  // During 'production' we inline the CSS and JS,
  // so, we clean the compiled files from the build folder.
  gulp.task('build', gulp.series('clean:build', 'assets', 'js', 'sass', 'pug', 'clean:compiled-files'))
} else {
  // During 'development' we do not inline the CSS or JS,
  // thus we do not need to clean the compiled files from the build folder.
  gulp.task('build', gulp.series('clean:build', 'assets', 'js', 'sass', 'pug'))
}

gulp.task('start', gulp.series('build', 'browsersync'))
gulp.task('default', gulp.series('help'))
