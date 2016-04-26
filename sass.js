module.exports = function(gulp, _, dir, config, configObj) {
    //复制旧的css文件
    gulp.task('copy:css', function() {
        console.log('css', config.dir.css[0], config.dir.scss[0]);
        var outPath = configObj.main;
        var outPathDist = config.dir.dist;
        return gulp.src(config.dir.css[0])
            //压缩
            .pipe(_.cleanCss({ compatibility: 'ie8' }))
            .pipe(gulp.dest(outPath))
            .pipe(gulp.dest(outPathDist));
    });

    gulp.task('sass', ['sprites'], function() {
        var outPath = configObj.main;
        var outPathDist = config.dir.dist;
        return gulp.src(config.dir.scss[0])
            .pipe(_.plumber())
            // compile the sass file to css file.
            .pipe(_.sass({ outputStyle: 'expanded' }))
            .pipe(_.cleanCss({ compatibility: 'ie8' }))
            // add vendor prefixes to the css file
            .pipe(_.autoprefixer({ browsers: ['chrome > 35', 'ff > 10', 'opera > 10', 'ie > 6'] }))
            .pipe(gulp.dest(outPath))
            .pipe(gulp.dest(outPathDist));
    });
    // use gulpsync to make sure `sass` task is excuted after `sprites` and `iconfont` tasks.
    gulp.task('compile:css', ['sass']);
};
