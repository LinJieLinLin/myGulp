var del = require('del').sync;
var path = require('path');
module.exports = function(gulp, _, dir, config, configObj) {
    //合并压缩 html
    gulp.task('build:html', ['init'], function() {
        var path = configObj.main + config.dir.html[1];
        var outPathDist = config.dir.dist;
        console.log(path, outPathDist);
        return gulp.src(path)
            .pipe(_.useref())
            .pipe(_.if('*.css', _.cleanCss({ compatibility: 'ie8' })))
            .pipe(_.if('*.js', _.uglify()))
            .pipe(_.if('*.html', _.htmlmin({ collapseWhitespace: true, removeComments: true, minifyJS: true, minifyCSS: true })))
            .pipe(gulp.dest(outPathDist));
    });
    //清理dist目录
    gulp.task('clean', function() {
        console.log('start clean');
        return del(['dist/**', '!dist', '!dist/.git/**']);
    });
    gulp.task('c', ['clean']);
    //初始化dist目录并添加git仓库
    gulp.task('initDist', _.shell.task([configObj.initDist[0], configObj.initDist[1], configObj.initDist[2], configObj.initDist[3]]));
    //针对rcp-common
    gulp.task('fontawesome:css', ['fontawesome:replace'], function() {
        return gulp.src(path.resolve(__dirname, '../../font-awesome/scss/font-awesome.scss'))
            .pipe(_.sass({ outputStyle: 'expanded' }))
            .pipe(gulp.dest(config.dir.src + '/styles'));
    });

    gulp.task('fontawesome:replace', function() {
        return gulp.src(path.resolve(__dirname, '../../font-awesome/scss/_variables.scss'))
            .pipe(_.replace('../fonts', '/rcp-common/fonts'))
            .pipe(gulp.dest(path.resolve(__dirname, '../../font-awesome/scss')));
    });

    gulp.task('fontawesome:font', ['fontawesome:css'], function() {
        return gulp.src(path.resolve(__dirname, '../../font-awesome/fonts/*'))
            .pipe(gulp.dest(config.dir.src + '/fonts'));
    });
    //旧rcp-common的任务，暂无作用
    // gulp.task('iconfontSvg', function() {
    //     return gulp.src(path.resolve(__dirname, 'src/svgs/*'), { base: './src' })
    //     .pipe(_.iconfont({ fontName: 'iconfont' }))
    //     .on('glyphs', function(glyphs) {
    //         glyphs.forEach(function(item) {
    //             item.code = item.unicode[0].charCodeAt(0).toString(16).toUpperCase();
    //         });
    //         gulp.src(path.resolve(__dirname, 'iconfont-tmpl.handlebars'))
    //             .pipe(_.consolidate('handlebars', {
    //                 glyphs: glyphs,
    //                 fontName: 'iconfont',
    //                 fontPath: '/fonts/',
    //                 className: 'icon'
    //             }))
    //             .on('error', function(e) { console.log(e); })
    //             .pipe(_.rename('_iconfont.scss'))
    //             .pipe(gulp.dest(path.resolve(__dirname, 'src/styles/module')));
    //     })
    //     .pipe(gulp.dest(path.resolve(__dirname, 'fonts/')));
    // });
    //rcp-common包第一次安装时要执行
    gulp.task('build:common', ['fontawesome:font']);
};
