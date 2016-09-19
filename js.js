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
                // console.log('name', content);
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
        var path = [config.dir.js[0], '!' + config.dir.js[1], '!' + config.dir.js[2]];
        var outPath = configObj.main;
        var outPathDist = config.dir.dist;
        console.log('copy:js', path);
        return gulp.src(path)
            .pipe(_.plumber())
            // auto complete the angular's annotate
            /* jshint camelcase: false */
            .pipe(_.ngAnnotate({
                single_quotes: true
            }))
            .pipe(_.babel({
                presets: ['es2015']
            }))
            //压缩
            // .pipe(_.uglify())
            //directive 模板替换
            .pipe(replaceTmpl())
            .pipe(gulp.dest(outPath))
            .pipe(gulp.dest(outPathDist));
    });
    gulp.task('copy:directive', ['sass'], function() {
        var path = config.dir.js[1];
        var outPath = configObj.main + 'directive';
        var outPathDist = config.dir.dist + 'directive';
        console.log('copy:directive', path);
        return gulp.src(path)
            .pipe(_.plumber())
            // auto complete the angular's annotate
            /* jshint camelcase: false */
            .pipe(_.ngAnnotate({
                single_quotes: true
            }))
            .pipe(_.babel({
                presets: ['es2015']
            }))
            //压缩
            // .pipe(_.uglify())
            //directive 模板替换
            .pipe(replaceTmpl())
            .pipe(gulp.dest(outPath))
            .pipe(gulp.dest(outPathDist));
    });
};
