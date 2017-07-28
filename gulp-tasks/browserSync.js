module.exports = function(gulp, browserSync, log, config, dest) {
    return function() {
        log('-> Starting browserSync');

        browserSync({
            server: {
                baseDir: dest,
                index: config.syncOptions.index || 'index.html'
            },
            open: config.syncOptions.open || false,
            notify: config.syncOptions.notify || true
        });
    }
}