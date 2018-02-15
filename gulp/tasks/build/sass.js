'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    bower = require('main-bower-files'),
    merge = require('merge-stream')
    cleanCSS = require('gulp-clean-css'),
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

    var app = gulp.src(paths.to.sass.in)
        .pipe($.plumber())
        .pipe($.sass(sass)).on('error', error.handler)
        .pipe($.postcss(plugins))
        .pipe($.csscomb(config.root + '.csscomb.json'));

    if (env) {
        console.log('-> Compiling SASS for Development');

        return merge(gulp.src(bower(config.files.styles)), app)
            .pipe($.concat('index.css'))
            .pipe($.sourcemaps.init())
            .pipe($.plumber())
            .pipe($.sourcemaps.write(paths.to.sass.out))
            .pipe(gulp.dest(paths.to.sass.out));

    } else {
        console.log('-> Compiling SASS for Production');

        return merge(gulp.src(bower(config.files.styles)), app)
            .pipe($.concat('index.css'))
            .pipe($.plumber())
            .pipe($.size({ title: 'styles In Size' }))
            .pipe($.stripCssComments({ preserve: false }))
            .pipe(cleanCSS())
            .pipe($.size({ title: 'styles Out Size' }))
            .pipe(gulp.dest(paths.to.sass.out));
    }
});