var gulp        = require('gulp'),
    nodemon     = require('gulp-nodemon');

gulp.task('develop', function(cb) {
    return nodemon({ script: 'server.js', ext: 'html js'})
    .on('start', function() {
    });
});

gulp.task('default', ['develop'], function() {

});
