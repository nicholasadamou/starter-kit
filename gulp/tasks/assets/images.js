'use-strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')({ lazy: true })

const pngquant = require('imagemin-pngquant')

const paths = require('../../paths.js')
const config = require('../../config.js')()

gulp.task('images', (done) => {
  const env = ((config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production')

  console.log(`-> Updating images for ${config.environment}`)

  if (env) {
    // Select files
    gulp.src(`${paths.to.assets.in}/images/**/*`)
    // Check for changes
      .pipe($.changed(`${paths.to.assets.out}/images`))
    // Save files
      .pipe(gulp.dest(`${paths.to.assets.out}/images`))
  } else {
    // Select files
    gulp.src(`${paths.to.assets.in}/images/**/*`)
    // Optimize images
      .pipe($.imagemin({
        progressive: true,
        interlaced: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()]
      }))
    // Check for changes
      .pipe($.changed(`${paths.to.assets.out}/images`))
    // Save files
      .pipe(gulp.dest(`${paths.to.assets.out}/images`))
  }

  done()
})
