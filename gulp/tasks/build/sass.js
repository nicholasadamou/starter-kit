'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    browserSync = require('browser-sync'),
    autoprefixer = require('autoprefixer'),
    rucksack = require('rucksack-css'),
    bourbon = require('node-bourbon').includePaths,
    neat = require('node-neat').includePaths,
    lost = require('lost');

var path = require('../../paths.js'),
    error = require('../../error_handler.js'),
    config = require('../../config.js')();

gulp.task('sass', function() {
    console.log('-> Compiling SASS Styles');
    
    var env = ((config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),
    sass = {
      sourceComments: (config.sassOptions.sourceComments).trim().toLowerCase() ? !env : '',
      outputStyle: (config.sassOptions.outputStyle).trim().toLowerCase() ? !env : 'compressed',
      imagePath: config.sassOptions.imagePath,
      precision: config.sassOptions.precision || 3,
      errLogToConsole: true,
      includePaths: [
          bourbon,
          neat
      ]
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
            })
        ];

    if (env) {
        console.log('-> Compiling SASS for Development');

        return gulp.src(path.to.sass.in)
            .pipe($.sourcemaps.init())
            .pipe($.plumber())
            .pipe($.sass(sass))
                .on('error', error.handler)
            .pipe($.size({ title: 'styles In Size' }))
            .pipe($.postcss(plugins))
            .pipe($.size({ title: 'styles Out Size' }))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(path.to.sass.out))
            .pipe(browserSync.reload({ stream: true }));
    } else {
        console.log('-> Compiling SASS for Production');

        return gulp.src(path.to.sass.in)
            .pipe($.plumber())
            .pipe($.sass(sass))
                .on('error', error.handler)
            .pipe($.size({ title: 'styles In Size' }))
            .pipe($.postcss(plugins))
            .pipe($.uncss({
                html: [path.to.dist + '*html'],
                ignore: ['*:*']
            }))
            .pipe($.csscomb())
            .pipe($.size({ title: 'styles Out Size' }))
            .pipe(gulp.dest(path.to.sass.out))
            .pipe(browserSync.reload({ stream: true }));
    }
});