module.exports = function(gulp, $, log, config, STATE, views) {
    return function() {
        log('-> Compiling Pug Templates');

        var templates = gulp.src(views.in)
            .pipe($.plumber())
            .pipe($.newer(views.out));
        if (!STATE) {
            log('-> Compressing templates for Production')
            templates = templates
                .pipe($.size({ title: 'Pug Templates Before Compression' }))
                .pipe($.pug())
                .pipe($.size({ title: 'Pug Templates After Compression' }));
        } else {
            templates.pipe($.pug({ pretty: STATE }));
        }
        return templates.pipe(gulp.dest(views.out));
    }
}