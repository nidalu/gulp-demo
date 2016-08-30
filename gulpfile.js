//这行命令告知Node去node_modules中查找gulp包，先局部查找，
//找不到就去全局环境中查找。找到之后就会赋值给gulp变量，然后我们就可以使用它了
// 引入组件
// sass的编译（gulp-sass）
/*自动添加css前缀（gulp-autoprefixer）
压缩css（gulp-minify-css）
js代码校验（gulp-jshint）
合并js文件（gulp-concat）
压缩js代码（gulp-uglify）
压缩图片（gulp-imagemin）
自动刷新页面（gulp-livereload）
图片缓存，只有图片替换了才压缩（gulp-cache）
更改提醒（gulp-notify）*/
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');

/*// 检查脚本
gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// 默认任务
gulp.task('default', function(){
    gulp.run('lint', 'sass', 'scripts');

    // 监听文件变化
    gulp.watch('./js/*.js', function(){
        gulp.run('lint', 'sass', 'scripts');
    });
});*/
// Styles任务
gulp.task('styles', function() {
    //编译sass
    return gulp.src('app/scss/style.scss')
    .pipe(sass())
    //添加前缀
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    //保存未压缩文件到我们指定的目录下面
    .pipe(gulp.dest('app/css'))
    //给文件添加.min后缀
    .pipe(rename({ suffix: '.min' }))
    //压缩样式文件
    .pipe(minifycss())
    //输出压缩文件到指定目录
    .pipe(gulp.dest('app/assets'))
    //提醒任务完成
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts任务
gulp.task('scripts', function() {
    //js代码校验
    return gulp.src('app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    //js代码合并
    .pipe(concat('all.js'))
    //给文件添加.min后缀
    .pipe(rename({ suffix: '.min' }))
    //压缩脚本文件
    .pipe(uglify())
    //输出压缩文件到指定目录
    .pipe(gulp.dest('app/assets'))
    //提醒任务完成
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('app/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('app/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Watch
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('app/scss/*.scss', ['styles']);
  // Watch .js files
  gulp.watch('app/js/*.js', ['scripts']);
  // Watch image files
  gulp.watch('app/images/*', ['images']);
  // Create LiveReload server
  livereload.listen();
  // Watch any files in assets/, reload on change
  gulp.watch(['app/assets/*']).on('change', livereload.changed);
});

// Default task
gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'images');
});

/*var paths = {
    scripts:["app/js/main.js","app/js/one.js"]
}
 gulp.task('concat',function(){
     gulp.src(paths.scripts)
         .pipe(uglify())
         .pipe(concat('all.min.js'))
         .pipe(gulp.dest('dist'));
 })

gulp.task('hello',function(){
    console.log("hello gulp test");
})*/