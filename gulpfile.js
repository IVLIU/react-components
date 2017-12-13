'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var bulkSass = require('gulp-sass-bulk-import');
var gulpSequence = require('gulp-sequence')

 
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
  gulp.watch('./styles/modules/*.scss', function(cb) {
    gulpSequence('css', 'copy')(function(err) {
      if (err) {
        console.log(err);
      }
    })
  });
});

gulp.task('copy', function() {
  return gulp.src('./dist/index.css')
    .pipe(gulp.dest('../tip/src/styles/'));
});
 
gulp.task('sass', function () {
  return gulp.src('./styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./styles/**/*.scss', ['sass']);
});
