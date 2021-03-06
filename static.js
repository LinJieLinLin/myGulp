var sprite = require('gulp.spritesmith');
module.exports = function(gulp, _, dir, config, configObj) {
    gulp.task('copy:info', [], function() {
        var outPath = configObj.main;
        var outPathDist = config.dir.dist;
        console.log(outPath, outPathDist, 'src/.bowerrc', 'src/*.json', 'src/*.MD', 'src/*.sh');
        return gulp.src([config.dir.src + '.bowerrc',
                config.dir.src + '*.json',
                config.dir.src + '*.MD',
                config.dir.src + '*.sh',
                config.dir.src + '**/*.otf',
                config.dir.src + '**/*.eot',
                config.dir.src + '**/*.ttf',
                config.dir.src + '**/*.woff',
                config.dir.src + '**/*.woff2',
                config.dir.src + '**/*.swf',
                config.dir.src + '**/*.svg'
            ])
            .pipe(gulp.dest(outPath))
            .pipe(gulp.dest(outPathDist));
    });
    // gulp.task('copy:root', ['copy:module'], function() {
    //     var outPath = config.dir.root;
    //     return gulp.src([config.dir.src + '.bowerrc',
    //             config.dir.src + '*.json',
    //             config.dir.src + '*.MD',
    //             config.dir.src + '*.sh'
    //         ])
    //         .pipe(gulp.dest(outPath));
    // });
    gulp.task('copy:module', [], function() {
        var outPath = configObj.main + 'styles/module';
        var outPathDist = config.dir.dist + 'styles/module';
        return gulp.src(config.dir.src + 'styles/module/*')
            .pipe(gulp.dest(outPath))
            .pipe(gulp.dest(outPathDist));
    });
    gulp.task('copy:imgs', ['sprites'], function() {
        var outPath = configObj.main;
        var outPathDist = config.dir.dist;
        console.log('imgs', config.dir.img[0], config.dir.sprite[0], outPath);
        return gulp.src([config.dir.img[0], '!' + config.dir.sprite[0]])
            .pipe(gulp.dest(outPath))
            .pipe(gulp.dest(outPathDist));
    });
    gulp.task('sprites', function() {
        console.log(configObj.spriteDir);
        return gulp.src(config.dir.sprite[0])
            // generate image sprite, it will output scss files stream and image file stream
            .pipe(sprite({
                imgName: 'sprite.png',
                cssName: 'sprite.scss',
                imgPath: configObj.spriteDir + '/imgs/sprite.png',
                cssTemplate: 'image-sprite-tmpl.handlebars'
            }))
            .pipe(gulp.dest(config.dir.img[2]));
    });
};
