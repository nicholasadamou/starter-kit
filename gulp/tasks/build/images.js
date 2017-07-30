'use-strict';

var gulp = require('gulp')
    $ = require('gulp-load-plugins')({ lazy: true }),
    pngquant = require('imagemin-pngquant');

var path = require('../../paths.js');

gulp.task('images', function() {
    console.log('-> Updating images in build folder');

    return gulp.src(path.to.images.in)
        .pipe($.imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe($.newer(path.to.images.out))
        .pipe(gulp.dest(path.to.images.out));
});