var Transform = require('readable-stream/transform');
var fs = require('fs');
var htmlmin = require('html-minifier').minify;
module.exports = function(gulp, _, dir, config, configObj) {
    //directive 模板替换
    function replaceTmpl() {
        return new Transform({
            objectMode: true,
            transform: function(file, enc, callback) {
                if (file.isNull()) {
                    return callback(null, file);
                }
                var content = String(file.contents);
                var n = content.replace(/templateUrl\s*?:\s*?["|'](.*?)["|']/igm, function(match, url) {
                    var c = fs.readFileSync(dir('src/' + url), 'utf8');
                    var min = htmlmin(c, { collapseWhitespace: true, removeComments: true, minifyJS: true, minifyCSS: true }).replace(/'/g, "\\'");
                    return 'template:\'' + min + '\'';
                });
                file.contents = new Buffer(n);
                callback(null, file);
            }
        });
    }
    gulp.task('copy:js', ['copy:directive'], function() {
        console.log('js', config.dir.js[0], configObj.main);
        var outPath = configObj.main;
        var outPathDist = config.dir.dist;
        return gulp.src([config.dir.js[0], '!' + config.dir.js[1]])
            .pipe(_.plumber())
            // auto complete the angular's annotate
            /* jshint camelcase: false */
            .pipe(_.ngAnnotate({
                single_quotes: true
            }))
            //压缩
            // .pipe(_.uglify())
            //directive 模板替换
            .pipe(replaceTmpl())
            .pipe(gulp.dest(outPath))
            .pipe(gulp.dest(outPathDist));
    });
    gulp.task('copy:directive', function() {
        console.log('copy:directive');
        var outPath = configObj.main + 'directive';
        var outPathDist = config.dir.dist + 'directive';
        if (configObj.length && configObj[0] === 'build') {
            outPath = config.dir.dist;
        }
        return gulp.src(config.dir.js[1])
            .pipe(_.plumber())
            // auto complete the angular's annotate
            /* jshint camelcase: false */
            .pipe(_.ngAnnotate({
                single_quotes: true
            }))
            //压缩
            // .pipe(_.uglify())
            //directive 模板替换
            .pipe(replaceTmpl())
            .pipe(gulp.dest(outPath))
            .pipe(gulp.dest(outPathDist));
    });
};
