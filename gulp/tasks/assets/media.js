'use-strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')({ lazy: true })

const paths = require('../../paths.js')

gulp.task('media', (done) => {
  console.log('-> Updating media files')

  // Select files
  gulp.src(`${paths.to.assets.in}/media/**/*`)
  // Check for changes
    .pipe($.changed(`${paths.to.assets.out}/media`))
  // Save files
    .pipe(gulp.dest(`${paths.to.assets.out}/media`))

  done()
})
