var gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')({
                    pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'browserify', 'reactify', 'uglifyify', 'envify'],
                    replaceString: /\bgulp[\-.]/
    }),
    dest        = 'public/',
    source      = require('vinyl-source-stream');

gulp.task('develop', function(cb) {
    return plugins.nodemon({ script: 'server.js', ext: 'html js'})
    .on('start', function() {
    });
});

gulp.task('browserify', function() {
    return plugins.browserify('./src/js/app.js')
        .transform(plugins.reactify)
        .transform(plugins.envify)
        .transform(plugins.uglifyify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(dest+'scripts'));
});

gulp.task('default', ['browserify','develop'], function() {

});
