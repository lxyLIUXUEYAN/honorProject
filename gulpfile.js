const gulp = require("gulp");
const concat = require("gulp-concat");
const connect = require("gulp-connect");
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");
const proxy = require("http-proxy-middleware");

const uglify = require('gulp-uglify');
const pump = require('pump');

// const babel = require('gulp-babel');

const sass = require('gulp-ruby-sass');
sass.compiler = require('node-sass');

// 方便维护的代理表格;

const cleanCSS = require('gulp-clean-css');

// 路径列表;

const srclist = {
    "scripts" : {
        "src" : './src/javascripts/*.js',
        "dest" : "./dist/javascripts/"
    },
    "css" : {
        "src" : './src/stylesheets/*.css',
        "dest" : "./dist/stylesheets/"
    },
    "sass":{
        "src" : "./src/sass/*.scss",
        "dest" : "./dist/stylesheets/"
    }
}

gulp.task('minify-css', () => {
    return gulp.src(srclist.sass.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest(srclist.css.dest));
});

// 代码 es6 转码 => es5 ,压缩
gulp.task('compress', function (cb) {
    pump([
            gulp.src(srclist.scripts.src),
            // 进行es6的编译
            babel({
                presets: ['@babel/env']
            }),
            uglify(),
            gulp.dest(srclist.scripts.dest)
        ],
        cb
    );
});

gulp.task("build",["compress","minify-css"])


/*const proxyList = [
    // /proxydouban => web端发起请求时带有的一个小标记,这个标记是自定义的
    proxy("/proxydouban",{
        // 由服务器发起请求的目标
        target : "https://api.douban.com:443",
        // 是否重定向源, 默认一定为true;
        changeOrigin:true,
        // 表示路径中的某些标记要清除掉。
        pathRewrite: {
            "/proxydouban" : ""
        }
    })
]*/

gulp.task("connect",()=>{
    connect.server({
        port : 8888,
        root : "./dist",
        livereload : true,
        //-----------  start
      /*  middleware: function(connect, opt) {
            return proxyList
        }*/
        //------------ end
    });
});


gulp.task('sass', function () {
    return gulp.src("./src/sass/*.scss")
        .pipe(gulp.dest("./dist/css"))
        .pipe(connect.reload());
});

gulp.task("html",()=>{
    return gulp.src("./src/html/*.html")
        .pipe(gulp.dest("./dist/html"))
        .pipe(connect.reload());
});

// 开发时

gulp.task("js",()=>{
    return gulp.src("./src/javascripts/*/*")
        .pipe(gulp.dest("./dist/javascripts"))
        .pipe(connect.reload());
});

gulp.task("data",()=>{
    return gulp.src("./src/data/*.json")
        .pipe(gulp.dest("./dist/data"))
        .pipe(connect.reload());
});
gulp.task("img",()=>{
    return gulp.src("./src/img/*")
        .pipe(gulp.dest("./dist/img"))
        .pipe(connect.reload());
});
gulp.task("pub_php",()=>{
    return gulp.src("./src/pub_php/*.php")
        .pipe(gulp.dest("./dist/pub_php"))
        .pipe(connect.reload());
});
gulp.task("stylesheets",()=>{
    return gulp.src("./src/stylesheets/*.css")
        .pipe(gulp.dest("./dist/stylesheets"))
        .pipe(connect.reload());
});


gulp.task("watch",()=>{
    gulp.watch("./src/html/*.html",["html"]);
    gulp.watch("./src/javascripts/*/*.js",["js"]);
    gulp.watch("./src/sass/*.scss",["sass"]);
    gulp.watch("./src/pub_php/*.php",["pub_php"]);
    gulp.watch("./src/img/*",["img"]);
});

// 调试环境;
gulp.task("default",["watch","connect"]);
