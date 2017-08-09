'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    pngquant = require('imagemin-pngquant');

var paths = require('../../paths.js');

gulp.task('favicons', function() {
    console.log('-> Updating favicons');

    return gulp.src(pathss.to.favicons.in)
        .pipe($.imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe($.newer(paths.to.favicons.out))
        .pipe(gulp.dest(pathss.to.favicons.out));
});

gulp.task('images', ['favicons'], function() {
    console.log('-> Updating images');

    return gulp.src(paths.to.images.in)
        .pipe($.imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe($.newer(paths.to.images.out))
        .pipe(gulp.dest(paths.to.images.out));
});