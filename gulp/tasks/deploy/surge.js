'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true });

var path = require('../../paths.js'),
    config = require('../../config.js')();

gulp.task('surge', function() {
    console.log('-> Deploying to ' + config.SURGE.domain);

    return $.surge(config.SURGE);
});