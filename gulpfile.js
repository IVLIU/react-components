'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');

gulp.task('sass', function () {
  return gulp.src('./src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

/* 清理dist的目录里边的文件*/
gulp.task('clean:dist', function (cb) {
  del([
    // 这里我们使用一个通配模式来匹配dist里
    'dist/*',
  ], cb);
});


gulp.task('sass:watch', function () {
  gulp.watch('./src/*.scss', ['sass']);
});

/*默认任务*/
gulp.task('default', ['clean:dist', 'sass']);