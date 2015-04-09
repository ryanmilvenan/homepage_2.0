var gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
        replaceString: /\bgulp[\-.]/
    }),
    dest        = 'public/';

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
        .pipe(gulp.dest(dest+'scripts')); 
});

gulp.task('default', ['js','develop'], function() {

});
