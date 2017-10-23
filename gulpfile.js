'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var bulkSass = require('gulp-sass-bulk-import');
 
gulp.task('css', function() {
	return gulp
		.src('./styles/index.scss')
		.pipe(bulkSass())
		.pipe(
			sass({
				includePaths: ['./styles/modules/']
			}))
		.pipe( gulp.dest('./dist/') );
});

gulp.task('css:watch', function() {
  gulp.watch('./styles/modules/*.scss', ['css']);
});
 
gulp.task('sass', function () {
  return gulp.src('./styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./styles/**/*.scss', ['sass']);
});
