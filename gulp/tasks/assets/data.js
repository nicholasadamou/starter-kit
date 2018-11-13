'use-strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')({ lazy: true })

const paths = require('../../paths.js')

gulp.task('data', () => {
  console.log('-> Updating data files')

  // Select files
  gulp.src(`${paths.to.assets.in}/data/**/*`)
  // Check for changes
    .pipe($.changed(`${paths.to.assets.out}/data`))
  // Save files
    .pipe(gulp.dest(`${paths.to.assets.out}/data`))
})
