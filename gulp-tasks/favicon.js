module.exports = function(gulp, $, log, config, src, dest) {
    return function() {
        log('-> Updating favicon in build folder');

        return gulp.src(src + config.favicon)
            .pipe($.newer(dest))
            .pipe(gulp.dest(dest));
    }
}