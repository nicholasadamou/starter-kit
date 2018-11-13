'use-strict'

const gulp = require('gulp')

const browserSync = require('browser-sync')

const paths = require('../../paths.js')
const config = require('../../config.js')()

gulp.task('browsersync', () => {
  console.log('-> Starting browserSync')

  // Create and initialize local server
  browserSync.create()
  browserSync.init({
    notify: config.syncOptions.notify,
    server: `${paths.to.build}`,
    ui: config.syncOptions.ui,
    open: config.syncOptions.open,
    tunnel: config.syncOptions.tunnelName
  })
  // Watch for build changes and reload browser
  browserSync.watch(`${paths.to.build}/**/*`).on('change', browserSync.reload)
  // Watch for source changes and execute associated tasks
  gulp.watch(`${paths.to.assets.in}/data/**/*`, ['data'])
  gulp.watch(`${paths.to.assets.in}/fonts/**/*`, ['fonts'])
  gulp.watch(`${paths.to.assets.in}/images/**/*`, ['images'])
  gulp.watch(`${paths.to.assets.in}/media/**/*`, ['media'])
  gulp.watch(`${paths.to.assets.in}/misc/**/*`, ['misc'])
  gulp.watch(`${paths.to.js.in}/**/*.js`, ['js'])
  gulp.watch(`${paths.to.sass.in}/**/*.scss`, ['sass'])
  gulp.watch(`${paths.to.vendors}/*.js`, ['vendors'])
  gulp.watch(`${paths.to.pug.in}/**/*.pug`, ['pug'])
})
