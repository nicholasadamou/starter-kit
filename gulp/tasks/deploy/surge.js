'use-strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')({ lazy: true })

const config = require('../../config.js')()

gulp.task('surge', ['build'], () => {
  console.log(`-> Deploying to ${config.SURGE.domain}`)

  return $.surge(config.SURGE)
})
