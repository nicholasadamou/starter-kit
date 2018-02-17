'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true });

var config = require('../../config.js')();

gulp.task('surge', ['build'], function() {
    console.log('-> Deploying to ' + config.SURGE.domain);

    return $.surge(config.SURGE);
});
