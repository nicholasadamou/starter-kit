'use-strict'

const gulp = require('gulp')

const del = require('del')

const paths = require('../../paths.js')

gulp.task('clean', () => {
  console.log('-> Cleansing compiled files')

  del.sync([
    `${paths.to.build}*`
  ])
})
