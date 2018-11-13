'use-strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')({ lazy: true })

const argv = require('argv')

const paths = require('../../paths.js')
const config = require('../../config.js')()

gulp.task('ghpages', ['build'], () => {
  console.log('->  Deploying to Github Pages')
  // To deploy with Travis CI:
  //   1. Generate OAuth token on GitHub > Settings > Application page
  //   2. Encrypt and save that token into the `.travis.yml` file by running:
  //      `travis encrypt GITHUB_TOKEN="<your-oauth-token>" --add`

  return gulp.src(`${paths.to.build}**/*`)
    .pipe($.if('**/robots.txt', !argv.production ? $.replace('Disallow:', 'Disallow: /') : $.util.noop()))
    .pipe($.ghPages({
      remoteUrl: `https://${process.env.GITHUB_TOKEN
      }@github.com/${config.GHPAGES.username}/${config.GHPAGES.repo}.git`,
      branch: 'gh-pages'
    }))
})
