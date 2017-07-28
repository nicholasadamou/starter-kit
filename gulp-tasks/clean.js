module.exports = function(dest) {
    return function() {
        console.log('-> Cleaning build folder');

        del([
            dest + '*'
        ]);
    }
}