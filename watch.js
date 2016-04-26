var browserSync = require('browser-sync');

module.exports = function(gulp, _, dir, config) {
    gulp.task('reload', function() {
        console.log('-----------------');
        browserSync.reload();
    });

    gulp.task('watch', ['init'], function() {
        // gulp.watch('!' + dir('../tool'), [dir('../**/*.js')], _.sync(gulp).sync(['reload']));
        gulp.watch(config.dir.js[0], _.sync(gulp).sync(['copy:js', 'reload']));
        gulp.watch(config.dir.directive[0], _.sync(gulp).sync(['copy:js', 'reload']));
        gulp.watch(config.dir.html[2], _.sync(gulp).sync(['copy:html', 'reload']));
        gulp.watch(config.dir.css[0], _.sync(gulp).sync(['copy:css', 'reload']));
        gulp.watch(config.dir.scss[0], _.sync(gulp).sync(['sass', 'reload']));
        gulp.watch(config.dir.img[0], _.sync(gulp).sync(['copy:imgs', 'reload']));
        // gulp.watch(dir('src/**/*.*'), _.sync(gulp).sync(['reload']));
    });
};
