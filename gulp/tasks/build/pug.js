'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true });

var path = require('../../paths.js'),
    error = require('../../error_handler.js'),
    config = require('../../config.js')();

gulp.task('pug', function() {
    console.log('-> Compiling Pug Templates');

    var env = ((config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production');
      
    var templates = gulp.src(path.to.pug.in)
        .pipe($.plumber())
        .pipe($.newer(path.to.pug.out));

    if (!env) {
        console.log('-> Compressing templates for Production');

        templates = templates
            .pipe($.size({ title: 'Pug Templates Before Compression' }))
            .pipe($.pug())
                .on('error', error.handler)
            .pipe($.size({ title: 'Pug Templates After Compression' }));
    } else {
         templates
            .pipe($.pug({ pretty: env }))
                .on('error', error.handler);
    }

    return templates.pipe(gulp.dest(path.to.pug.out));
});