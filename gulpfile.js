var gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'browserify'],
        replaceString: /\bgulp[\-.]/
    }),
    dest        = 'public/',
    source      = require('vinyl-source-stream');

gulp.task('develop', function(cb) {
    return plugins.nodemon({ script: 'server.js', ext: 'html js'})
    .on('start', function() {
    });
});

gulp.task('js', function() {
    gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter('*.js'))
        .pipe(plugins.concat('main.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dest+'scripts')) 
});

gulp.task('browserify', function() {
    return plugins.browserify('./src/javascript/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(dest+'scripts'));
});

gulp.task('default', ['js','develop'], function() {

});
