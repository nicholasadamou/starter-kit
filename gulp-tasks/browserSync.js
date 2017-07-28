module.exports = function(config, dest) {
    return function() {
        console.log('-> Starting browserSync');

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