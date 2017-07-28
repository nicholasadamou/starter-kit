module.exports = function(gulp, $, log, config) {
    return function() {
        log('-> Deploying ./build to ftp://' + config.FTP.host)

        const conn = ftp.create({
            host: config.FTP.host,
            user: config.FTP.user,
            password: config.FTP.password
        });

        return gulp.src(config.build + '**', {
            base: config.build,
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
    }
}