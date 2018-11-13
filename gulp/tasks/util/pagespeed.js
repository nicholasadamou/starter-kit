'use-strict'

const gulp = require('gulp')

const psi = require('psi')

const config = require('../../config.js')()

gulp.task('pagespeed', () => {
  console.log('-> Running Google PageSpeed Insights')

  // Update the below URL to the public URL of your site
  psi.output(config.URL, {
    strategy: 'mobile'
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  })
})
