module.exports = function(gulp, $, log, vendors) {
    return function() {
        log('-> Updating vendors in build folder');

        return gulp.src(vendors.in)
            .pipe($.newer(vendors.out))
            .pipe(gulp.dest(vendors.out));
    }
}