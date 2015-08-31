/**
 * Starter Kit Gulp configuration file.
 * Feel free to modify this file as you need.
 * if you find any bug or error, please submit an issue.
 */
// Include gulp plugins
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var browsersync = require('browser-sync');
var del = require('del');
var config = require('./config.js')();

// Configs
var
  devBuild = (( config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),
  source = config.source[--config.source.length] == '/' ? config.source : config.source + '/',
  dest = config.build[--config.build.length] == '/' ? config.build : config.build + '/',
  pkg = require('./package.json'),
  images = {
    in: source + (config.images[--config.images.length] == '/' ? config.images + '**/*.*' : config.images + '/**/*.*'),
    out: dest + config.images
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
    sassOpt: {
      outputStyle: config.sassOptions.outputStyle || 'expanded',
      imagePath: config.sassOptions.imagePath,
      precision: config.sassOptions.precision || 3,
      errLogToConsole: true
    },
    pleeeaseOpt: {
      autoprefixer: { browsers: ['last 2 versions', '> 2%'] },
      rem: ['16px'],
      pseudoElements: true,
      mqpacker: true,
      minifier: !devBuild
    }
  },
  js = {
    in: source + (config.jsDir[--config.jsDir.length] == '/' ? config.jsDir + '**/*' : config.jsDir + '/**/*'),
    out: dest + config.jsDir,
    filename: config.jsName
  },
  syncOpt = {
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

console.log(pkg.name + ' ' + pkg.version + ' ' + config.environment + ' build');

/**
 * Tasks
 */
//Clean the build folder
gulp.task('clean', function () {
  log('-> Cleaning build folder')
  del([
    dest + '*'
  ]);
});

// Compile Javascript files
gulp.task('js', function () {
  if (devBuild) {
    log('-> Compiling Javascript for Development')
    return gulp.src(js.in)
      .pipe($.plumber())
      .pipe($.newer(js.out))
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
      .pipe($.jshint.reporter('fail'))
      .pipe($.concat(js.filename))
      .pipe(gulp.dest(js.out));
  } else {
    log('-> Compiling Javascript for Production')
    del([
      dest + 'js/*'
    ]);
    return gulp.src(js.in)
      .pipe($.plumber())
      .pipe($.deporder())
      .pipe($.concat(js.filename))
      .pipe($.size({ title: 'Javascript In Size' }))
      .pipe($.stripDebug())
      .pipe($.uglify())
      .pipe($.size({ title: 'Javascript Out Size' }))
      .pipe(gulp.dest(js.out));
  }
});

// Update images on build folder
gulp.task('images', function () {
  return gulp.src( images.in )
    .pipe($.newer(images.out))
    .pipe(gulp.dest(images.out));
});

// Update Favicon on build folder
gulp.task('favicon', function () {
  return gulp.src(source + config.favicon)
    .pipe($.newer(dest))
    .pipe(gulp.dest(dest));
});

// Copy all vendors to build folder
gulp.task('vendors', function () {
  return gulp.src(vendors.in)
    .pipe($.newer(vendors.out))
    .pipe(gulp.dest(vendors.out));
});

//Compile Jade templates
gulp.task('jade', function () {
  log('-> Compiling Jade Templates')

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
  log('-> Compile SASS Styles')
  return gulp.src(styles.in)
    .pipe($.plumber())
    .pipe($.sass(styles.sassOpt))
    .pipe($.size({ title: 'styles In Size' }))
    .pipe($.pleeease(styles.pleeeaseOpt))
    .pipe($.size({ title: 'styles Out Size' }))
    .pipe(gulp.dest(styles.out))
    .pipe(browsersync.reload({ stream: true }));
});

// Start BrowserSync
gulp.task('browsersync', function () {
  log('-> Starting BrowserSync')
  browsersync(syncOpt);
});

// Build Task
gulp.task('build', ['sass', 'jade', 'js', 'images', 'vendors', 'favicon']);

// Watch Task
gulp.task('watch', ['browsersync'], function () {
  // Watch for style changes and compile
  gulp.watch(styles.watch, ['sass']);
  // Watch for jade changes and compile
  gulp.watch(views.watch, ['jade', browsersync.reload]);
  // Watch for javascript changes and compile
  gulp.watch(js.in, ['js', browsersync.reload]);
  // Watch for new vendors and copy
  gulp.watch(vendors.watch, ['vendors']);
  // Watch for new images and copy
  gulp.watch(images.in, ['images']);
});

// Compile and Watch task
gulp.task('start', ['build', 'watch']);

// Help Task
gulp.task('help', function () {
  console.log('');
  console.log('===== Help for Nicholas Adamou's Starter Kit' =====');
  console.log('');
  console.log('Usage: gulp [command]');
  console.log('The commands for the task runner are the following.');
  console.log('-------------------------------------------------------');
  console.log('       clean: Removes all the compiled files on ./build');
  console.log('          js: Compile the JavaScript files');
  console.log('        jade: Compile the Jade templates');
  console.log('        sass: Compile the Sass styles');
  console.log('      images: Copy the newer to the build folder');
  console.log('     favicon: Copy the favicon to the build folder');
  console.log('     vendors: Copy the vendors to the build folder');
  console.log('       build: Build the project');
  console.log('       watch: Watch for any changes on the each section');
  console.log('       start: Compile and watch for changes (for dev)');
  console.log('        help: Print this message');
  console.log(' browsersync: Start the browsersync server');
  console.log('');
});

// Default Task
gulp.task('default', ['help']);

/**
 * Custom functions
 */
 function log(msg) {
   console.log(msg);
}
