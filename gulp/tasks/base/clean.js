'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    del = require('del');

var path = require('../../paths.js');

gulp.task('clean', function() {
    console.log('-> Cleaning build folder');

    $.cache.caches = { };
    
    del.sync([
        path.to.dist + '*'
    ]);
});