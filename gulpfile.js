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

console.log(pkg.name + ' ' + pkg.version + ' ' + config.environment + ' build');

/**
 * Tasks
 */

//Clean the build folder
gulp.task('clean', ['gulp', 'del'], require(config.tasks + 'clean.js')(dest));

//Compile pug templates
gulp.task('pug', ['gulp', '$'], require(config.tasks + 'pug.js')(config, STATE, views));

// Compile Sass styles
gulp.task('sass', ['gulp', '$', 'browserSync'], require(config.tasks + 'sass.js')(config, STATE, styles));

// Compile Javascript files
gulp.task('js', ['gulp', '$', 'del'], require(config.tasks + 'js.js')(STATE, dest, js));

// Update images on build folder
gulp.task('images', ['gulp', '$', 'pngquant'], require(config.tasks + 'images.js')(images));

// Update Favicon on build folder
gulp.task('favicon', ['gulp', '$'], require(config.tasks + 'favicon.js')(config, src, dest));

// Copy all vendors to build folder
gulp.task('vendors', ['gulp', '$'], require(config.tasks + 'vendors.js')(vendors));

// Start browserSync
gulp.task('browserSync', ['gulp', '$', 'browserSync'], require(config.tasks + 'browserSync.js')(config, dest));

// Deploy ./build to a Surge.sh domain
gulp.task('surge', ['gulp', '$'], require(config.tasks + 'surge.js')(config));

//Deploy ./build to an FTP server
gulp.task('ftp', ['gulp', '$', 'ftp'], require(config.tasks + 'ftp.js')(config));

// Publish to GitHub Pages
gulp.task('ghpages', ['gulp', '$'], require(config.tasks + 'ghpages.js')(config));

// Run Google PageSpeed Insights
gulp.task('pagespeed', require(config.tasks + 'pagespeed.js')(config));

// Build Task
gulp.task('build', ['sass', 'pug', 'js', 'images', 'vendors', 'favicon']);

// Watch Task
gulp.task('watch', ['browserSync'], require(config.tasks + 'watch.js')(styles, views, js, images, vendors));

// Compile and Watch task
gulp.task('start', ['build', 'watch']);

// Help Task
gulp.task('help', require(config.tasks + 'help.js')());

// Default Task
gulp.task('default', ['help']);
