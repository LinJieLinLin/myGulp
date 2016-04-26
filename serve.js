var browserSync = require('browser-sync');
var path = require('path');
module.exports = function(gulp, _, dir, config) {
    //初始化任务
    gulp.task('init', ['copy:js', 'copy:html', 'copy:info', 'copy:css', 'copy:imgs', 'sass'], function() {
        console.log('init');
    });
    //服务器build任务
    gulp.task('buildInit', ['build:html', 'init'], function() {
        console.log('buildInit');
    });
    gulp.task('build', ['clean', 'buildInit'], function() {
        console.log('build');
    });
    gulp.task('b', ['clean', 'build']);
    //开启服务
    gulp.task('default', ['serve'], function() {
        console.log('start default');
    });
    //开启服务器代理
    gulp.task('serve', [
        'init',
        'watch'
    ], function() {
        console.log('start serve');
        browserSync.init({
            // server: {
            //     // routes: {
            //     //     '/bower_components': 'bower_components'
            //     // },
            //     baseDir: '../../'
            // },
            proxy: {
                target: config.proxy || 'http://localhost:8080',
                reqHeaders: function(config) {
                    return {
                        agent: false
                    };
                }
            },
            ghostMode: false,
            port: config.port || 1239,
            ui: {
                port: 4401
            },
            open: false
        });
    });
};
