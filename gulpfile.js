/**
 *  Starter-Kit configuration file.
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
var gulp = require('gulp'),
    requireDir  = require('require-dir');

var config = require('./gulp/config.js')();

requireDir('./gulp/tasks', { recurse: true });

console.log(config.pkg.name + ' ' + config.pkg.version + ' ' + config.environment + ' build');

gulp.task('build', ['js', 'pug', 'sass', 'images', 'docs']);
gulp.task('start', ['build', 'watch']);
gulp.task('default', ['help']);