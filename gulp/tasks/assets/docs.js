'use-strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')({ lazy: true })

const paths = require('../../paths.js')

gulp.task('docs', () => {
  console.log('-> Updating docs')

  // Select files
  gulp.src(`${paths.to.assets.in}/docs/**/*`)
  // Check for changes
    .pipe($.changed(`${paths.to.assets.out}/docs`))
  // Save files
    .pipe(gulp.dest(`${paths.to.assets.out}/docs`))
})
