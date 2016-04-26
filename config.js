module.exports = {
    dir: {
        main: '../../',
        dist: 'dist/',
        root: '../',
        src: '../src/',
        html: ['../src/*.html', '/*.html', '../src/**/*.html', '../src/*.html'],
        js: ['../src/**/*.js', '../src/directive/**/*.js'],
        css: ['../src/**/*.css'],
        scss: ['../src/**/*.scss'],
        img: ['../src/**/*.{png,jpg,jpeg,gif}', 'imgs', '../src/imgs'],
        directive: ['../src/directive/**/*'],
        sprite: ['../src/imgs/sprite/*'],
        demo: 'demo'
    },
    default: {
        git: '',
        name: '无'
    },
    rcp: {
        git: 'https://w.gdy.io/dyf_w/rcp.git',
        name: 'rcp'
    },
    'rcp-common': {
        git: 'https://w.gdy.io/dyf_w/dyf.git',
        name: 'dyf'
    },
    'study-circle': {
        git: 'https://w.gdy.io/dyf_w/dms.git',
        name: 'dms'
    },
    wcms: {
        git: 'https://w.gdy.io/dyf_w/wcms.git',
        name: 'wcms'
    },
    course: {
        git: 'https://w.gdy.io/dyf_w/course.git',
        name: 'course'
    },
    sso: {
        git: 'https://w.gdy.io/dyf_w/sso.git',
        name: 'sso'
    },
    space: {
        git: 'https://w.gdy.io/dyf_w/space.git',
        name: 'space'
    },
    order: {
        git: 'https://w.gdy.io/dyf_w/order.git',
        name: 'order'
    },
    proxy: 'http://localhost:8080',
    port: '1238',
    common: [1, 2]
};
