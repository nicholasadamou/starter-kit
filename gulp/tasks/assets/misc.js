'use-strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')({ lazy: true })

const paths = require('../../paths.js')

gulp.task('misc', (done) => {
  console.log('-> Updating misc. files')

  // Select files
  gulp.src([
    `${paths.to.assets.in}/misc/**/*`
  ], {
    dot: true
  })
  // Check for changes
    .pipe($.changed(paths.to.build))
  // Save files
    .pipe(gulp.dest(paths.to.build))

  done()
})
