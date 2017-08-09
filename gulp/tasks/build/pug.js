'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true });

var path = require('../../paths.js'),
    error = require('../../error_handler.js'),
    config = require('../../config.js')();

gulp.task('pug', function() {
    var env = ((config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production');

    if (env) {
        console.log('-> Compiling Pug Templates for Development');

        return gulp.src(path.to.pug.in)
            .pipe($.plumber())
            .pipe($.pug({ pretty: true })).on('error', error.handler)
            .pipe(gulp.dest(path.to.pug.out));

    } else {
        console.log('-> Compiling Pug Templates for Production');

        return gulp.src(path.to.pug.in)
            .pipe($.plumber())
            .pipe($.pug()).on('error', error.handler)
            .pipe($.size({ title: 'Pug Templates Before Compression' }))
            .pipe($.htmlmin({collapseWhitespace: true}))
            .pipe($.size({ title: 'Pug Templates After Compression' }))
            .pipe(gulp.dest(path.to.pug.out));
    }
});