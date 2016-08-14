/**
 * Gulp Starter Kit configuration file.
 * Feel free to modify this file as you need.
 * If you find any bugs or errors, please submit an issue.
 */

// Required gulp files
var gulp = require('gulp');
var config = require('./config.js')();

// Include gulp plugins
var del = require('del');
var browserSync = require('browser-sync');
var pngquant = require('imagemin-pngquant');
var autoprefixer = require('gulp-autoprefixer');
var $ = require('gulp-load-plugins')({ lazy: true });

// Configuration Options
var
  devBuild = (( config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),
  source = config.source[--config.source.length] == '/' ? config.source : config.source + '/',
  dest = config.build[--config.build.length] == '/' ? config.build : config.build + '/',
  pkg = require('./package.json'),
  images = {
    in: source + (config.images[--config.images.length] == '/' ? config.images + '**/*.*' : config.images + '/**/*.*'),
    out: dest + config.images,
    imageminOptions: {
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }
  },
  views = {
    in: source + (config.views[--config.views.length] == '/' ? config.views + '*.jade' : config.views + '/*.jade'),
    out: dest,
    watch: source + (config.views[--config.views.length] == '/' ? config.views + '**/*' : config.views + '/**/*')
  },
  styles = {
    in: source + config.sass,
    watch: [source + config.sass.substring(0, (config.sass.lastIndexOf('/')+1)) + '**/*'],
    out: dest + (config.css[--config.css.length] == '/' ? config.css : config.css + '/'),
    sass: {
      sourceComments: (config.sassOptions.sourceComments).trim().toLowerCase() ? !devBuild : '',
      outputStyle: (config.sassOptions.outputStyle).trim().toLowerCase() ? !devBuild : 'compressed',
      imagePath: config.sassOptions.imagePath,
      precision: config.sassOptions.precision || 3,
      errLogToConsole: true
    },
    pleeeaseOptions: {
      autoprefixer: { browsers: ['last 2 versions', '> 2%'] },
      rem: ['16px'],
      pseudoElements: true,
      mqpacker: true,
      minifier: !devBuild
    },
    rucksackOptions: {
      clearFix: false,
      fallbacks: true
    }
  },
  js = {
    in: source + (config.jsDir[--config.jsDir.length] == '/' ? config.jsDir + '**/*' : config.jsDir + '/**/*'),
    out: dest + config.jsDir,
    fileName: config.jsName,

    browserifyOptions: {
      debug: true
    }
  },
  syncOptions = {
    server: {
      baseDir: dest,
      index: config.syncOptions.index || 'index.html'
    },
    open: config.syncOptions.open || false,
    notify: config.syncOptions.notify || true
  },
  jadeOptions = { pretty: devBuild },
  vendors = {
    in: source + (config.vendors[--config.vendors.length] == '/' ? config.vendors + '**/*' : config.vendors + '/**/*'),
    out: dest + (config.vendors[--config.vendors.length] == '/' ? config.vendors : config.vendors + '/'),
    watch: [source + (config.vendors[--config.vendors.length] == '/' ? config.vendors + '**/*' : config.vendors + '/**/*')]
  };

log(pkg.name + ' ' + pkg.version + ' ' + config.environment + ' build');

/**
 * Tasks
 */

//Clean the build folder
gulp.task('clean', function () {
  log('-> Cleaning build folder');

  del([
    dest + '*'
  ]);
});

//Compile Jade templates
gulp.task('jade', function () {
  log('-> Compiling Jade Templates');

  var templates = gulp.src(views.in)
    .pipe($.plumber())
    .pipe($.newer(views.out));
  if (!devBuild) {
    log('-> Compressing templates for Production')
    templates = templates
      .pipe($.size({ title: 'Jade Templates Before Compression' }))
      .pipe($.jade())
      .pipe($.size({ title: 'Jade Templates After Compression' }));
  } else {
    templates.pipe($.jade(jadeOptions));
  }
  return templates.pipe(gulp.dest(views.out));
});

// Compile Sass styles
gulp.task('sass', function () {
  log('-> Compiling SASS Styles');

  if (devBuild) {
    log('-> Compiling SASS for Development');

    return gulp.src(styles.in)
      .pipe($.sourcemaps.init())
      .pipe($.plumber())
      .pipe($.sass(styles.sass))
      .pipe($.rucksack(styles.rucksackOptions))
      .pipe($.size({ title: 'styles In Size' }))
      .pipe($.pleeease(styles.pleeeaseOptions))
      .pipe($.size({ title: 'styles Out Size' }))
      .pipe($.sourcemaps.write())
      .pipe(autoprefixer())
      .pipe(gulp.dest(styles.out))
      .pipe(browserSync.reload({ stream: true }));
  } else {
    log('-> Compiling SASS for Production');

    return gulp.src(styles.in)
      .pipe($.plumber())
      .pipe($.sass(styles.sass))
      .pipe($.rucksack(styles.rucksackOptions))
      .pipe($.size({ title: 'styles In Size' }))
      .pipe($.pleeease(styles.pleeeaseOptions))
      .pipe($.size({ title: 'styles Out Size' }))
      .pipe(autoprefixer())
      .pipe(gulp.dest(styles.out))
      .pipe(browserSync.reload({ stream: true }));
  }
});

// Compile Javascript files
gulp.task('js', function () {
  if (devBuild) {
    log('-> Compiling Javascript for Development');

    return gulp.src(js.in)
      .pipe($.sourcemaps.init())
      .pipe($.browserify(js.browserifyOptions))
      .pipe($.plumber())
      .pipe($.newer(js.out))
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
      .pipe($.jshint.reporter('fail'))
      .pipe($.concat(js.fileName))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(js.out));
  } else {
    log('-> Compiling Javascript for Production');

    del([
      dest + 'js/*'
    ]);

    return gulp.src(js.in)
      .pipe($.sourcemaps.init())
      .pipe($.browserify(js.browserifyOptions))
      .pipe($.plumber())
      .pipe($.deporder())
      .pipe($.concat(js.fileName))
      .pipe($.size({ title: 'Javascript In Size' }))
      .pipe($.stripDebug())
      .pipe($.uglify())
      .pipe($.size({ title: 'Javascript Out Size' }))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(js.out));
  }
});

// Update images on build folder
gulp.task('images', function () {
  log('-> Updating images in build folder');

  return gulp.src(images.in)
    .pipe($.imagemin(images.imageminOptions))
    .pipe($.newer(images.out))
    .pipe(gulp.dest(images.out));
});

// Update Favicon on build folder
gulp.task('favicon', function () {
  log('-> Updating favicon in build folder');

  return gulp.src(source + config.favicon)
    .pipe($.newer(dest))
    .pipe(gulp.dest(dest));
});

// Copy all vendors to build folder
gulp.task('vendors', function () {
  log('-> Updating vendors in build folder');

  return gulp.src(vendors.in)
    .pipe($.newer(vendors.out))
    .pipe(gulp.dest(vendors.out));
});

// Start browserSync
gulp.task('browserSync', function () {
  log('-> Starting browserSync');

  browserSync(syncOptions);
});

// Build Task
gulp.task('build', ['sass', 'jade', 'js', 'images', 'vendors', 'favicon']);

// Watch Task
gulp.task('watch', ['browserSync'], function () {
  // Watch for style changes and compile
  gulp.watch(styles.watch, ['sass']);
  // Watch for jade changes and compile
  gulp.watch(views.watch, ['jade', browserSync.reload]);
  // Watch for javascript changes and compile
  gulp.watch(js.in, ['js', browserSync.reload]);
  // Watch for new vendors and copy
  gulp.watch(vendors.watch, ['vendors']);
  // Watch for new images and copy
  gulp.watch(images.in, ['images']);
});

// Compile and Watch task
gulp.task('start', ['build', 'watch']);

// Help Task
gulp.task('help', function () {
  log('');
  log("===== Help for Nicholas Adamou's Starter Kit' =====");
  log('');
  log('Usage: gulp [command]');
  log('The commands for the task runner are the following.');
  log('------------------------------------------------------');
  log('    clean: Removes all the compiled files on ./build');
  log('    js: Compile the JavaScript files');
  log('    jade: Compile the Jade templates');
  log('    sass: Compile the Sass styles');
  log('    images: Copy the newer to the build folder');
  log('    favicon: Copy the favicon to the build folder');
  log('    vendors: Copy the vendors to the build folder');
  log('    build: Build the project');
  log('    watch: Watch for any changes on the each section');
  log('    start: Compile and watch for changes (for dev)');
  log('    help: Print this message');
  log('    browserSync: Start the browserSync server');
  log('');
});

// Default Task
gulp.task('default', ['help']);

/**
 * Custom functions
 */
 function log(msg) {
   console.log(msg);
}
