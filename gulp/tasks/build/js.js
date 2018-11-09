'use-strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')({ lazy: true });

const paths = require('../../paths.js');
const config = require('../../config.js')();

const options = {
  eslint: {
    globals: [
      'jQuery',
      '$',
    ],
  },
};

gulp.task('eslint', () => {
  console.log('-> Running eslint');

  // Select files
  gulp.src(`${paths.to.js.in}/**/*.js`)
  // Prevent pipe breaking caused by errors from gulp plugins
    .pipe($.plumber())
  // Check for lint errors
    .pipe($.eslint(options.eslint))
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
    .pipe($.eslint.format())
  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failAfterError last.
    .pipe($.eslint.failAfterError());
});

gulp.task('js', ['eslint'], () => {
  const env = ((config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production');

  console.log(`-> Compiling JavaScript for ${config.environment}`);

  if (env) {
    // Select files
    gulp.src(`${paths.to.js.in}/*.js`)
    // Initialize sourcemaps
      .pipe($.sourcemaps.init())
    // Prevent pipe breaking caused by errors from gulp plugins
      .pipe($.plumber())
    // Concatenate includes
      .pipe($.include())
    // Transpile
      .pipe($.babel())
    // Catch errors
      .pipe($.errorHandle())
    // Save sourcemaps
      .pipe($.sourcemaps.write(paths.to.js.out))
    // Save unminified file
      .pipe(gulp.dest(`${paths.to.js.out}`));
  } else {
    // Select files
    gulp.src(`${paths.to.js.in}/*.js`)
    // Prevent pipe breaking caused by errors from gulp plugins
      .pipe($.plumber())
    // Concatenate includes
      .pipe($.include())
    // Transpile
      .pipe($.babel())
    // Catch errors
      .pipe($.errorHandle())
    // Show file-size before compression
      .pipe($.size({ title: 'Javascript In Size' }))
    // Optimize and minify
      .pipe($.terser())
    // Show file-size after compression
      .pipe($.size({ title: 'Javascript Out Size' }))
    // Append suffix
      .pipe($.rename({
        suffix: '.min',
      }))
    // Save minified file
      .pipe(gulp.dest(`${paths.to.js.out}`));
  }
});
