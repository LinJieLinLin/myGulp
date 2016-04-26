module.exports = function(gulp, _, dir, config, configObj) {
    //复制根目录的html
    gulp.task('copy:html', ['copy:html-module'], function() {        
        var path = config.dir.html[0];
        var outPath = configObj.main;
        var outPathDist = config.dir.dist;
        console.log('html', config.dir.html[0], configObj.main,outPath);
        return gulp.src(path)
            //压缩HTML
            // .pipe(_.htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true }))
            .pipe(gulp.dest(outPath));
        // .pipe(gulp.dest(outPathDist));
    });
    //复制子目录下的html
    gulp.task('copy:html-module', function() {
        console.log('html-module', config.dir.html[2], configObj.main);
        var path = config.dir.html[2];
        var outPath = configObj.main;
        var outPathDist = config.dir.dist;
        return gulp.src([path, '!' + config.dir.html[3]])
            //压缩HTML
            .pipe(gulp.dest(outPath))
            .pipe(_.htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true }))
            .pipe(gulp.dest(outPathDist));
    });
};
