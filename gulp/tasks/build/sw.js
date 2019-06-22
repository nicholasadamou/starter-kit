/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
'use-strict'

const gulp = require('gulp')
	  const workbox = require('workbox-build')

const paths = require('../../paths.js')

gulp.task('generate-service-worker', () => {
  return workbox.generateSW({
	  globDirectory: paths.to.build,
	  globPatterns: [
      	'**/*.html'
	  ],
	  swDest: `${paths.to.build}/sw.js`,
	  clientsClaim: true,
	  skipWaiting: true
  }).then(({ warnings }) => {
	  // In case there are any warnings from workbox-build, log them.
	  for (const warning of warnings) {
      	console.warn(warning)
	  }
	  console.info('Service worker generation completed.')
  }).catch((error) => {
	  console.warn('Service worker generation failed:', error)
  })
})
