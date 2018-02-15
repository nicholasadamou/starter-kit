'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    bower = require('main-bower-files'),
    merge = require('merge-stream');

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

        return merge(gulp.src(bower(config.files.js)), gulp.src(paths.to.js.in))
            .pipe($.concat(config.js.name))
            .pipe($.plumber())
            .pipe($.browserify({ debug: true }))
            .pipe(gulp.dest(paths.to.js.out));
    } else {
        console.log('-> Compiling Javascript for Production');

        return merge(gulp.src(bower(config.files.js)), gulp.src(paths.to.js.in))
            .pipe($.concat(config.js.name))
            .pipe($.plumber())
            .pipe($.deporder())
            .pipe($.stripDebug())
            .pipe($.size({ title: 'Javascript In Size' }))
            .pipe($.uglify())
            .pipe($.size({ title: 'Javascript Out Size' }))
            .pipe($.browserify({ debug: false }))
            .pipe(gulp.dest(paths.to.js.out));
    }
});