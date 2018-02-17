'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    ftp = require('vinyl-ftp');

var paths = require('../../paths.js'),
    config = require('../../config.js')();

gulp.task('ftp', ['build'], function() {
    console.log('-> Deploying to ftp://' + config.FTP.host);

    var conn = ftp.create({
        host: config.FTP.host,
        user: config.FTP.user,
        password: config.FTP.password
    });

    return gulp.src(paths.to.dist + '**', {
        base: paths.to.build,
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
