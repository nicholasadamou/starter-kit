module.exports = function(gulp, $, pngquant, log, images) {
    return function() {
        log('-> Updating images in build folder');

        return gulp.src(images.in)
            .pipe($.imagemin({
                progressive: true,
                interlaced: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe($.newer(images.out))
            .pipe(gulp.dest(images.out));
    }
}