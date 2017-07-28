module.exports = function(config, src, dest) {
    return function() {
        console.log('-> Updating favicon in build folder');

        return gulp.src(src + config.favicon)
            .pipe($.newer(dest))
            .pipe(gulp.dest(dest));
    }
}