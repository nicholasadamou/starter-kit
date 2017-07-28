module.exports = function(config, STATE, views) {
    return function() {
        console.log('-> Compiling Pug Templates');

        var templates = gulp.src(views.in)
            .pipe($.plumber())
            .pipe($.newer(views.out));
        if (!STATE) {
            console.log('-> Compressing templates for Production')
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