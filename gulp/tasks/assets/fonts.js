'use-strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')({ lazy: true })

const paths = require('../../paths.js')

gulp.task('fonts', (done) => {
  console.log('-> Updating fonts')

  // Select files
  gulp.src(`${paths.to.assets.in}/fonts/**/*`)
  // Check for changes
    .pipe($.changed(`${paths.to.assets.out}/fonts`))
  // Save files
    .pipe(gulp.dest(`${paths.to.assets.out}/fonts`))

  done()
})
