module.exports = function(config, STATE, styles) {
    return function() {
        console.log('-> Compiling SASS Styles');

        var 
            plugins = [
                lost(),
                rucksack(),
                autoprefixer({  
                    browsers: [
                                '> 1%',
                                'last 2 versions',
                                'firefox >= 4',
                                'safari 7',
                                'safari 8',
                                'IE 8',
                                'IE 9',
                                'IE 10',
                                'IE 11'
                            ],
                    })
            ],
            options = {
                html: [config.build + '/*html'],
                ignore: ['*:*']
            };

        if (STATE) {
            console.log('-> Compiling SASS for Development');

            return gulp.src(styles.in)
                .pipe($.sourcemaps.init())
                .pipe($.plumber())
                .pipe($.sass(styles.sass))
                .pipe($.size({ title: 'styles In Size' }))
                .pipe($.postcss(plugins))
                .pipe($.uncss(options))
                .pipe($.size({ title: 'styles Out Size' }))
                .pipe($.sourcemaps.write())
                .pipe(gulp.dest(styles.out))
                .pipe(browserSync.reload({ stream: true }));
        } else {
            console.log('-> Compiling SASS for Production');

            return gulp.src(styles.in)
                .pipe($.plumber())
                .pipe($.sass(styles.sass))
                .pipe($.size({ title: 'styles In Size' }))
                .pipe($.postcss(plugins))
                .pipe($.uncss(options))
                .pipe($.size({ title: 'styles Out Size' }))
                .pipe(gulp.dest(styles.out))
                .pipe(browserSync.reload({ stream: true }));
        }
    }
}