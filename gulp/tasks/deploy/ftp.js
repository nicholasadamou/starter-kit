'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    ftp = require('vinyl-ftp');

var path = require('../../paths.js'),
    config = require('../../config.js')();

gulp.task('ftp', function() {
    console.log('-> Deploying ./dist to ftp://' + config.FTP.host)

    const conn = ftp.create({
        host: config.FTP.host,
        user: config.FTP.user,
        password: config.FTP.password
    });

    return gulp.src(path.to.dist + '**', {
        base: path.to.dist,
        buffer: false
    })
    .pipe($.plumber({
        errorHandler: $.notify.onError({
            title: 'Error: deployment to ftp://' + config.FTP.host + ' has failed.',
            message: error.message
        })
    }))
    .pipe(conn.newer(config.FTP.target))
    .pipe(conn.dest(config.FTP.target))
    .pipe($.notify({
        title: 'Deployment  to ftp://' + config.FTP.host + ' was successful!',
        message: 'Your project has been deployed to ftp://' + config.FTP.host + '.'
    }));
});