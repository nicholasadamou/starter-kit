'use-strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')({ lazy: true })

const moment = require('moment')

const paths = require('../../paths.js')
const config = require('../../config.js')()

gulp.task('pug', () => {
  const env = ((config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production')

  console.log(`-> Compiling Pug Templates for ${config.environment}`)

  let pug = null

  if (env) {
    // Select files
    pug = gulp.src(`${paths.to.pug.in}/*.pug`)
    // Prevent pipe breaking caused by errors from gulp plugins
      .pipe($.plumber())
    // Check which files have changed
      .pipe($.changed(paths.to.pug.in, {
        extension: '.html'
      }))
    // Compile Pug
      .pipe($.pug({
        basedir: `${__dirname}/${paths.to.pug.in}`,
        pretty: (config.environment === 'development'),
        data: {
          env: config.environment
        },
        locals: { moment }
      }))
    // Catch errors
      .pipe($.errorHandle())
    // Save files
      .pipe(gulp.dest(paths.to.build))
  } else {
    // Select files
    pug = gulp.src(`${paths.to.pug.in}/*.pug`)
    // Prevent pipe breaking caused by errors from gulp plugins
      .pipe($.plumber())
    // Check which files have changed
      .pipe($.changed(paths.to.pug.in, {
        extension: '.html'
      }))
    // Compile Pug
      .pipe($.pug({
        basedir: `${__dirname}/${paths.to.pug.in}`,
        pretty: (config.environment === 'development'),
        data: {
          env: config.environment
        },
        locals: { moment }
      }))
    // inline CSS & js
      .pipe($.inlineSource({
        compress: env,
        rootpath: paths.to.build
      }))
    // Catch errors
      .pipe($.errorHandle())
    // Show file-size before compression
      .pipe($.size({ title: 'Pug Templates Before Compression' }))
    // Optomize and minify
      .pipe($.htmlmin({ collapseWhitespace: true }))
    // Show file-size after compression
      .pipe($.size({ title: 'Pug Templates After Compression' }))
    // Save minified file
      .pipe(gulp.dest(paths.to.build))
  }

  return pug
})
