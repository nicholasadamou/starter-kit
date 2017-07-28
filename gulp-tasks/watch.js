module.exports = function(styles, views, js, images, vendors) {
    return function() {
        // Watch for style changes and compile
        gulp.watch(styles.watch, ['sass']);
        // Watch for pug changes and compile
        gulp.watch(views.watch, ['pug', browserSync.reload]);
        // Watch for javascript changes and compile
        gulp.watch(js.in, ['js', browserSync.reload]);
        // Watch for new images and copy
        gulp.watch(images.in, ['images']);
        // Watch for new vendors and copy
        gulp.watch(vendors.watch, ['vendors']);
    }
}