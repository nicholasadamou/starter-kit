'use-strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')({ lazy: true })

const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')

const paths = require('../../paths.js')
const banner = require('../../banner.js')()
const config = require('../../config.js')()

gulp.task('eslint', (done) => {
  console.log('-> Running eslint')

  // Select files
  gulp.src(`${paths.to.js.in}/**/*.js`)
  // Prevent pipe breaking caused by errors from gulp plugins
    .pipe(
      $.plumber({
        errorHandler: function (err) {
          $.notify.onError('Error: <%= error.message %>')(err)
          this.emit('end') // End stream if error is found.
        }
      })
    )
  // Check for lint errors
    .pipe($.eslint())
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
    .pipe($.eslint.format())
  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failAfterError last.
    .pipe($.eslint.failAfterError())
    .pipe($.notify({ message: '\n\n✅   ===> ESLINT completed!\n', onLast: true }))

  done()
})

gulp.task('js', gulp.series('eslint', 'vendors', () => {
  const env = ((config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production')

  console.log(`-> Compiling JavaScript for ${config.environment}`)

  // Obtain a readable stream containing the processed browserified bundle
  const bundle = browserify({
    entries: paths.to.js.in,
    debug: env
  })
    .bundle()
  // Convert browserify stream to a gulp-readable steam & buffer
    .pipe(source(config.js.name))
    .pipe(buffer())

  if (env) {
    // Select bundle
    bundle
    // Prevent pipe breaking caused by errors from gulp plugins
      .pipe(
        $.plumber({
          errorHandler: function (err) {
            $.notify.onError('Error: <%= error.message %>')(err)
            this.emit('end') // End stream if error is found.
          }
        })
      )
    // Add file-header
      .pipe($.header(banner.default, { package: config.pkg }))
    // Initialize sourcemaps *after* header
      .pipe($.sourcemaps.init())
    // Concatenate includes
      .pipe($.include({
        includePaths: [`${paths.to.js.in}`]
      }))
    // Transpile
      .pipe($.babel())
    // Catch errors
      .pipe($.errorHandle())
    // Save sourcemaps
      .pipe($.sourcemaps.write('.'))
    // Save unminified file
      .pipe(gulp.dest(`${paths.to.js.out}`))
      .pipe($.notify({ message: '\n\n✅   ===> JS completed!\n', onLast: true }))
  } else {
    // Select bundle
    bundle
    // Prevent pipe breaking caused by errors from gulp plugins
      .pipe(
        $.plumber({
          errorHandler: function (err) {
            $.notify.onError('Error: <%= error.message %>')(err)
            this.emit('end') // End stream if error is found.
          }
        })
      )
    // Add file-header
      .pipe($.header(banner.min, { package: config.pkg }))
    // Concatenate includes
      .pipe($.include({
        includePaths: [`${paths.to.js.in}`]
      }))
    // Transpile
      .pipe($.babel())
    // Catch errors
      .pipe($.errorHandle())
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
    // Save minified file
      .pipe(gulp.dest(`${paths.to.js.out}`))
      .pipe($.notify({ message: '\n\n✅   ===> JS completed!\n', onLast: true }))
  }

  return bundle
}))
