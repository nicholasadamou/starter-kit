/**
 *  Starter Kit configuration file.
 *  Feel free to modify this file as you need.
 *  If you find any bugs or errors, please submit an issue.
 *
 *  Copyright 2017 Nicholas Adamou. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 */

'use-strict';

// Include gulp plugins
var
 gulp = require('gulp'),
 $ = require('gulp-load-plugins')({ lazy: true });

var
 del = require('del'),
 browserSync = require('browser-sync'),
 pngquant = require('imagemin-pngquant'),
 autoprefixer = require('autoprefixer'),
 rucksack = require('rucksack-css'),
 bourbon = require('node-bourbon').includePaths,
 neat = require('node-neat').includePaths,
 lost = require('lost'),
 ftp = require('vinyl-ftp');

// Required gulp files
var config = require('./config.js')(),
    pkg = require('./package.json');

// Configuration Options
var
  STATE = (( config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),
  src = config.source[--config.source.length] == '/' ? config.source : config.source + '/',
  dest = config.build[--config.build.length] == '/' ? config.build : config.build + '/',
  views = {
    in: src + (config.views[--config.views.length] == '/' ? config.views + '*.pug' : config.views + '/*.pug'),
    out: dest,
    watch: src + (config.views[--config.views.length] == '/' ? config.views + '**/*' : config.views + '/**/*')
  },
  styles = {
    in: src + config.sass,
    watch: [src + config.sass.substring(0, (config.sass.lastIndexOf('/')+1)) + '**/*'],
    out: dest + (config.css[--config.css.length] == '/' ? config.css : config.css + '/'),
    sass: {
      sourceComments: (config.sassOptions.sourceComments).trim().toLowerCase() ? !STATE : '',
      outputStyle: (config.sassOptions.outputStyle).trim().toLowerCase() ? !STATE : 'compressed',
      imagePath: config.sassOptions.imagePath,
      precision: config.sassOptions.precision || 3,
      errLogToConsole: true,
      includePaths: [
          bourbon,
          neat
      ]
    }
  },
  js = {
    in: src + (config.jsDir[--config.jsDir.length] == '/' ? config.jsDir + '**/*' : config.jsDir + '/**/*'),
    out: dest + config.jsDir,
    fileName: config.jsName
  },
  images = {
    in: src + (config.images[--config.images.length] == '/' ? config.images + '**/*.*' : config.images + '/**/*.*'),
    out: dest + config.images,
  },
  vendors = {
    in: src + (config.vendors[--config.vendors.length] == '/' ? config.vendors + '**/*' : config.vendors + '/**/*'),
    out: dest + (config.vendors[--config.vendors.length] == '/' ? config.vendors : config.vendors + '/'),
    watch: [src + (config.vendors[--config.vendors.length] == '/' ? config.vendors + '**/*' : config.vendors + '/**/*')]
  };

log(pkg.name + ' ' + pkg.version + ' ' + config.environment + ' build');

/**
 * Tasks
 */

//Clean the build folder
gulp.task('clean', require(config.tasks + 'clean.js')(gulp, del, log, dest));

//Compile pug templates
gulp.task('pug', require(config.tasks + 'pug.js')(gulp, $, log, config, STATE, views));

// Compile Sass styles
gulp.task('sass', require(config.tasks + 'sass.js')(gulp, $, browserSync, log, config, STATE, styles));

// Compile Javascript files
gulp.task('js', require(config.tasks + 'js.js')(gulp, $, del, log, STATE, dest, js));

// Update images on build folder
gulp.task('images', require(config.tasks + 'images.js')(gulp, $, pngquant, log, images));

// Update Favicon on build folder
gulp.task('favicon', require(config.tasks + 'favicon.js')(gulp, $, log, config, src, dest));

// Copy all vendors to build folder
gulp.task('vendors', require(config.tasks + 'vendors.js')(gulp, $, log, vendors));

// Start browserSync
gulp.task('browserSync', require(config.tasks + 'browserSync.js')(gulp, browserSync, log, config, dest));

// Deploy ./build to a Surge.sh domain
gulp.task('surge', require(config.tasks + 'surge.js')(gulp, $, log, config));

//Deploy ./build to an FTP server
gulp.task('ftp', require(config.tasks + 'ftp.js')(gulp, $, ftp, log, config));

// Publish to GitHub Pages
gulp.task('ghpages', require(config.tasks + 'ghpages.js')(gulp, $, log, config));

// Run Google PageSpeed Insights
gulp.task('pagespeed', require(config.tasks + 'pagespeed.js')(log, config));

// Build Task
gulp.task('build', ['sass', 'pug', 'js', 'images', 'vendors', 'favicon']);

// Watch Task
gulp.task('watch', ['browserSync'], function () {
  // Watch for style changes and compile
  gulp.watch(styles.watch, ['sass']);
  // Watch for pug changes and compile
  gulp.watch(views.watch, ['pug', browserSync.reload]);
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
  log('    ftp: Deploy ./build to an FTP/SFTP server');  
  log('    surge: Deploy ./build to a Surge.sh domain');
  log('    ghpages: Deploy to Github Pages')
  log('    js: Compile the JavaScript files');
  log('    pug: Compile the Pug templates');
  log('    sass: Compile the Sass styles');
  log('    images: Copy the newer to the build folder');
  log('    favicon: Copy the favicon to the build folder');
  log('    vendors: Copy the vendors to the build folder');
  log('    build: Build the project');
  log('    watch: Watch for any changes on the each section');
  log('    start: Compile and watch for changes (for dev)');
  log('    pagespeed: Run Google PageSpeed Insights');  
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
