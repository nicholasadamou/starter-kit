'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync'),
    autoprefixer = require('autoprefixer'),
    rucksack = require('rucksack-css'),
    bourbon = require('node-bourbon'),
    neat = require('node-neat'),
    lost = require('lost');

var paths = require('../../paths.js'),
    error = require('../../error_handler.js'),
    config = require('../../config.js')();

gulp.task('sass', function() {
    var env = ((config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),
    sass = {
        sourceComments: (config.sassOptions.sourceComments).trim().toLowerCase() ? !env : '',
        outputStyle: (config.sassOptions.outputStyle).trim().toLowerCase() ? !env : 'compressed',
        imagePath: config.sassOptions.imagePath,
        precision: config.sassOptions.precision || 3,
        includePaths: [
            bourbon.includePaths,
            neat.includePaths,
        ],
        errLogToConsole: true
    },
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
        }),
    ];

    if (env) {
        console.log('-> Compiling SASS for Development');

        return gulp.src([
            paths.to.vendors.sass,
            paths.to.sass.in
            ])
            .pipe($.concat('index.css'))
            .pipe($.sourcemaps.init())
            .pipe($.plumber())
            .pipe($.sass(sass)).on('error', error.handler)
            .pipe($.postcss(plugins))
            .pipe($.csscomb(config.root + '.csscomb.json'))
            .pipe($.sourcemaps.write(paths.to.sass.out))
            .pipe(gulp.dest(paths.to.sass.out))
            .pipe(browserSync.reload({ stream: true }));
    } else {
        console.log('-> Compiling SASS for Production');

        return gulp.src([
            paths.to.vendors.sass,
            paths.to.sass.in
            ])
            .pipe($.concat('index.css'))
            .pipe($.plumber())
            .pipe($.sass(sass)).on('error', error.handler)
            .pipe($.postcss(plugins))
            .pipe($.csscomb(config.root + '.csscomb.json'))
            .pipe($.size({ title: 'styles In Size' }))
            .pipe($.stripCssComments({preserve: false}))
            .pipe(cleanCSS())
            .pipe($.size({ title: 'styles Out Size' }))
            .pipe(gulp.dest(paths.to.sass.out))
            .pipe(browserSync.reload({ stream: true }));
    }
});