module.exports = function(gulp, del, log, dest) {
    return function() {
        log('-> Cleaning build folder');

        del([
            dest + '*'
        ]);
    }
}