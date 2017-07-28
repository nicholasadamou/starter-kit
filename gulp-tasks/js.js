module.exports = function(gulp, $, del, log, STATE, dest, js) {
    return function() {
        if (STATE) {
            log('-> Compiling Javascript for Development');

            return gulp.src(js.in)
                .pipe($.sourcemaps.init())
                .pipe($.browserify({ debug: true }))
                .pipe($.plumber())
                .pipe($.babel())
                .pipe($.newer(js.out))
                .pipe($.jshint())
                .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
                .pipe($.jshint.reporter('fail'))
                .pipe($.concat(js.fileName))
                .pipe($.sourcemaps.write())
                .pipe($.rename({ suffix: '.min' }))
                .pipe(gulp.dest(js.out));
        } else {
            log('-> Compiling Javascript for Production');

            del([
                dest + 'js/*'
            ]);

            return gulp.src(js.in)
                .pipe($.browserify({ debug: true }))
                .pipe($.plumber())
                .pipe($.babel())
                .pipe($.deporder())
                .pipe($.concat(js.fileName))
                .pipe($.size({ title: 'Javascript In Size' }))
                .pipe($.stripDebug())
                .pipe($.uglify())
                .pipe($.size({ title: 'Javascript Out Size' }))
                .pipe($.rename({ suffix: '.min' }))
                .pipe(gulp.dest(js.out));
        }
    }
}