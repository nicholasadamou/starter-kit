'use-strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')({ lazy: true })

const paths = require('../../paths.js')
const config = require('../../config.js')()

gulp.task('vendors', () => {
  const env = ((config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production')

  console.log(`-> Compiling Javascript Plugins for ${config.environment}`)

  let vendors = null

  if (env) {
    // Select files
    vendors = gulp.src(`${paths.to.vendors.in}/bundle.js`)
    // Concatenate includes
      .pipe($.include({
        includePaths: [
          `${config.root}/bower_components`,
          `${config.root}/node_modules`
        ]
      }))
    // Save files
      .pipe(gulp.dest(`${paths.to.vendors.out}`))
  } else {
    // Select files
    vendors = gulp.src(`${paths.to.vendors.in}/bundle.js`)
    // Concatenate includes
      .pipe($.include({
        includePaths: [
          `${config.root}/bower_components`,
          `${config.root}/node_modules`
        ]
      }))
    // Show file-size before compression
      .pipe($.size({ title: 'Javascript In Size' }))
    // Optimize and minify
      .pipe($.terser())
    // Show file-size after compression
      .pipe($.size({ title: 'Javascript Out Size' }))
    // Append suffix
      .pipe($.rename({
        suffix: '.min'
      }))
    // Save files
      .pipe(gulp.dest(`${paths.to.vendors.out}`))

    return vendors
  }
})
