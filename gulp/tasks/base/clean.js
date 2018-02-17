'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    del = require('del');

var paths = require('../../paths.js');

gulp.task('clean', function() {
    console.log('-> Cleansing compiled files');

    del.sync([
        paths.to.build + "*"
    ]);
});
