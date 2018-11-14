'use-strict'

const gulp = require('gulp')

const del = require('del')

const paths = require('../../paths.js')

gulp.task('clean:build', () => {
  console.log('-> Cleansing compiled files')

  return del([
    `${paths.to.build}*`
  ])
})

// Since we use 'gulp-inline-source' within
// the 'pug' task, we can delete the compiled
// 'sass' & 'js' files from the below directories.
gulp.task('clean:compiled-files', () => {
  console.log(`-> Cleansing compiled 'sass' & 'js' files`)

  return del([
    `${paths.to.sass.out}`,
    `${paths.to.js.out}`,
    `${paths.to.vendors.out}`
  ])
})
