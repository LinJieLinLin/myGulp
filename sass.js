var Transform = require('readable-stream/transform');
var fs = require('fs');
var path = require('path');
module.exports = function(gulp, _, dir, config, configObj) {
    //directive 模板替换
    //html处理如下:应包含 '<style type="text/css"></style>'
    function replaceCss() {
        return new Transform({
            objectMode: true,
            transform: function(file, enc, callback) {
                console.log(file.history[0]);
                if (file.isNull()) {
                    return callback(null, file);
                }
                var filePath = file.history[0].replace('.scss', '.html');
                try {
                    var c = fs.readFileSync(filePath, 'utf8');
                    var oldContent = String(file.contents);
                    var newContent = c.replace(/<style type="text\/css">[^]*<\/style>/im, function(match) {
                        console.log(match);
                        return '<style type="text/css">' + oldContent + '</style>';
                    });
                    if (c != newContent) {
                        fs.writeFile(filePath, newContent, function(err) {
                            if (err) throw err;
                            console.log('It\'s saved!');
                        });
                    }
                } catch (e) {
                    console.log('no filePath:' + filePath);
                }
                callback(null, file);
            }
        });
    }
    //js处理如下:应包含 '//cssStart //cssEnd' id为tpl-文件名
    function replaceCssJs() {
        return new Transform({
            objectMode: true,
            transform: function(file, enc, callback) {
                console.log(file.history[0]);
                if (file.isNull()) {
                    return callback(null, file);
                }
                var filePath = file.history[0].replace('.scss', '.js');
                try {
                    var c = fs.readFileSync(filePath, 'utf8');
                    var oldContent = String(file.contents);
                    var newContent = c.replace(/\/\/cssStart[^]*\/\/cssEnd/im, function(match) {
                        console.log(filePath, match);
                        var temId = path.basename(file.history[0], '.scss');
                        return '//cssStart\n var cssTpl=\'<style type="text/css" id="tpl-' + temId +
                            '">' + oldContent + '</style>\';\n' +
                            'if (!$("#tpl-' + temId + '").length) {$("body").prepend(cssTpl);}\n//cssEnd';
                    });
                    if (c != newContent) {
                        fs.writeFile(filePath, newContent, function(err) {
                            if (err) throw err;
                            console.log('It\'s saved!');
                        });
                    }
                } catch (e) {
                    console.log('no filePath:' + filePath);
                }
                callback(null, file);
            }
        });
    }
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
            //directive css写入html,js
            .pipe(replaceCssJs())
            .pipe(replaceCss())
            .pipe(gulp.dest(outPath))
            .pipe(gulp.dest(outPathDist));
    });
    // use gulpsync to make sure `sass` task is excuted after `sprites` and `iconfont` tasks.
    gulp.task('compile:css', ['sass']);
};
