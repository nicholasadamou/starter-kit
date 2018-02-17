'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true });

var config = require('../../config.js')();

gulp.task('pagespeed', function() {
    console.log('-> Running Google PageSpeed Insights');

    // Update the below URL to the public URL of your site
    require('psi').output(config.URL, {
        strategy: 'mobile'
        // By default we use the PageSpeed Insights free (no API key) tier.
        // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
        // key: 'YOUR_API_KEY'
    });
});
