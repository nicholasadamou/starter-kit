'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    del = require('del');

var paths = require('../../paths.js'),
    error = require('../../error_handler.js'),
    config = require('../../config.js')();

gulp.task('jslint', function() {
     console.log('-> Running JSLint');

    return gulp.src(paths.to.js.in)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('js', ['jslint'], function() {
    var env = ((config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production');
    
    if (env) {
        console.log('-> Compiling Javascript for Development');

        return gulp.src([
            paths.to.js.in,
            paths.to.vendors.js
            ])
            .pipe($.concat(config.js.name))
            .pipe($.browserify({ debug: true }))
            .pipe($.plumber())
            .pipe($.newer(paths.to.js.out))
            .pipe(gulp.dest(paths.to.js.out));
    } else {
        console.log('-> Compiling Javascript for Production');

        return gulp.src([
            paths.to.js.in,
            paths.to.vendors.js
            ])
            .pipe($.concat(config.js.name))
            .pipe($.browserify({ debug: false }))
            .pipe($.plumber())
            .pipe($.deporder())
            .pipe($.stripDebug())
            .pipe($.size({ title: 'Javascript In Size' }))
            .pipe($.uglify())
            .pipe($.size({ title: 'Javascript Out Size' }))
            .pipe(gulp.dest(paths.to.js.out));
    }
});