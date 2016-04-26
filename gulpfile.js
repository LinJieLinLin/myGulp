var fs = require('fs');
var gulp = require("gulp");
var path = require('path');
var minimist = require('minimist')
var G = require('gulp-load-plugins')();
var config = require('./config');
//更改目录路径
var changeDir = function(dir) {
    console.log(path.resolve(__dirname, dir));
    return path.resolve(__dirname, dir);
};
//获取cmdr的第三个参数（默认所有HTML）
var configObj = function() {
    var rs = {
        main: '',
        pkgName: '',
        //雪碧图的路径
        spriteDir: '/',
        buildHtml: '',
        branch: 'buildDev',
        gitName: '',
        initDist: [],
    };
    return rs
}();
var setConfig = function(pkg) {
    var packageDir = __dirname.split(path.sep);
    console.log(packageDir);
    packageDir = packageDir[packageDir.length - 2];
    if (!pkg[packageDir]) {
        packageDir = 'default';
    }
    configObj.main = config.dir.main;
    configObj.pkgName = pkg[packageDir];
    configObj.spriteDir = '/' + pkg[packageDir];
    configObj.gitName = config[configObj.pkgName].name;
    configObj.initDist[0] = 'rm -rf ' + configObj.gitName;
    configObj.initDist[1] = 'rm -rf dist';
    configObj.initDist[2] = 'git clone -b ' + configObj.branch + ' ' + config[configObj.pkgName].git;
    configObj.initDist[3] = 'mv ' + configObj.gitName + ' dist';
    if (configObj.pkgName === 'rcp' || configObj.pkgName === 'default') {
        configObj.spriteDir = '/';
    } else {
        configObj.main = configObj.main + pkg[packageDir] + '/';
    }
    console.log('调试生成目录', configObj.main);
    console.log('包名', configObj.pkgName);
    console.log('雪碧图的路径', configObj.spriteDir);
    console.log('分支', configObj.branch);
    console.log('仓库名', configObj.gitName);
    console.log('初始化dist目录数组', configObj.initDist);
}
var init = function() {
    var pkg = {
        default: 'default',
        course: 'course',
        sso: 'sso',
        'study-circle': 'study-circle',
        space: 'space',
        order: 'order',
        wcms: 'wcms',
        'rcp-common': 'rcp-common',
        rcp: 'rcp',
        'sso_bower': 'rcp',
        'newRcp': 'rcp',
        'dyf_w_course': 'course',
        'dyf_w_sso': 'sso',
        'dyf_w_study-circle': 'study-circle',
        'dyf_w_space': 'space',
        'dyf_w_order': 'order',
        'dyf_w_wcms': 'wcms',
        'dyf_w_rcp-common': 'rcp-common',
        'dyf_w_rcp_master': 'rcp',
    }
    setConfig(pkg);

    //载入gulp插件
    var files = fs.readdirSync(__dirname);
    files.forEach(function(file) {
        var stat = fs.statSync(path.join(__dirname, file));
        if (stat.isFile() && path.extname(file) === '.js') {
            if (file !== 'karma.conf.js' && file !== 'gulpfile.js' && file !== 'config.js') {
                console.log("name:", file)
                require(path.join(__dirname, file))(gulp, G, changeDir, config, configObj);
            }
        }
    });
}
init();
// 获取CMD参数
// var argv = minimist(process.argv.slice(2));
// if (argv.f || argv.file) {
//     var files = argv.f || argv.file;
//     configObj.buildHtml = files.split(',');
// }
// if (argv.b || argv.build) {
//     configObj.buildHtml = ['build']
// }
//import gulp files 

gulp.task('check', G.shell.task(['es-checker']));
