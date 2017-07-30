'use-strict';

var gulp = require('gulp');

gulp.task('help', function() {
    console.log('');
    console.log("===== Help for Nicholas Adamou's Starter Kit' =====");
    console.log('');
    console.log('Usage: gulp [command]');
    console.log('The commands for the task runner are the following.');
    console.log('------------------------------------------------------');
    console.log('    clean: Removes all the compiled files on ./build');
    console.log('    ftp: Deploy ./build to an FTP/SFTP server');  
    console.log('    surge: Deploy ./build to a Surge.sh domain');
    console.log('    ghpages: Deploy to Github Pages')
    console.log('    js: Compile the JavaScript files');
    console.log('    pug: Compile the Pug templates');
    console.log('    sass: Compile the Sass styles');
    console.log('    images: Copy the newer to the build folder');
    console.log('    favicon: Copy the favicon to the build folder');
    console.log('    vendors: Copy the vendors to the build folder');
    console.log('    build: Build the project');
    console.log('    watch: Watch for any changes on the each section');
    console.log('    start: Compile and watch for changes (for dev)');
    console.log('    pagespeed: Run Google PageSpeed Insights');  
    console.log('    help: Print this message');
    console.log('    browserSync: Start the browserSync server');
    console.log('');
});