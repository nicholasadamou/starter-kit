'use-strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')({ lazy: true })

const ftp = require('vinyl-ftp')

const paths = require('../../paths.js')
const config = require('../../config.js')()

gulp.task('ftp', gulp.series('build', () => {
  console.log(`-> Deploying to ftp://${config.FTP.host}`)

  const conn = ftp.create({
    host: config.FTP.host,
    user: config.FTP.user,
    password: config.FTP.password
  })

  return gulp.src(`${paths.to.dist}**`, {
    base: paths.to.build,
    buffer: false
  })
    .pipe($.plumber({
      errorHandler: $.notify.onError({
        title: `Error: deployment to ftp://${config.FTP.host} has failed.`
      })
    }))
    .pipe(conn.newer(config.FTP.target))
    .pipe(conn.dest(config.FTP.target))
    .pipe($.notify({
      title: `Deployment  to ftp://${config.FTP.host} was successful!`,
      message: `Your project has been deployed to ftp://${config.FTP.host}.`
    }))
}))
